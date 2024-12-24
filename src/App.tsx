import React, { useState } from 'react';
import { ArrowRight, Sparkles, ThumbsDown, ThumbsUp } from 'lucide-react';

function App() {
 const [inputText, setInputText] = useState('');
 const [result, setResult] = useState<any>(null);
 const [loading, setLoading] = useState(false);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   setInputText(event.target.value);
 };
  const handleCheckFact = async () => {
   setLoading(true);
   try {
     const response = await fetch('http://localhost:3000/api/fact', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       credentials: 'include', // Important for sending cookies
       body: JSON.stringify({
         text: inputText,
         domain: window.location.hostname
       }),
     });
      if (response.status === 401) {
       // Redirect to login page
       window.open('YOUR_NEXTJS_APP_URL/login', '_blank');
       return;
     }
      const data = await response.json();
      console.log(data);
     setResult(data);
   } catch (error) {
     console.error('Error:', error);
     setResult({ error: 'Please login to check fact' });

     //user is not logged in, redirect to login page
    //  window.open('http://localhost:3000', '_blank');

   } finally {
     setLoading(false);
   }
 };
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

        {/* Results Section */}
        {result && (
           <div className="mt-6 space-y-4">
           {result.error ? (
             <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg space-y-4">
               <p className="text-red-400">{result.error}</p>
               {result.login ? (
                 <div className="">
                   <button className="w-full bg-[#00FFD1] hover:bg-[#00FFD1]/90 text-[#001233] 
                                      font-semibold py-2 px-4 rounded-lg transition duration-200 
                                      ease-in-out flex items-center justify-center gap-2">
                     <span>Upgrade</span>
                     <ArrowRight className="w-4 h-4" />
                   </button>
                 </div>
               ):
               <div className="">
                   <button onClick={()=>{
                    window.open('http://localhost:3000/login', '_blank');
                   }} className="w-full bg-[#00FFD1] hover:bg-[#00FFD1]/90 text-[#001233] 
                                      font-semibold py-2 px-4 rounded-lg transition duration-200 
                                      ease-in-out flex items-center justify-center gap-2">
                     <span>Login</span>
                     <ArrowRight className="w-4 h-4" />
                   </button>
                 </div>
               }
             </div>
            ) : (
              <div className="space-y-4">
                {result.isOpinion ? (
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <p className="font-semibold text-yellow-400">Opinion Detected</p>
                    <p className="text-sm text-white/70 mt-2">{result.explanation}</p>
                  </div>
                ) : (
                  <>
                    <div className="p-4 bg-[#00FFD1]/10 border border-[#00FFD1]/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-white">Factual Score</p>
                        <span className="text-[#00FFD1] font-bold">{result.factual_score}%</span>
                      </div>
                      <p className="text-sm text-white/70">{result.detailed_explanation || result.explanation}</p>
                    </div>
                    
                    {result.references && result.references.length > 0 && (
                      <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                        <p className="font-semibold text-white mb-2">References</p>
                        <ul className="space-y-2">
                          {result.references.map((ref: string, index: number) => (
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
                )}

                {/* Feedback Buttons */}
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => {/* Your thumbs up function */}}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-4 
                             bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 
                             rounded-lg transition-all duration-200"
                  >
                    <ThumbsUp className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 font-medium">Helpful</span>
                  </button>
                  <button
                    onClick={() => {/* Your thumbs down function */}}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-4 
                             bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 
                             rounded-lg transition-all duration-200"
                  >
                    <ThumbsDown className="w-5 h-5 text-red-400" />
                    <span className="text-red-400 font-medium">Not Helpful</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
 );
}

export default App;