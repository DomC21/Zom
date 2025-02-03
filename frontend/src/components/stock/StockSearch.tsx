import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Extend the HTML attributes to include devinid
declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        devinid?: string;
    }
}

interface StockSearchProps {
    onSearch: (symbol: string) => void;
}

export function StockSearch({ onSearch }: StockSearchProps) {
    const [symbol, setSymbol] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (symbol.trim()) {
            onSearch(symbol.trim().toUpperCase());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="relative flex-1 group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-hover to-accent-light rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <Input
                    type="text"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    placeholder="Enter stock symbol (e.g., AAPL)"
                    className="relative bg-black border-accent/20 w-full text-body placeholder:text-muted/50 focus:border-accent/50 focus:ring-accent/50"
                    devinid="stock-search-input"
                />
            </div>
            <Button 
                type="submit" 
                className="relative px-8 py-3 bg-accent text-black font-semibold rounded-lg overflow-hidden group"
                devinid="stock-search-button"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    Analyze Stock
                </span>
            </Button>
        </form>
    );
}
