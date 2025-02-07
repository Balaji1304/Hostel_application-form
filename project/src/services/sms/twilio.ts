import { TWILIO_CONFIG } from '../../config/constants';
import type { SmsProvider, SmsResponse } from './types';

export const twilioProvider: SmsProvider = {
  async sendSms(to: string, message: string): Promise<SmsResponse> {
    try {
      const response = await fetch('/api/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to,
          message,
          from: TWILIO_CONFIG.FROM_NUMBER,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send SMS');
      }

      const data = await response.json();
      return {
        success: true,
        messageId: data.sid,
        status: data.status,
      };
    } catch (error) {
      console.error('Twilio SMS Error:', error);
      throw error;
    }
  }
};