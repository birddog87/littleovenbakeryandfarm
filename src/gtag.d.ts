// src/gtag.d.ts
interface Window {
  gtag: (
    command: string,
    target: string,
    config?: {
      [key: string]: any;
    }
  ) => void;
  dataLayer: any[];
}