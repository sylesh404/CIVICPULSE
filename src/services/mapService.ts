import L from 'leaflet';
import { Complaint, Severity } from '../types';

/**
 * Editorial Neo-Brutalist Map Service
 * Generates stark graphic symbols (Black + Acid Yellow + Off-White),
 * clean non-glowing markers, and simple restrained animations.
 */
export const mapService = {
  /**
   * Return editorial SVG icon paths and colors
   */
  getCategoryIconSvg(category: string): { svg: string; color: string; label: string } {
    const cat = category.toUpperCase();

    if (cat.includes('POTHOLE') || cat.includes('ROAD')) {
      return {
        label: 'Pothole',
        color: '#050505',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square"><path d="m2 18 10-6 10 6"/><path d="m2 12 10-6 10 6"/><path d="m2 6 10-6 10 6"/></svg>`,
      };
    }
    if (cat.includes('GARBAGE') || cat.includes('DUMPING') || cat.includes('WASTE')) {
      return {
        label: 'Garbage',
        color: '#050505',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>`,
      };
    }
    if (cat.includes('WATER') || cat.includes('LEAK') || cat.includes('SEWAGE')) {
      return {
        label: 'Water',
        color: '#050505',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>`,
      };
    }
    if (cat.includes('LIGHT') || cat.includes('LAMP') || cat.includes('ELECTRIC')) {
      return {
        label: 'Streetlight',
        color: '#050505',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`,
      };
    }
    if (cat.includes('DRAIN')) {
      return {
        label: 'Drainage',
        color: '#050505',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
      };
    }
    if (cat.includes('TRAFFIC') || cat.includes('SIGNAL')) {
      return {
        label: 'Traffic Signal',
        color: '#050505',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square"><rect width="18" height="18" x="3" y="3"/><path d="m9 8 6 4-6 4Z"/></svg>`,
      };
    }

    // Default Hazard
    return {
      label: 'Hazard',
      color: '#050505',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>`,
    };
  },

  /**
   * Editorial Graphic Marker (Section 16)
   * Yellow/black marker with small red severity indicator for critical.
   */
  createIssueMarker(complaint: Complaint, isSelected: boolean): L.DivIcon {
    const isCritical = complaint.severity === 'CRITICAL';
    const isHigh = complaint.severity === 'HIGH';
    const { svg } = this.getCategoryIconSvg(complaint.category);

    const size = isCritical ? 34 : isHigh ? 30 : 26;
    const bgColor = isCritical ? '#DFFF00' : isSelected ? '#DFFF00' : '#FFFFFF';
    const textColor = '#050505';

    // Red severity pip indicator for critical issues
    const criticalPip = isCritical
      ? `<span style="position: absolute; top: -3px; right: -3px; width: 8px; height: 8px; background: #E53935; border: 1.5px solid #050505;"></span>`
      : '';

    const html = `
      <div style="position: relative; width: ${size}px; height: ${size}px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
        <div style="position: relative; width: ${size}px; height: ${size}px; background: ${bgColor}; border: 2px solid #050505; box-shadow: 2px 2px 0px #050505; display: flex; align-items: center; justify-content: center; color: ${textColor}; transition: transform 150ms;">
          ${svg}
          ${criticalPip}
        </div>
        ${
          complaint.reportsCount > 10
            ? `<div style="position: absolute; bottom: -6px; right: -6px; background: #050505; color: #DFFF00; font-family: monospace; font-size: 8px; font-weight: 800; padding: 0.5px 3px; border: 1px solid #DFFF00;">${complaint.reportsCount}</div>`
            : ''
        }
      </div>
    `;

    return L.divIcon({
      html,
      className: 'civic-editorial-marker',
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  },

  /**
   * Live User Location Marker (Section 15)
   * Simple black circle with yellow center + small label "YOU ARE HERE", subtle pulse.
   */
  createUserLocationMarker(): L.DivIcon {
    const html = `
      <div style="position: relative; width: 40px; height: 40px; display: flex; flex-direction: column; align-items: center; justify-content: center; pointer-events: auto; cursor: pointer;">
        <!-- Small label: YOU ARE HERE -->
        <div style="background: #050505; border: 1px solid #050505; color: #DFFF00; font-family: monospace; font-size: 8px; font-weight: 800; padding: 1px 4px; box-shadow: 2px 2px 0px #050505; white-space: nowrap; margin-bottom: 2px;">
          YOU ARE HERE
        </div>
        <!-- Black circle with yellow center dot + subtle pulse -->
        <div style="position: relative; width: 18px; height: 18px; border-radius: 9999px; background: #050505; border: 2px solid #FFFFFF; box-shadow: 2px 2px 0px #050505; display: flex; align-items: center; justify-content: center;">
          <div class="marker-subtle-pulse" style="width: 8px; height: 8px; border-radius: 9999px; background: #DFFF00;"></div>
        </div>
      </div>
    `;

    return L.divIcon({
      html,
      className: 'civic-user-marker',
      iconSize: [60, 40],
      iconAnchor: [30, 30],
    });
  },

  /**
   * Draggable Report Pin Marker
   */
  createDraggableReportMarker(): L.DivIcon {
    const html = `
      <div style="position: relative; display: flex; flex-direction: column; align-items: center; pointer-events: auto; cursor: grab;">
        <div style="background: #DFFF00; border: 2px solid #050505; color: #050505; font-family: monospace; font-size: 9px; font-weight: 800; padding: 2px 6px; box-shadow: 2px 2px 0px #050505; white-space: nowrap; margin-bottom: 2px;">
          REPORT HERE ↗
        </div>
        <div style="width: 18px; height: 18px; background: #050505; border: 2px solid #DFFF00; box-shadow: 2px 2px 0px #050505;"></div>
      </div>
    `;

    return L.divIcon({
      html,
      className: 'civic-report-pin',
      iconSize: [100, 40],
      iconAnchor: [50, 36],
    });
  },

  /**
   * Editorial Cluster Marker
   */
  createClusterMarker(count: number, hasCritical: boolean): L.DivIcon {
    const bgColor = hasCritical ? '#050505' : '#FFFFFF';
    const textColor = hasCritical ? '#DFFF00' : '#050505';

    const html = `
      <div style="position: relative; width: 36px; height: 36px; background: ${bgColor}; border: 2px solid #050505; box-shadow: 3px 3px 0px #050505; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer;">
        <span style="font-family: monospace; font-size: 12px; font-weight: 900; color: ${textColor}; line-height: 1;">${count}</span>
        <span style="font-size: 7px; font-family: monospace; font-weight: 800; color: ${textColor}; text-transform: uppercase;">CLUSTER</span>
      </div>
    `;

    return L.divIcon({
      html,
      className: 'civic-editorial-cluster',
      iconSize: [36, 36],
      iconAnchor: [18, 18],
    });
  },
};
