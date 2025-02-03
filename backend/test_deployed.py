import requests
import json
import time

BASE_URL = "https://zom-ai-backend-eyvrtzpz.fly.dev"
TIMEOUT = 30

def test_endpoint(url, method='GET', data=None):
    print(f"\nTesting {method} {url}")
    try:
        if method == 'GET':
            response = requests.get(url, timeout=TIMEOUT)
        else:
            response = requests.post(url, json=data, timeout=TIMEOUT)
            
        print(f"Status Code: {response.status_code}")
        
        try:
            return response.json()
        except json.JSONDecodeError:
            print("Error decoding JSON response")
            print(f"Raw response: {response.text}")
            return None
            
    except requests.exceptions.Timeout:
        print(f"Request timed out after {TIMEOUT} seconds")
        return None
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {str(e)}")
        return None

def main():
    # Test health endpoint
    print("\n=== Testing Health Endpoint ===")
    health_data = test_endpoint(f"{BASE_URL}/healthz")
    if health_data:
        print(json.dumps(health_data, indent=2))
    
    # Test stock data endpoint
    print("\n=== Testing Stock Data Endpoint ===")
    stock_data = test_endpoint(f"{BASE_URL}/api/stock/AAPL")
    if stock_data:
        print(json.dumps(stock_data, indent=2))
    
    # Test metric analysis endpoint
    print("\n=== Testing Metric Analysis Endpoint ===")
    analysis_data = test_endpoint(
        f"{BASE_URL}/api/analyze-metric",
        method='POST',
        data={"metric": "RSI", "value": "65"}
    )
    if analysis_data:
        print(json.dumps(analysis_data, indent=2))

if __name__ == "__main__":
    main()
