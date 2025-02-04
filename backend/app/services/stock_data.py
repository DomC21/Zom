from typing import Dict
import aiohttp
import asyncio
from fastapi import HTTPException
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

class StockDataService:
    def __init__(self):
        self.session = None
        self.alpha_vantage_url = "https://www.alphavantage.co/query"
        self.polygon_url = "https://api.polygon.io/v3"
        self.timeout = aiohttp.ClientTimeout(total=10, connect=5)
        
    async def __aenter__(self):
        if not self.session or self.session.closed:
            self.session = aiohttp.ClientSession()
        return self
        
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session and not self.session.closed:
            await self.session.close()
        self.session = None
