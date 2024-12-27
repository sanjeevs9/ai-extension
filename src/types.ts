export interface FactCheckResponse {
  error?: string;
  login?: boolean;
  isOpinion?: boolean;
  explanation?: string;
  detailed_explanation?: string;
  factual_score?: number;
  references?: string[];
  cache_id: string;
}

export type FeedbackType = 'helpful' | 'unhelpful';