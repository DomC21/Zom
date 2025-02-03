import { StockQuote as StockQuoteType } from '../../types/stock';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StockQuoteProps {
    quote: StockQuoteType;
}

export function StockQuote({ quote }: StockQuoteProps) {
    if (!quote || !quote.change || !quote.price) {
        return (
            <div className="card bg-black/80 p-8 backdrop-blur">
                <div className="flex items-center justify-center">
                    <p className="text-muted">Loading stock data...</p>
                </div>
            </div>
        );
    }

    const isPositive = parseFloat(quote.change) >= 0;
    const formatLargeNumber = (value: string | number) => {
        const num = typeof value === 'string' ? parseInt(value) : value;
        if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
        if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
        return num.toLocaleString();
    };

    return (
        <div className="card bg-black/80 p-8 backdrop-blur">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-4 mb-3">
                        <h2 className="text-heading-3 heading-gradient">{quote.symbol}</h2>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-tiny font-medium">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                            </span>
                            Live
                        </div>
                    </div>
                    <div className="text-muted flex items-center gap-3 text-small">
                        <span>Volume:</span>
                        <span className="font-medium text-foreground">{formatLargeNumber(quote.volume)}</span>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-heading-4 font-bold mb-3 heading-gradient">
                        ${parseFloat(quote.price).toFixed(2)}
                    </span>
                    <div className="flex items-center gap-4">
                        <span className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-medium ${
                            isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                        }`}>
                            {isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                            ${Math.abs(parseFloat(quote.change)).toFixed(2)}
                        </span>
                        <span className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-medium ${
                            isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                        }`}>
                            {Math.abs(parseFloat(quote.changePercent)).toFixed(2)}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
