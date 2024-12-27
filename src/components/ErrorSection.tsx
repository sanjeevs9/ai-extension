import React from 'react';
import { ArrowRight } from 'lucide-react';
import { BASE_URL } from '../network';

interface ErrorSectionProps {
  error: string;
}

export default function ErrorSection({ error }: ErrorSectionProps) {
  const handleLogin = () => {
    window.open(`${BASE_URL}/login`, '_blank');
  };

  const isLoginError = error.toLowerCase().includes('login');

  return (
    <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg space-y-4">
      <p className="text-red-400">{error}</p>
      
      {isLoginError && (
        <button
          onClick={handleLogin}
          className="flex items-center gap-2 text-sm text-red-400 
                   hover:text-red-300 transition-colors"
        >
          Login to continue
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
} 