import asyncio
import aiohttp
import os
from dotenv import load_dotenv
import json
from datetime import datetime

load_dotenv()

def check_api_keys():
    polygon_key = os.getenv("POLYGON_API_KEY")
    alpha_vantage_key = os.getenv("ALPHA_VANTAGE_API_KEY")
    
    if not polygon_key:
        raise ValueError("Polygon API key not found in environment")
    if not alpha_vantage_key:
        raise ValueError("Alpha Vantage API key not found in environment")
    
    return polygon_key, alpha_vantage_key

async def test_polygon_historical_data(symbol: str):
    polygon_key, _ = check_api_keys()
    url = f"https://api.polygon.io/v2/aggs/ticker/{symbol}/range/1/day/2023-01-01/{datetime.now().strftime('%Y-%m-%d')}"
    params = {
        "apiKey": polygon_key,
        "adjusted": "true",
        "limit": "200",
        "sort": "desc"  # Get most recent data first
    }
    print(f"\nTesting Polygon Historical Data for {symbol}")
    print(f"URL: {url}")
    print(f"Using API key: {polygon_key[:5]}...")
    
    async with aiohttp.ClientSession() as session:
        async with session.get(url, params=params) as response:
            print(f"\nPolygon Historical Data Test for {symbol}")
            print(f"Status: {response.status}")
            if response.status == 200:
                data = await response.json()
                results = data.get("results", [])
                print(f"Number of data points: {len(results)}")
                print("Sample data point:", json.dumps(results[0] if results else {}, indent=2))
            else:
                print("Error:", await response.text())

async def test_polygon_details(symbol: str):
    polygon_key, _ = check_api_keys()
    url = f"https://api.polygon.io/v3/reference/tickers/{symbol}"
    params = {"apiKey": polygon_key}
    
    async with aiohttp.ClientSession() as session:
        async with session.get(url, params=params) as response:
            print(f"\nPolygon Details Test for {symbol}")
            print(f"Status: {response.status}")
            if response.status == 200:
                data = await response.json()
                results = data.get("results", {})
                print("Beta value:", results.get("beta"))
                print("Market cap:", results.get("market_cap"))
                print("Full response:", json.dumps(results, indent=2))
            else:
                print("Error:", await response.text())

async def test_alpha_vantage_overview(symbol: str):
    _, alpha_vantage_key = check_api_keys()
    url = "https://www.alphavantage.co/query"
    params = {
        "function": "OVERVIEW",
        "symbol": symbol,
        "apikey": alpha_vantage_key
    }
    
    async with aiohttp.ClientSession() as session:
        async with session.get(url, params=params) as response:
            print(f"\nAlpha Vantage Overview Test for {symbol}")
            print(f"Status: {response.status}")
            if response.status == 200:
                data = await response.json()
                print("Beta:", data.get("Beta"))
                print("Debt/Equity Ratio:", data.get("DebtToEquityRatio"))
                print("Full response:", json.dumps(data, indent=2))
            else:
                print("Error:", await response.text())

async def main():
    symbol = "AAPL"  # Test with a well-known stock
    print(f"Testing metrics for {symbol}")
    print("=" * 80)
    
    await test_polygon_historical_data(symbol)
    await test_polygon_details(symbol)
    await test_alpha_vantage_overview(symbol)

if __name__ == "__main__":
    asyncio.run(main())
