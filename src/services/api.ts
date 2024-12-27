import { BASE_URL } from '../network';
import { FactCheckResponse, FeedbackType } from '../types';

export const apiService = {
  async checkFact(text: string, domain: string): Promise<FactCheckResponse> {
    const response = await fetch(`${BASE_URL}/api/fact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ text, domain }),
    });

    if (response.status === 401) {
      throw new Error('unauthorized');
    }

    return response.json();
  },

  async submitFeedback(feedback: FeedbackType, cacheId: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/api/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ feedback, cache_id: cacheId }),
    });

    if (response.status === 401 || response.status === 400) {
      throw new Error('unauthorized');
    }

    return response.json();
  }
}; 