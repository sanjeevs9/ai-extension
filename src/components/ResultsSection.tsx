import React from 'react';
import { FactCheckResponse } from '../types';

interface ResultsSectionProps {
  result: FactCheckResponse;
  FeedbackComponent: React.ReactNode;
}

function OpinionSection({ explanation }: { explanation?: string }) {
  return (
    <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
      <p className="font-semibold text-yellow-400">Opinion Detected</p>
      <p className="text-sm text-white/70 mt-2">{explanation || 'No explanation available'}</p>
    </div>
  );
}

interface FactualSectionProps {
  score?: number;
  explanation?: string;
  references?: string[];
}

function FactualSection({ score = 0, explanation = 'No explanation available', references }: FactualSectionProps) {
  return (
    <>
      <div className="p-4 bg-[#00FFD1]/10 border border-[#00FFD1]/20 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <p className="font-semibold text-white">Factual Score</p>
          <span className="text-[#00FFD1] font-bold">{score}%</span>
        </div>
        <p className="text-sm text-white/70">{explanation}</p>
      </div>
      
      {references && references.length > 0 && (
        <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
          <p className="font-semibold text-white mb-2">References</p>
          <ul className="space-y-2">
            {references.map((ref: string, index: number) => (
              <li key={index}>
                <a
                  href={ref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#00FFD1] hover:text-[#00FFD1]/80 
                           underline underline-offset-2"
                >
                  {ref}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default function ResultsSection({ result, FeedbackComponent }: ResultsSectionProps) {
  return (
    <div className="space-y-4 pt-5">
      {result.isOpinion ? (
        <OpinionSection explanation={result.explanation} />
      ) : (
        <FactualSection 
          score={result.factual_score}
          explanation={result.detailed_explanation || result.explanation}
          references={result.references}
        />
      )}
      {FeedbackComponent}
    </div>
  );
} 