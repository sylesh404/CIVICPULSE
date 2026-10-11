/**
 * Real reverse geocoding service using OpenStreetMap Nominatim API.
 * With client-side memory caching and graceful fallback to coordinates.
 */
const geocodeCache = new Map<string, string>();

export const geocodingService = {
  async reverseGeocode(latitude: number, longitude: number): Promise<string> {
    const key = `${latitude.toFixed(4)},${longitude.toFixed(4)}`;
    if (geocodeCache.has(key)) {
      return geocodeCache.get(key)!;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
        {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'CivicPulse-SmartCity/2.4',
          },
          signal: controller.signal,
        }
      );
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const address = data.address || {};
        const road = address.road || address.pedestrian || address.street || address.suburb;
        const neighborhood = address.neighbourhood || address.suburb || address.city_district;
        const city = address.city || address.town || address.county || 'Urban Zone';

        let formatted = '';
        if (road && neighborhood) {
          formatted = `${road}, ${neighborhood}`;
        } else if (road && city) {
          formatted = `${road}, ${city}`;
        } else if (data.display_name) {
          formatted = data.display_name.split(',').slice(0, 3).join(',').trim();
        }

        if (formatted) {
          geocodeCache.set(key, formatted);
          return formatted;
        }
      }
    } catch {
      // In case of network offline, rate limit, or timeout, do not invent addresses
    }

    // Fallback: real coordinates
    const fallback = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
    geocodeCache.set(key, fallback);
    return fallback;
  },
};
