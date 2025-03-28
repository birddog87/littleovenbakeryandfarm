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