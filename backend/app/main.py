from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .services.stock_data import StockDataService

app = FastAPI(title="Zom AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/healthz")
async def health_check():
    return {"status": "healthy"}
