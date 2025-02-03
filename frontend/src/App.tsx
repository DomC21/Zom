import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { StockSearch } from './components/stock/StockSearch';
import { StockQuote } from './components/stock/StockQuote';
import { TechnicalAnalysis } from './components/technical/TechnicalAnalysis';
import { FundamentalAnalysis } from './components/fundamental/FundamentalAnalysis';
import { getStockData, analyzeMetric } from './services/api';
import type { StockData } from './types/stock';
import { MobileMenu } from './components/layout/MobileMenu';

function App() {
  const [symbol, setSymbol] = useState<string>('');

  const { data, isLoading, error } = useQuery<StockData>({
    queryKey: ['stock', symbol],
    queryFn: async () => {
      const result = await getStockData(symbol);
      console.log('Stock data received:', result);
      return result;
    },
    enabled: !!symbol,
  });

  const handleMetricAnalysis = async (metric: string, value: string) => {
    try {
      return await analyzeMetric(metric, value);
    } catch (error) {
      console.error('Error analyzing metric:', error);
      throw error;
    }
  };

  const handleSearch = (newSymbol: string) => {
    setSymbol(newSymbol);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent opacity-30" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,_var(--tw-gradient-stops))] from-black via-transparent to-black opacity-80" />
      </div>
      
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-accent/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <h1 className="text-heading-3 font-bold bg-gradient-text bg-clip-text text-transparent">Zom AI</h1>
              <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-tiny font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                Live
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <button className="text-body text-muted hover:text-accent transition-all duration-300 relative group">
                Coaching
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
              </button>
              <button className="text-body text-muted hover:text-accent transition-all duration-300 relative group">
                Projects
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
              </button>
              <button className="text-body text-muted hover:text-accent transition-all duration-300 relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
              </button>
            </nav>
            <MobileMenu />
          </div>
        </div>
      </header>

      <div className="relative overflow-hidden bg-black">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent opacity-50"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,_var(--tw-gradient-stops))] from-black via-transparent to-black opacity-80"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 relative">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-heading-2 heading-gradient max-w-3xl mx-auto leading-tight font-bold">
                AI-Powered Stock Analysis
              </h2>
              <p className="text-body-large text-muted/80 max-w-2xl mx-auto">
                Make smarter trading decisions with real-time market data and AI-driven insights.
              </p>
            </div>
            <div className="max-w-xl mx-auto">
              <StockSearch onSearch={handleSearch} />
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="text-center py-32">
            <div className="inline-flex flex-col items-center gap-8">
              <div className="relative">
                <div className="h-16 w-16 animate-spin rounded-full border-2 border-accent border-r-transparent"></div>
                <div className="absolute inset-0 h-16 w-16 animate-pulse rounded-full border-2 border-accent opacity-30"></div>
                <div className="absolute inset-[-8px] h-[calc(100%+16px)] w-[calc(100%+16px)] animate-ping rounded-full border border-accent opacity-10"></div>
              </div>
              <div className="space-y-2">
                <p className="text-body-large text-accent/80 font-medium">Analyzing Market Data</p>
                <p className="text-small text-muted/80">Fetching real-time insights...</p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center py-32">
            <div className="max-w-xl mx-auto px-8 py-10 rounded-lg bg-gradient-to-b from-red-500/5 to-transparent border border-red-500/20">
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 text-red-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <p className="text-body text-red-400 font-medium">Unable to fetch stock data</p>
                  <p className="text-small text-muted/80">Please verify the stock symbol and try again.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {data && data.quote && data.technical && data.fundamental && (
          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 blur-3xl -z-10"></div>
              <StockQuote quote={data.quote} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-12">
                <h3 className="text-heading-3 heading-gradient">Technical Analysis</h3>
                <TechnicalAnalysis 
                  technical={data.technical} 
                  analysis={data.analysis?.technical || ''} 
                  onAnalyzeMetric={handleMetricAnalysis} 
                />
              </div>
              <div className="space-y-12">
                <h3 className="text-heading-3 heading-gradient">Fundamental Analysis</h3>
                <FundamentalAnalysis 
                  fundamental={data.fundamental} 
                  analysis={data.analysis?.fundamental || ''}
                  onAnalyzeMetric={handleMetricAnalysis}
                />
              </div>
            </div>
          </main>
        )}
      </div>
      <footer className="bg-black/80 border-t border-accent/10 py-16 mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-heading-3 heading-gradient mb-4">Zom AI</h3>
              <p className="text-body text-muted">
                Empowering investors with cutting-edge AI solutions for smarter trading decisions.
              </p>
            </div>
            <div>
              <h4 className="text-body font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <button className="text-body text-muted hover:text-accent transition-colors duration-300">
                    Coaching
                  </button>
                </li>
                <li>
                  <button className="text-body text-muted hover:text-accent transition-colors duration-300">
                    Projects
                  </button>
                </li>
                <li>
                  <button className="text-body text-muted hover:text-accent transition-colors duration-300">
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-body font-semibold text-foreground mb-4">Connect</h4>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/DomC21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-accent transition-all duration-300 p-2 hover:bg-accent/10 rounded-lg"
                  aria-label="Github"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/dominic-carfagno/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-accent transition-all duration-300 p-2 hover:bg-accent/10 rounded-lg"
                  aria-label="LinkedIn"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com/DominicCarfagno"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-accent transition-all duration-300 p-2 hover:bg-accent/10 rounded-lg"
                  aria-label="Twitter"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
              <div className="mt-6">
                <a 
                  href="mailto:DominicCarfagno@carfagnoenterprises.com" 
                  className="text-small text-muted hover:text-accent transition-colors duration-300"
                >
                  DominicCarfagno@carfagnoenterprises.com
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-accent/10">
            <p className="text-small text-muted text-center">
              © {new Date().getFullYear()} Zom AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
