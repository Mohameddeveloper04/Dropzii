/**
 * Distance calculation using OpenStreetMap (Nominatim) and OSRM
 * This bypasses Google Maps Distance Matrix which is restricted on this API key.
 */

// Helper to use Places API for geocoding
async function geocodeWithPlaces(address) {
    return new Promise((resolve, reject) => {
        if (!window.google || !window.google.maps || !window.google.maps.places) {
            const div = document.createElement("div");
            // If the library isn't loaded, this might fail, but usually it's loaded by the main script
            if (window.google && window.google.maps && window.google.maps.places === undefined) {
                reject(new Error("Places API not fully loaded yet"));
                return;
            }
        }

        const dummyElement = document.createElement("div");
        const service = new window.google.maps.places.PlacesService(dummyElement);
        const request = {
            query: address,
            fields: ['geometry'],
        };

        service.findPlaceFromQuery(request, function (results, status) {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
                const loc = results[0].geometry.location;
                // findPlaceFromQuery can return multiple results, we take the best one
                resolve({ lat: loc.lat(), lon: loc.lng() });
            } else {
                reject(new Error("PlacesService findPlaceFromQuery failed: " + status));
            }
        });
    });
}

// Geocode an address to lat/lng using Google Maps Places or OpenStreetMap
async function geocode(address) {
    try {
        if (window.google && window.google.maps) {
            const result = await geocodeWithPlaces(address);
            if (result) return result;
        }
    } catch (e) {
        console.warn("Google Places findPlaceFromQuery failed, falling back to Nominatim:", e);
    }

    // Fallback to nominatim (Try the full address first)
    try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`;
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.length > 0) {
            return { lat: data[0].lat, lon: data[0].lon };
        }
    } catch (e) { /* ignore */ }

    // Looser fallback to nominatim (First part of the address)
    const shortAddress = address.split(',')[0];
    const url2 = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(shortAddress)}&limit=1`;
    const response2 = await fetch(url2);
    const data2 = await response2.json();
    if (data2 && data2.length > 0) {
        return { lat: data2[0].lat, lon: data2[0].lon };
    }

    throw new Error("Could not geocode address: " + address);
}


/**
 * Get driving distance between two place names using Google Routes API via Vite proxy.
 * This provides accurate Google Maps distances by calling the Routes API through a proxy.
 *
 * @param {string} origin - Origin place name or address.
 * @param {string} destination - Destination place name or address.
 * @returns {Promise<{ distanceKm: number, durationText: string, distanceText: string }>}
 */
export async function getDistance(origin, destination) {
    const response = await fetch("/api/distance", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            origin: { address: origin },
            destination: { address: destination },
            travelMode: "DRIVE",
            routingPreference: "TRAFFIC_UNAWARE",
            computeAlternativeRoutes: false,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error?.message || data.error || "Unable to calculate distance"
        );
    }

    const route = data.routes?.[0];

    if (!route) {
        throw new Error("No driving route found");
    }

    const distanceKm = route.distanceMeters / 1000;
    const totalMinutes = Math.round(Number(route.duration.replace("s", "")) / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return {
        distanceKm: Math.round(distanceKm),
        durationText: hours ? `${hours} hrs ${minutes} mins` : `${minutes} mins`,
        distanceText: `${Math.round(distanceKm)} km`,
    };
}
