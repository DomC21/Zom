import { FundamentalData } from '../../types/stock';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { MetricAnalysis } from '../analysis/MetricAnalysis';

interface FundamentalAnalysisProps {
    fundamental: FundamentalData;
    analysis: string;
    onAnalyzeMetric: (metric: string, value: string) => Promise<string>;
}

export function FundamentalAnalysis({ fundamental, analysis, onAnalyzeMetric }: FundamentalAnalysisProps) {
    const formatNumber = (value: number | undefined | null, type: 'currency' | 'percentage' | 'ratio' = 'ratio') => {
        if (value === undefined || value === null || isNaN(value)) return 'N/A';
        const numValue = Number(value);
        
        switch (type) {
            case 'currency':
                return numValue >= 1e9 
                    ? `$${(numValue / 1e9).toFixed(2)}B`
                    : numValue >= 1e6
                    ? `$${(numValue / 1e6).toFixed(2)}M`
                    : `$${numValue.toFixed(2)}`;
            case 'percentage':
                return `${numValue.toFixed(2)}%`;
            default:
                return numValue.toFixed(2);
        }
    };

    return (
        <div className="card bg-black/80 p-8 backdrop-blur">
            <div className="flex items-center gap-3 mb-8">
                <h2 className="text-heading-3 heading-gradient">Fundamental Analysis</h2>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Info className="w-6 h-6 text-accent/70" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="text-body">Key financial metrics and company fundamentals</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="card bg-card/50 hover:bg-card-hover transition-all duration-300">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-body-large text-muted">P/E Ratio</span>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Info className="w-5 h-5 text-accent/70" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-body">Price-to-Earnings Ratio: Measures company valuation relative to earnings</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div className="text-heading-3 font-bold heading-gradient mb-2">{formatNumber(fundamental.PERatio)}</div>
                        <MetricAnalysis
                            metricName="P/E Ratio"
                            value={typeof fundamental.PERatio === 'number' ? fundamental.PERatio.toString() : fundamental.PERatio}
                            onAnalyze={onAnalyzeMetric}
                        />
                    </div>
                    <div className="card bg-card/50 hover:bg-card-hover transition-all duration-300">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-body-large text-muted">Market Cap</span>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Info className="w-5 h-5 text-accent/70" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-body">Market Capitalization: Total value of all outstanding shares</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div className="text-heading-3 font-bold heading-gradient mb-2">
                            {formatNumber(fundamental.MarketCapitalization, 'currency')}
                        </div>
                        <MetricAnalysis
                            metricName="Market Cap"
                            value={fundamental.MarketCapitalization.toString()}
                            onAnalyze={onAnalyzeMetric}
                        />
                    </div>
                    <div className="card bg-card/50 hover:bg-card-hover transition-all duration-300">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-body-large text-muted">EPS</span>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Info className="w-5 h-5 text-accent/70" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-body">Earnings Per Share: Company profit allocated to each share</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div className="text-heading-3 font-bold heading-gradient mb-2">{formatNumber(fundamental.EPS, 'currency')}</div>
                        <MetricAnalysis
                            metricName="EPS"
                            value={fundamental.EPS.toString()}
                            onAnalyze={onAnalyzeMetric}
                        />
                    </div>
                    <div className="card bg-card/50 hover:bg-card-hover transition-all duration-300">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-body-large text-muted">Dividend Yield</span>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Info className="w-5 h-5 text-accent/70" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-body">Annual dividend payments relative to stock price</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div className="text-heading-3 font-bold heading-gradient mb-2">{formatNumber(fundamental.DividendYield, 'percentage')}</div>
                        <MetricAnalysis
                            metricName="Dividend Yield"
                            value={fundamental.DividendYield.toString()}
                            onAnalyze={onAnalyzeMetric}
                        />
                    </div>
                    <div className="card bg-card/50 hover:bg-card-hover transition-all duration-300">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-body-large text-muted">Profit Margin</span>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Info className="w-5 h-5 text-accent/70" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-body">Net income as a percentage of revenue</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div className="text-heading-3 font-bold heading-gradient mb-2">{formatNumber(fundamental.ProfitMargin, 'percentage')}</div>
                        <MetricAnalysis
                            metricName="Profit Margin"
                            value={fundamental.ProfitMargin.toString()}
                            onAnalyze={onAnalyzeMetric}
                        />
                    </div>
                    <div className="card bg-card/50 hover:bg-card-hover transition-all duration-300">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-body-large text-muted">Debt/Equity</span>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Info className="w-5 h-5 text-accent/70" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-body">Debt-to-Equity Ratio: Measures company's financial leverage</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div className="text-heading-3 font-bold heading-gradient mb-2">{formatNumber(fundamental.DebtToEquityRatio)}</div>
                        <MetricAnalysis
                            metricName="Debt-to-Equity Ratio"
                            value={fundamental.DebtToEquityRatio.toString()}
                            onAnalyze={onAnalyzeMetric}
                        />
                    </div>
                    <div className="card bg-card/50 hover:bg-card-hover transition-all duration-300">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-body-large text-muted">Beta</span>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Info className="w-5 h-5 text-accent/70" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-body">Beta: Measures stock's volatility compared to the overall market</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div className="text-heading-3 font-bold heading-gradient mb-2">{formatNumber(fundamental.Beta)}</div>
                        <MetricAnalysis
                            metricName="Beta"
                            value={fundamental.Beta.toString()}
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
                                    <p className="text-body">AI-powered interpretation of fundamental metrics</p>
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
