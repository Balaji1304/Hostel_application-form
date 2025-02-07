import { SMS_CONFIG } from '../../config/constants';

interface Fast2SMSResponse {
  return: boolean;
  request_id: string;
  message: string[];
}

export async function sendFast2SMS(phone: string, message: string): Promise<Fast2SMSResponse> {
  const params = new URLSearchParams({
    authorization: SMS_CONFIG.FAST2SMS_API_KEY,
    route: 'q', // Quick SMS Route
    message,
    numbers: phone.replace(/\D/g, ''), // Remove non-digits
    flash: '0',
    language: 'english',
  });

  try {
    const response = await fetch(`${SMS_CONFIG.BASE_URL}?${params}`, {
      method: 'GET',
      headers: {
        'cache-control': 'no-cache',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to send SMS');
    }

    const data = await response.json();
    return data as Fast2SMSResponse;
  } catch (error) {
    console.error('Fast2SMS API Error:', error);
    throw error;
  }
}