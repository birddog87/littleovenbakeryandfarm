// src/lib/gtag.ts
export const GA_TRACKING_ID = 'G-CLKFJ8C7K6';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string): void => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
interface EventProps {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export const event = ({ action, category, label, value }: EventProps): void => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// GA4 conversion events. Safe when gtag is missing (ad blockers, tests).
export const trackConversion = (
  name: string,
  params: { [key: string]: string | number } = {}
): void => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, { ...params, transport_type: 'beacon' });
};
