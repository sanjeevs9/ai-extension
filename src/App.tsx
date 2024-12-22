import React, { useState } from 'react';
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
     setResult({ error: 'Failed to check fact' });
   } finally {
     setLoading(false);
   }
 };
  return (
   <div className="min-h-screen bg-gray-100 p-4">
     <div className="min-w-[300px] max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
       <h1 className="text-2xl font-bold text-gray-800 mb-4">Context AI</h1>
       <input
         type="text"
         value={inputText}
         onChange={handleInputChange}
         placeholder="Highlight text or enter a claim..."
         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
       />
       <button
         onClick={handleCheckFact}
         disabled={loading}
         className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200 ease-in-out disabled:opacity-50"
       >
         {loading ? 'Checking...' : 'Check Fact'}
       </button>
       
       {result && (
         <div className="mt-4">
           {result.error ? (
             <p className="text-red-500">{result.error}</p>
           ) : (
             <div className="space-y-2">
               {result.isOpinion ? (
                 <div className="bg-yellow-50 p-4 rounded-md">
                   <p className="font-semibold">This is an opinion</p>
                   <p className="text-sm text-gray-600">{result.explanation}</p>
                 </div>
               ) : (
                 <>
                   <div className="bg-green-50 p-4 rounded-md">
                     <p className="font-semibold">Factual Score: {result.factual_score}%</p>
                     <p className="text-sm text-gray-600">{result.detailed_explanation || result.explanation}</p>
                   </div>
                   {result.references && result.references.length > 0 && (
                     <div className="bg-gray-50 p-4 rounded-md">
                       <p className="font-semibold">References:</p>
                       <ul className="list-disc list-inside text-sm text-gray-600">
                         {result.references.map((ref: string, index: number) => (
                           <li key={index}>
                             <a href={ref} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                               {ref}
                             </a>
                           </li>
                         ))}
                       </ul>
                     </div>
                   )}
                 </>
               )}
             </div>
           )}
         </div>
       )}
     </div>
   </div>
 );
}

export default App;