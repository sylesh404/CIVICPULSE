export interface UserLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

export type LocationPermissionState = 'prompt' | 'granted' | 'denied' | 'unavailable';

/**
 * Service managing real-time browser Geolocation API interactions.
 * Never fakes or hardcodes GPS coordinates.
 */
export const locationService = {
  /**
   * Check if browser supports Geolocation API
   */
  isSupported(): boolean {
    return typeof navigator !== 'undefined' && 'geolocation' in navigator;
  },

  /**
   * Request one-time current position
   */
  getCurrentLocation(): Promise<UserLocation> {
    return new Promise((resolve, reject) => {
      if (!this.isSupported()) {
        reject(new Error('Geolocation is not supported by your browser.'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp,
          });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 12000,
          maximumAge: 5000,
        }
      );
    });
  },

  /**
   * Continuously watch user location as they move
   */
  watchUserLocation(
    onSuccess: (location: UserLocation) => void,
    onError: (error: GeolocationPositionError) => void
  ): number | null {
    if (!this.isSupported()) {
      return null;
    }

    return navigator.geolocation.watchPosition(
      (position) => {
        onSuccess({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        });
      },
      (error) => {
        onError(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 5000,
      }
    );
  },

  /**
   * Clear active watch position listener
   */
  clearWatch(watchId: number | null): void {
    if (watchId !== null && this.isSupported()) {
      navigator.geolocation.clearWatch(watchId);
    }
  },

  /**
   * Calculate distance between two coordinate pairs using Haversine formula (returns meters)
   */
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // Earth radius in meters
    const phi1 = (lat1 * Math.PI) / 180;
    const phi2 = (lat2 * Math.PI) / 180;
    const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
    const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(R * c);
  },

  /**
   * Human-readable distance formatter (e.g. "120 m" or "1.4 km")
   */
  formatDistance(meters: number): string {
    if (meters < 1000) {
      return `${meters} m`;
    }
    return `${(meters / 1000).toFixed(1)} km`;
  },
};
