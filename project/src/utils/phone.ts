export function formatPhoneNumber(phone: string): string {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '');
  
  // Ensure it's a 10-digit number for India
  if (cleaned.length === 10) {
    return cleaned;
  }
  
  // If it includes country code (e.g., +91), take last 10 digits
  if (cleaned.length > 10) {
    return cleaned.slice(-10);
  }
  
  throw new Error('Invalid phone number format');
}