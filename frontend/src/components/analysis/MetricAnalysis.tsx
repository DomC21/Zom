import { useState } from 'react';
import { Button } from '@/components/ui/button';

// Extend the HTML attributes to include devinid
declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        devinid?: string;
    }
}
import { Sparkles, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

interface MetricAnalysisProps {
    metricName: string;
    value: string | number;
    onAnalyze: (metric: string, value: string) => Promise<string>;
}

export function MetricAnalysis({ metricName, value, onAnalyze }: MetricAnalysisProps) {
    const [analysis, setAnalysis] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const handleAnalyze = async () => {
        setIsLoading(true);
        setError('');
        try {
            const result = await onAnalyze(metricName, value.toString());
            setAnalysis(result);
        } catch (error) {
            console.error('Error analyzing metric:', error);
            setError('Failed to generate analysis. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-2">
            <Button
                variant="outline"
                size="sm"
                className="text-accent border-accent/20 hover:bg-accent/10 transition-all duration-300"
                onClick={handleAnalyze}
                disabled={isLoading}
                devinid={`analyze-${metricName.toLowerCase().replace(/\s+/g, '-')}-button`}
            >
                <Sparkles className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin text-accent' : 'text-accent'}`} />
                {isLoading ? (
                    <span className="inline-flex items-center text-accent">
                        Analyzing
                        <span className="ml-1">
                            <span className="animate-pulse">.</span>
                            <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>.</span>
                            <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>.</span>
                        </span>
                    </span>
                ) : (
                    'Analyze with ChatGPT'
                )}
            </Button>
            
            {error && (
                <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-400">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-tiny">{error}</AlertDescription>
                </Alert>
            )}
            
            {isLoading && (
                <div className="mt-3 space-y-2">
                    <Skeleton className="h-5 w-3/4 bg-accent/5" />
                    <Skeleton className="h-5 w-5/6 bg-accent/5" />
                    <Skeleton className="h-5 w-2/3 bg-accent/5" />
                </div>
            )}
            
            {analysis && !error && !isLoading && (
                <div className="mt-3 text-small text-foreground/80 bg-card/50 p-4 rounded-lg border border-card-border hover:bg-card-hover transition-all duration-300">
                    <div className="prose prose-invert max-w-none">
                        <div className="space-y-3">
                            {analysis.split('\n').filter(Boolean).map((paragraph, index) => (
                                <p key={index} className="text-small leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
