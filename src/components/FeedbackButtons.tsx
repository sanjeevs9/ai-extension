import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { FeedbackType } from '../types';

interface FeedbackButtonsProps {
  feedbackStatus: FeedbackType | null;
  feedbackLoading: boolean;
  onFeedback: (type: FeedbackType) => void;
}

export function FeedbackButtons({ feedbackStatus, feedbackLoading, onFeedback }: FeedbackButtonsProps) {
  return (
    <div className="flex gap-4 mt-4">
      <button
        disabled={feedbackLoading}
        onClick={() => onFeedback('helpful')}
        className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 
                   ${feedbackStatus === 'helpful' 
                     ? 'bg-green-500/30 border-green-500/50' 
                     : 'bg-green-500/10 hover:bg-green-500/20 border-green-500/20'} 
                   border rounded-lg transition-all duration-200`}
      >
        <ThumbsUp className="w-5 h-5 text-green-400" />
        <span className="text-green-400 font-medium">Helpful</span>
      </button>
      <button
        disabled={feedbackLoading}
        onClick={() => onFeedback('unhelpful')}
        className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 
                   ${feedbackStatus === 'unhelpful' 
                     ? 'bg-red-500/30 border-red-500/50' 
                     : 'bg-red-500/10 hover:bg-red-500/20 border-red-500/20'} 
                   border rounded-lg transition-all duration-200`}
      >
        <ThumbsDown className="w-5 h-5 text-red-400" />
        <span className="text-red-400 font-medium">Not Helpful</span>
      </button>
    </div>
  );
}

export default FeedbackButtons; 