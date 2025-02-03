import axios from 'axios';
import { StockData } from '../types/stock';

const API_URL = import.meta.env.VITE_BACKEND_URL;
const AUTH_TOKEN = btoa('user:63f63460f92f0035e0abac780887ee82');

export const getStockData = async (symbol: string): Promise<StockData> => {
    const maxRetries = 3;
    const retryDelay = 2000;
    let attempt = 0;

    while (attempt < maxRetries) {
        try {
            console.log(`Fetching stock data for ${symbol} (attempt ${attempt + 1}/${maxRetries})`);
            const response = await axios.get(`${API_URL}/api/stock/${symbol}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${AUTH_TOKEN}`
                }
            });
            console.log('Stock data response:', response.data);
            // Ensure all required properties exist with default values
            return {
                quote: response.data.quote || {},
                technical: response.data.technical || {
                    rsi: 'N/A',
                    macd: 'N/A',
                    macd_signal: 'N/A',
                    macd_hist: 'N/A',
                    sma_10: 'N/A',
                    sma_50: 'N/A',
                    sma_200: 'N/A',
                    bollinger_upper: 'N/A',
                    bollinger_middle: 'N/A',
                    bollinger_lower: 'N/A',
                    support: 'N/A',
                    resistance: 'N/A',
                    fib_236: 'N/A',
                    fib_382: 'N/A',
                    fib_500: 'N/A',
                    fib_618: 'N/A'
                },
                fundamental: response.data.fundamental || {},
                analysis: response.data.analysis || { technical: '', fundamental: '' }
            };
        } catch (error) {
            attempt++;
            console.error(`Error fetching stock data (attempt ${attempt}/${maxRetries}):`, error);
            
            if (attempt === maxRetries) {
                throw new Error('Failed to fetch stock data after multiple attempts. The service might be temporarily unavailable.');
            }
            
            await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
    }
    throw new Error('Failed to fetch stock data');
};

export const analyzeMetric = async (metric: string, value: string): Promise<string> => {
    try {
        console.log(`Analyzing metric: ${metric} with value: ${value}`);
        const response = await axios.post(`${API_URL}/api/analyze-metric`, {
            metric: metric,
            value: value
        });
        console.log('Analysis response:', response.data);
        return response.data.analysis;
    } catch (error) {
        console.error('Analysis error:', error);
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.detail || 'Failed to analyze metric');
        }
        throw new Error('Failed to connect to analysis service');
    }
};
