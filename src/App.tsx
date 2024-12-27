import React, { useState, Suspense, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { BASE_URL } from './network';
import { FactCheckResponse } from './types';
import { apiService } from './services/api';
import { useFeedback } from './hooks/useFeedback';

// Lazy load components and their associated dependencies
const ResultsSection = React.lazy(() => import('./components/ResultsSection'));
const FeedbackButtons = React.lazy(() => import('./components/FeedbackButtons'));
const ErrorSection = React.lazy(() => import('./components/ErrorSection'));

function App() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<FactCheckResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [cacheId, setCacheId] = useState<string | null>(null);
  
  const { feedbackLoading, feedbackStatus, submitFeedback, setFeedbackStatus } = useFeedback(cacheId);

  const handleCheckFact = async () => {
    setLoading(true);
    try {
      const data = await apiService.checkFact(inputText, window.location.hostname);
      setResult(data);
      setCacheId(data.cache_id);
    } catch (error) {
      if (error instanceof Error && error.message === 'unauthorized') {
        window.open(`${BASE_URL}/login`, '_blank');
      }
      setResult({ error: 'Please login to check fact', cache_id: '' });
    } finally {
      setLoading(false);
      setFeedbackStatus(null);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  useEffect(() => {
    // Check if we're in a Chrome extension context
    if (typeof chrome !== 'undefined' && chrome.storage) {
      // Check if there's any selected text in storage
      chrome.storage.local.get(['selectedText'], (result) => {
        if (result.selectedText) {
          setInputText(result.selectedText);
          // Clear the storage
          chrome.storage.local.remove('selectedText');
        }
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#001233]">
      <div className="min-w-[300px] max-w-md mx-auto overflow-hidden p-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded bg-[#00FFD1] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[#001233]" />
          </div>
          <h1 className="text-2xl font-bold text-white">Context AI</h1>
        </div>

        {/* Input Section */}
        <div className="space-y-4">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Highlight text or enter a claim..."
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                     text-white placeholder-white/50 focus:outline-none focus:ring-2 
                     focus:ring-[#00FFD1] focus:border-transparent transition-all"
          />
          <button
            onClick={handleCheckFact}
            disabled={loading}
            className="w-full bg-[#00FFD1] hover:bg-[#00FFD1]/90 text-[#001233] 
                     font-semibold py-3 px-4 rounded-lg transition duration-200 
                     ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Analyzing...' : 'Check Fact'}
          </button>
        </div>

        {/* Results Section - Lazy loaded */}
        {result && (
          <Suspense fallback={<div className="mt-6 animate-pulse">Loading...</div>}>
            {result.error ? (
              <ErrorSection error={result.error} />
            ) : (
              <ResultsSection 
                result={result}
                FeedbackComponent={
                  <FeedbackButtons
                    feedbackStatus={feedbackStatus}
                    feedbackLoading={feedbackLoading}
                    onFeedback={submitFeedback}
                  />
                }
              />
            )}
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default App;