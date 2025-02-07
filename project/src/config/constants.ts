// Twilio Configuration
export const TWILIO_CONFIG = {
  ACCOUNT_SID: import.meta.env.VITE_TWILIO_ACCOUNT_SID || '',
  AUTH_TOKEN: import.meta.env.VITE_TWILIO_AUTH_TOKEN || '',
  FROM_NUMBER: import.meta.env.VITE_TWILIO_PHONE_NUMBER || '',
};

// Application Configuration
export const APP_CONFIG = {
  FORM_EXPIRY_HOURS: 24,
  BASE_URL: typeof window !== 'undefined' ? window.location.origin : '',
};