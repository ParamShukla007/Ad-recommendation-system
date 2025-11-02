import React, { useState } from 'react';
import { Search, Target } from 'lucide-react';

export default function Hero1() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleCheck = async () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/extract/summarizeAndExtract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-orange-300 to-pink-400" style={{ fontFamily: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif' }}>
      {/* Navigation */}
      <div className="h-[800px] bg-gray-900 flex justify-between px-16">
        <div className="flex flex-col justify-start pt-20">
          {/* AD RECO Logo */}
          <div className="flex flex-col">
            <h1 className="text-[150px] leading-none tracking-wide bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-300 text-transparent bg-clip-text" 
                style={{ letterSpacing: '4px' }}>
              AD
            </h1>
            <h1 className="text-[150px] leading-none tracking-wide bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-300 text-transparent bg-clip-text" 
                style={{ letterSpacing: '4px' }}>
              RECO
            </h1>
          </div>

          {/* Text and Button below AD RECO */}
          <div className="mt-16">
            <h2 className="text-6xl text-white mb-4" style={{ letterSpacing: '1px' }}>
              FIND PERFECT ADS
            </h2>
            <h3 className="text-6xl text-white mb-8" style={{ letterSpacing: '1px' }}>
              FOR YOUR WEBPAGE
            </h3>
            
            <p className="text-xl text-gray-300 mb-8" style={{ fontFamily: 'Tahoma, sans-serif' }}>
              AI-powered ad matching that analyzes your content and recommends the best suited ads.
            </p>
            
            {/* Button and Input section */}
            <div className="flex items-center gap-4">
              <button className="bg-gradient-to-r from-orange-400 to-pink-400 text-white text-xl px-8 h-[60px] hover:opacity-90 transition-opacity whitespace-nowrap">
                TRY IT NOW
              </button>
              
              <div className="flex-1 max-w-2xl">
                <input
                  type="url"
                  placeholder="Enter your webpage URL..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={loading}
                  className="w-full px-6 h-[60px] bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
                  onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
                />
                {error && (
                  <div className="mt-4 p-4 bg-red-100 border border-red-300 text-red-700">
                    {error}
                  </div>
                )}
              </div>
              
              <button
                onClick={handleCheck}
                disabled={loading}
                className="bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-300 text-white text-xl px-8 h-[60px] hover:opacity-90 transition-opacity whitespace-nowrap font-bold"
                style={{ letterSpacing: '1px' }}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ANALYZING...
                  </div>
                ) : (
                  'ANALYZE'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="px-8 pb-16 max-w-8xl mx-auto space-y-6 mt-20">
          {/* Summary Card */}
          <div className="bg-gray-900 p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              
              <h2 className="text-4xl text-white" style={{ letterSpacing: '1px' }}>
                WEBPAGE ANALYSIS
              </h2>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed mb-6" style={{ fontFamily: 'Tahoma, sans-serif' }}>
              {result.summary}
            </p>
            <div className="flex flex-wrap gap-2">
              {result.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-800 text-orange-400 text-sm font-medium border border-gray-700"
                  style={{ fontFamily: 'Tahoma, sans-serif' }}
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Recommended Ads */}
          <div className="bg-gray-900 p-8 shadow-lg">
            <h2 className="text-4xl text-white mb-6" style={{ letterSpacing: '1px' }}>
              RECOMMENDED ADS
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {result.matchedAds && result.matchedAds.map((ad, index) => (
                <div
                  key={ad._id}
                  className="relative bg-gray-800 backdrop-blur-sm p-6 border border-gray-700 hover:border-orange-400 transition-all hover:shadow-xl"
                >
                  <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold" style={{ fontFamily: 'Tahoma, sans-serif' }}>
                    {Math.round(ad.similarity * 100)}% Match
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 pr-20" style={{ fontFamily: 'Tahoma, sans-serif' }}>
                    {ad.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed" style={{ fontFamily: 'Tahoma, sans-serif' }}>
                    {ad.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {ad.keywords.map((keyword, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 text-sm" style={{ fontFamily: 'Tahoma, sans-serif' }}
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="text-sm font-semibold text-orange-400 mb-2 " style={{ fontFamily: 'Tahoma, sans-serif' }}>
                      Why this ad?
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed" style={{ fontFamily: 'Tahoma, sans-serif' }}>
                      {ad.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}