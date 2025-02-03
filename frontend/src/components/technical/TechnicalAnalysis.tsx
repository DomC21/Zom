import { TechnicalIndicators } from '../../types/stock';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { MetricAnalysis } from '../analysis/MetricAnalysis';

interface TechnicalAnalysisProps {
    technical: TechnicalIndicators;
    analysis: string;
    onAnalyzeMetric: (metric: string, value: string) => Promise<string>;
}

export function TechnicalAnalysis({ technical, analysis, onAnalyzeMetric }: TechnicalAnalysisProps) {
    const formatValue = (value: string | number | undefined): string => {
        if (typeof value === 'undefined') return 'N/A';
        if (typeof value === 'string') {
            const parsed = parseFloat(value);
            return isNaN(parsed) ? 'N/A' : parsed.toFixed(2);
        }
        return value.toFixed(2);
    };

    return (
        <div className="card bg-black/80 p-8 backdrop-blur">
            <div className="flex items-center gap-3 mb-8">
                <h2 className="text-heading-3 heading-gradient">Technical Analysis</h2>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Info className="w-6 h-6 text-accent/70" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="text-body">Technical indicators and market analysis</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="card bg-card/50 hover:bg-card-hover transition-all duration-300">
                        <div className="flex justify-between text-muted mb-3">
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-body-large">RSI</span>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Info className="w-5 h-5 text-accent/70" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="text-body">Relative Strength Index: Measures momentum and overbought/oversold conditions</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <span className="text-foreground">{formatValue(technical.rsi)}</span>
                        </div>
                        <MetricAnalysis
                            metricName="RSI"
                            value={technical.rsi !== undefined ? technical.rsi.toString() : 'N/A'}
                            onAnalyze={onAnalyzeMetric}
                        />
                        <div className="h-2 bg-black/40 rounded-full overflow-hidden mt-3">
                            <div
                                className="h-full bg-gradient-to-r from-green-400 via-accent to-red-400"
                                style={{ width: `${technical.rsi}%` }}
                            ></div>
                        </div>
                    </div>
                    <div className="card bg-card/50 hover:bg-card-hover transition-all duration-300">
                        <div className="flex justify-between text-muted mb-3">
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-body-large">MACD</span>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Info className="w-5 h-5 text-accent/70" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="text-body">Moving Average Convergence Divergence: Trend-following momentum indicator</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <span className="text-foreground">{formatValue(technical.macd)}</span>
                        </div>
                        <MetricAnalysis
                            metricName="MACD"
                            value={typeof technical.macd === 'number' ? technical.macd.toFixed(2) : technical.macd}
                            onAnalyze={onAnalyzeMetric}
                        />
                        <div className="h-2 bg-black/40 rounded-full overflow-hidden mt-3">
                            <div
                                className={`h-full ${parseFloat(String(technical.macd)) >= 0 ? 'bg-green-400' : 'bg-red-400'}`}
                                style={{ width: `${Math.min(Math.abs(parseFloat(String(technical.macd))) * 5, 100)}%` }}
                            ></div>
                        </div>
                    </div>
                    <div className="card bg-card/50 hover:bg-card-hover transition-all duration-300 col-span-2">
                        <div className="flex justify-between text-muted mb-3">
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-body-large">Moving Averages</span>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Info className="w-5 h-5 text-accent/70" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="text-body">Simple Moving Averages: 10-day, 50-day, and 200-day trends</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <div className="flex justify-between text-body mb-2">
                                        <span className="text-muted">10-day MA</span>
                                        <span className="text-foreground">${typeof technical.sma_10 === 'number' ? technical.sma_10.toFixed(2) : technical.sma_10}</span>
                                    </div>
                                    <MetricAnalysis
                                        metricName="10-day Moving Average"
                                        value={typeof technical.sma_10 === 'number' ? technical.sma_10.toFixed(2) : technical.sma_10}
                                        onAnalyze={onAnalyzeMetric}
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between text-body mb-2">
                                        <span className="text-muted">50-day MA</span>
                                        <span className="text-foreground">${typeof technical.sma_50 === 'number' ? technical.sma_50.toFixed(2) : technical.sma_50}</span>
                                    </div>
                                    <MetricAnalysis
                                        metricName="50-day Moving Average"
                                        value={typeof technical.sma_50 === 'number' ? technical.sma_50.toFixed(2) : technical.sma_50}
                                        onAnalyze={onAnalyzeMetric}
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between text-body mb-2">
                                        <span className="text-muted">200-day MA</span>
                                        <span className="text-foreground">${typeof technical.sma_200 === 'number' ? technical.sma_200.toFixed(2) : technical.sma_200}</span>
                                    </div>
                                    <MetricAnalysis
                                        metricName="200-day Moving Average"
                                        value={typeof technical.sma_200 === 'number' ? technical.sma_200.toFixed(2) : technical.sma_200}
                                        onAnalyze={onAnalyzeMetric}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="card bg-card/50 hover:bg-card-hover transition-all duration-300 p-6">
                        <div className="flex justify-between text-muted mb-3">
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-body-large">Bollinger Bands</span>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Info className="w-5 h-5 text-accent/70" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="text-body">Volatility bands that expand/contract based on price movement</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-body">
                                <span className="text-muted">Upper Band</span>
                                <span className="text-foreground">${formatValue(technical.bollinger_upper)}</span>
                            </div>
                            <div className="flex justify-between text-body">
                                <span className="text-muted">Middle Band</span>
                                <span className="text-foreground">${formatValue(technical.bollinger_middle)}</span>
                            </div>
                            <div className="flex justify-between text-body">
                                <span className="text-muted">Lower Band</span>
                                <span className="text-foreground">${formatValue(technical.bollinger_lower)}</span>
                            </div>
                        </div>
                        <MetricAnalysis
                            metricName="Bollinger Bands"
                            value={`Upper: ${typeof technical.bollinger_upper === 'number' ? technical.bollinger_upper.toFixed(2) : 'N/A'} / Middle: ${typeof technical.bollinger_middle === 'number' ? technical.bollinger_middle.toFixed(2) : 'N/A'} / Lower: ${typeof technical.bollinger_lower === 'number' ? technical.bollinger_lower.toFixed(2) : 'N/A'}`}
                            onAnalyze={onAnalyzeMetric}
                        />
                    </div>
                    <div className="card bg-card/50 hover:bg-card-hover transition-all duration-300 p-6">
                        <div className="flex justify-between text-muted mb-3">
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-body-large">Fibonacci Levels</span>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Info className="w-5 h-5 text-accent/70" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="text-body">Key price levels based on Fibonacci ratios for potential support/resistance</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-body">
                                <span className="text-muted">23.6%</span>
                                <span className="text-foreground">${formatValue(technical.fib_236)}</span>
                            </div>
                            <div className="flex justify-between text-body">
                                <span className="text-muted">38.2%</span>
                                <span className="text-foreground">${formatValue(technical.fib_382)}</span>
                            </div>
                            <div className="flex justify-between text-body">
                                <span className="text-muted">50.0%</span>
                                <span className="text-foreground">${formatValue(technical.fib_500)}</span>
                            </div>
                            <div className="flex justify-between text-body">
                                <span className="text-muted">61.8%</span>
                                <span className="text-foreground">${formatValue(technical.fib_618)}</span>
                            </div>
                        </div>
                        <MetricAnalysis
                            metricName="Fibonacci Retracements"
                            value={`23.6%: ${formatValue(technical.fib_236)}, 38.2%: ${formatValue(technical.fib_382)}, 50%: ${formatValue(technical.fib_500)}, 61.8%: ${formatValue(technical.fib_618)}`}
                            onAnalyze={onAnalyzeMetric}
                        />
                    </div>
                </div>
                <div className="card bg-card/50 hover:bg-card-hover transition-all duration-300">
                    <h3 className="text-body-large font-medium mb-4 flex items-center gap-2 heading-gradient">
                        AI Analysis
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="w-5 h-5 text-accent/70" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="text-body">AI-powered interpretation of technical indicators</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </h3>
                    <p className="text-body text-foreground/90 leading-relaxed">{analysis}</p>
                </div>
            </div>
        </div>
    );
}
