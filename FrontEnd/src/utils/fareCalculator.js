/**
 * Dropzii Fare Calculator
 * All pricing logic for one-way and round-trip taxi estimation.
 */

export const VEHICLES = [
    {
        id: "sedan",
        name: "Sedan",
        subtitle: "Dzire / Etios",
        seating: "4+1",
        seats: 4,
        luggage: 2,
        img: "/assets/Cars/sedan.jpeg",
        rates: { oneway: 15, roundtrip: 14 },
    },
    {
        id: "suv",
        name: "SUV",
        subtitle: "Ertiga / Xylo",
        seating: "6+1",
        seats: 6,
        luggage: 4,
        img: "/assets/Cars/Suv.jpeg",
        rates: { oneway: 20, roundtrip: 19 },
    },
    {
        id: "innova",
        name: "Innova",
        subtitle: "Innova",
        seating: "7+1",
        seats: 7,
        luggage: 4,
        img: "/assets/Cars/Innova.jpeg",
        rates: { oneway: 21, roundtrip: 20 },
    },
    {
        id: "crysta",
        name: "Innova Crysta",
        subtitle: "Crysta / MVP",
        seating: "6+1",
        seats: 7,
        luggage: 4,
        img: "/assets/Cars/Etios.jpeg", // reusing available image
        rates: { oneway: 24, roundtrip: 22 },
    },
];

const MIN_ONEWAY_KM = 130;
const MIN_ROUNDTRIP_KM_PER_DAY = 250;
const BATTA_NORMAL = 500;
const BATTA_HIGH = 1000;
const BATTA_THRESHOLD_KM = 400;

/**
 * Calculate batta for a given daily distance.
 */
function dailyBatta(dailyKm) {
    return dailyKm > BATTA_THRESHOLD_KM ? BATTA_HIGH : BATTA_NORMAL;
}

/**
 * Calculate fare estimates for all vehicle types.
 *
 * @param {number} distanceKm - Actual driving distance (one-way) in km.
 * @param {"oneway"|"roundtrip"} tripType - Trip type.
 * @param {number} [days=1] - Number of days (only for round trips).
 * @returns {Array} Array of estimates, one per vehicle.
 */
export function calculateEstimates(distanceKm, tripType, days = 1) {
    return VEHICLES.map((vehicle) => {
        const rate = tripType === "oneway" ? vehicle.rates.oneway : vehicle.rates.roundtrip;
        let chargeableKm, batta, breakdown;

        if (tripType === "oneway") {
            // One-way: minimum 130 km
            chargeableKm = Math.max(distanceKm, MIN_ONEWAY_KM);
            batta = dailyBatta(chargeableKm);

            breakdown = {
                actualKm: Math.round(distanceKm),
                chargeableKm: Math.round(chargeableKm),
                minimumApplied: distanceKm < MIN_ONEWAY_KM,
                rate,
                baseFare: Math.round(chargeableKm) * rate,
                batta,
                days: 1,
            };
        } else {
            // Round trip: distance × 2, minimum 250 km/day
            const totalActualKm = distanceKm * 2;
            const actualKmPerDay = totalActualKm / days;

            // Per-day calculation
            let totalChargeableKm = 0;
            let totalBatta = 0;
            const dayBreakdown = [];

            for (let d = 0; d < days; d++) {
                const dayKm = Math.max(actualKmPerDay, MIN_ROUNDTRIP_KM_PER_DAY);
                const dayBattaAmount = dailyBatta(dayKm);
                totalChargeableKm += dayKm;
                totalBatta += dayBattaAmount;
                dayBreakdown.push({ km: Math.round(dayKm), batta: dayBattaAmount });
            }

            chargeableKm = totalChargeableKm;
            batta = totalBatta;

            breakdown = {
                actualKm: Math.round(totalActualKm),
                chargeableKm: Math.round(chargeableKm),
                minimumApplied: actualKmPerDay < MIN_ROUNDTRIP_KM_PER_DAY,
                rate,
                baseFare: Math.round(chargeableKm) * rate,
                batta,
                days,
                dayBreakdown,
            };
        }

        const totalEstimate = breakdown.baseFare + batta;

        return {
            vehicle,
            breakdown,
            totalEstimate,
        };
    });
}
