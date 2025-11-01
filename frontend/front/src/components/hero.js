import React, { useState } from 'react';
import { Sparkles, Zap, Target } from 'lucide-react';

function Hero() {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-purple-300" />
            <span className="text-purple-200 text-sm font-medium">AI-Powered Ad Matching</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Find Perfect Ads
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              For Your Content
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Our AI analyzes your webpage and matches it with the most relevant ads using advanced machine learning
          </p>

          {/* Input Section */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25"></div>
            <div className="relative bg-slate-800/90 backdrop-blur-xl p-3 rounded-2xl border border-slate-700/50 shadow-2xl">
              <div className="flex gap-3">
                <input
                  type="url"
                  placeholder="Enter your webpage URL..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={loading}
                  className="flex-1 px-6 py-4 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-all text-lg"
                  onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
                />
                <button
                  onClick={handleCheck}
                  disabled={loading}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      Analyze
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-500/20 backdrop-blur-sm border border-red-500/50 rounded-xl text-red-200">
              {error}
            </div>
          )}
        </div>

        {/* Results Section */}
        {result && (
          <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
            {/* Summary Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition"></div>
              <div className="relative bg-slate-800/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-700/50 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Webpage Analysis</h2>
                </div>
                
                <p className="text-lg text-slate-300 leading-relaxed mb-6">
                  {result.summary}
                </p>
                
                <div className="flex flex-wrap gap-3">
                  {result.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-sm border border-purple-500/30 rounded-lg text-purple-200 font-medium hover:from-purple-600/50 hover:to-pink-600/50 transition-all"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommended Ads */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition"></div>
              <div className="relative bg-slate-800/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-700/50 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-purple-400" />
                  Recommended Ads
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {result.matchedAds && result.matchedAds.map((ad, index) => (
                    <div
                      key={ad._id}
                      className="group/card relative bg-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all hover:transform hover:scale-[1.02] shadow-lg"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-white text-sm font-bold">
                        {Math.round(ad.similarity * 100)}% Match
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-3 pr-20">
                        {ad.title}
                      </h3>
                      
                      <p className="text-slate-300 mb-4 leading-relaxed">
                        {ad.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {ad.keywords.map((keyword, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-300 text-sm"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-slate-700/50">
                        <div className="text-sm font-semibold text-purple-300 mb-2">
                          Why this ad?
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">
                          {ad.explanation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Hero;