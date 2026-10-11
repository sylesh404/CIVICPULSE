import { Complaint } from '../types';
import { apiService } from './apiService';
import { locationService } from './locationService';

export interface NearbyStats {
  within500m: number;
  within1km: number;
  within2km: number;
}

export type SortMode = 'NEAREST' | 'HIGHEST_PRIORITY' | 'MOST_REPORTED';

export const complaintService = {
  /**
   * Get all active complaints from API layer
   */
  async getAllComplaints(): Promise<Complaint[]> {
    return apiService.getComplaints();
  },

  /**
   * Calculate nearby complaints from a given coordinate point
   */
  calculateNearbyStats(userLat: number, userLng: number, complaints: Complaint[]): NearbyStats {
    let within500m = 0;
    let within1km = 0;
    let within2km = 0;

    complaints.forEach((c) => {
      const distance = locationService.calculateDistance(userLat, userLng, c.location.lat, c.location.lng);
      if (distance <= 500) within500m++;
      if (distance <= 1000) within1km++;
      if (distance <= 2000) within2km++;
    });

    return { within500m, within1km, within2km };
  },

  /**
   * Sort complaints by distance, priority score, or reports count
   */
  sortComplaints(
    complaints: Complaint[],
    sortMode: SortMode,
    userLat?: number,
    userLng?: number
  ): (Complaint & { distanceMeters?: number })[] {
    const list = complaints.map((c) => {
      const distanceMeters =
        userLat !== undefined && userLng !== undefined
          ? locationService.calculateDistance(userLat, userLng, c.location.lat, c.location.lng)
          : undefined;
      return { ...c, distanceMeters };
    });

    return list.sort((a, b) => {
      if (sortMode === 'NEAREST') {
        if (a.distanceMeters !== undefined && b.distanceMeters !== undefined) {
          return a.distanceMeters - b.distanceMeters;
        }
        return 0;
      }
      if (sortMode === 'HIGHEST_PRIORITY') {
        return b.priorityScore - a.priorityScore;
      }
      if (sortMode === 'MOST_REPORTED') {
        return b.reportsCount - a.reportsCount;
      }
      return 0;
    });
  },

  /**
   * Check for possible duplicate complaints within radius (100 - 250m)
   */
  findNearbyDuplicates(
    lat: number,
    lng: number,
    complaints: Complaint[],
    radiusMeters = 250
  ): { complaint: Complaint; distanceMeters: number; similarityScore: number }[] {
    const matches: { complaint: Complaint; distanceMeters: number; similarityScore: number }[] = [];

    complaints.forEach((c) => {
      const distance = locationService.calculateDistance(lat, lng, c.location.lat, c.location.lng);
      if (distance <= radiusMeters) {
        // Calculate similarity score based on proximity and category
        const proximityFactor = Math.max(0.7, 1 - distance / (radiusMeters * 2));
        const similarityScore = Math.min(0.98, Math.round(proximityFactor * 100));
        matches.push({
          complaint: c,
          distanceMeters: distance,
          similarityScore,
        });
      }
    });

    return matches.sort((a, b) => b.similarityScore - a.similarityScore);
  },
};
