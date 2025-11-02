import React, { useState } from 'react';
import { Sparkles, Zap, Target, Rocket, Search, ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* Animated Background */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
        className="fixed inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
      </motion.div>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <Badge variant="secondary" className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/80 backdrop-blur-sm border border-slate-200">
            <Rocket className="w-4 h-4 text-blue-600" />
            <span className="text-slate-700">AI-Powered Ad Matching</span>
          </Badge>
          
          <motion.h1 
            className="text-6xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Find Perfect Ads
            <motion.span 
              className="block bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              For Your Content
            </motion.span>
          </motion.h1>

          <motion.p 
            className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Our AI analyzes your webpage and matches it with the most relevant ads using advanced machine learning
          </motion.p>

          {/* Input Section */}
          <Card className="relative max-w-2xl mx-auto bg-white/70 backdrop-blur-xl border-slate-200 shadow-sm">
            <CardContent className="p-3">
              <div className="flex gap-3">
                <Input
                  type="url"
                  placeholder="Enter your webpage URL..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={loading}
                  className="flex-1 bg-white/50 border-slate-200"
                  onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
                />
                <Button
                  onClick={handleCheck}
                  disabled={loading}
                  className="px-8 bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Analyze
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600"
            >
              {error}
            </motion.div>
          )}
        </motion.div>

        {/* Results Section */}
        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto space-y-8"
          >
            {/* Summary Card */}
            <Card className="bg-white/70 backdrop-blur-xl border-slate-200 shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900">Webpage Analysis</h2>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  {result.summary}
                </p>
                
                <div className="flex flex-wrap gap-3">
                  {result.keywords.map((keyword, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommended Ads */}
            <Card className="bg-white/70 backdrop-blur-xl border-slate-200 shadow-sm">
              <CardHeader>
                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                  <Star className="w-8 h-8 text-blue-600" />
                  Recommended Ads
                </h2>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {result.matchedAds && result.matchedAds.map((ad, index) => (
                    <motion.div
                      key={ad._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 hover:border-blue-200 transition-all hover:scale-[1.02] shadow-sm"
                    >
                      <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-white text-sm font-bold">
                        {Math.round(ad.similarity * 100)}% Match
                      </div>
                      
                      <h3 className="text-2xl font-bold text-slate-900 mb-3 pr-20">
                        {ad.title}
                      </h3>
                      
                      <p className="text-slate-600 mb-4 leading-relaxed">
                        {ad.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {ad.keywords.map((keyword, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg text-slate-600 text-sm"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <div className="text-sm font-semibold text-blue-600 mb-2">
                          Why this ad?
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed">
                          {ad.explanation}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Hero;