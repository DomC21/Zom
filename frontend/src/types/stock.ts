export interface StockQuote {
    symbol: string;
    price: string;
    change: string;
    changePercent: string;
    volume: string;
}

export interface TechnicalIndicators {
    rsi: string | number;
    macd: string | number;
    macd_signal: string | number;
    macd_hist: string | number;
    sma_10: string | number;
    sma_50: string | number;
    sma_200: string | number;
    bollinger_upper: string | number;
    bollinger_middle: string | number;
    bollinger_lower: string | number;
    support: string | number;
    resistance: string | number;
    fib_236: string | number;
    fib_382: string | number;
    fib_500: string | number;
    fib_618: string | number;
}

export interface FundamentalData {
    PERatio: number;
    MarketCapitalization: number;
    EPS: number;
    DividendYield: number;
    ProfitMargin: number;
    DebtToEquityRatio: number;
    Beta: number;
}

export interface StockAnalysis {
    technical: string;
    fundamental: string;
}

export interface StockData {
    quote: StockQuote;
    technical: TechnicalIndicators;
    fundamental: FundamentalData;
    analysis: StockAnalysis;
}
