
export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed",
        });
    }

    try {
        const { origin, destination } = req.body || {};

        if (
            typeof origin !== "string" ||
            typeof destination !== "string" ||
            !origin.trim() ||
            !destination.trim()
        ) {
            return res.status(400).json({
                error: "Origin and destination are required",
            });
        }

        const apiKey = process.env.GOOGLE_MAPS_API_KEY;

        if (!apiKey) {
            return res.status(500).json({
                error: "Google Routes API key is not configured",
            });
        }

        const response = await fetch(
            "https://routes.googleapis.com/directions/v2:computeRoutes",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": apiKey,
                    "X-Goog-FieldMask":
                        "routes.distanceMeters,routes.duration",
                },
                body: JSON.stringify({
                    origin: { address: origin.trim() },
                    destination: { address: destination.trim() },
                    travelMode: "DRIVE",
                    routingPreference: "TRAFFIC_UNAWARE",
                    computeAlternativeRoutes: false,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("Google Routes error:", data);

            return res.status(502).json({
                error: "Google could not calculate the route",
            });
        }

        const route = data.routes?.[0];

        if (!route) {
            return res.status(404).json({
                error: "No driving route found",
            });
        }

        const distanceKm = route.distanceMeters / 1000;
        const totalMinutes = Math.round(
            Number(route.duration.replace("s", "")) / 60
        );

        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        return res.status(200).json({
            distanceKm,
            distanceText: `${Math.round(distanceKm)} km`,
            durationText: hours
                ? `${hours} hrs ${minutes} mins`
                : `${minutes} mins`,
        });
    } catch (error) {
        console.error("Distance service error:", error);

        return res.status(500).json({
            error: "Distance calculation failed",
        });
    }
}
