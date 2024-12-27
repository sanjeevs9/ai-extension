import { useState } from 'react';
import { FeedbackType } from '../types';
import { apiService } from '../services/api';

export function useFeedback(cacheId: string | null) {
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState<FeedbackType | null>(null);

  const submitFeedback = async (type: FeedbackType) => {
    if (!cacheId) return;
    
    setFeedbackLoading(true);
    try {
      await apiService.submitFeedback(type, cacheId);
      setFeedbackStatus(type);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setFeedbackLoading(false);
    }
  };

  return { feedbackLoading, feedbackStatus, submitFeedback, setFeedbackStatus};
} 