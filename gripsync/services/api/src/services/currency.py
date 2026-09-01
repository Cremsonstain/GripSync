import httpx
from src.config import settings
from typing import Dict

# Very simple caching
RATE_CACHE: Dict[str, float] = {}

async def get_exchange_rate(base: str = "USD", target: str = "EUR") -> float:
    if base == target:
        return 1.0
        
    cache_key = f"{base}_{target}"
    if cache_key in RATE_CACHE:
        return RATE_CACHE[cache_key]
        
    # Mock implementation for when API key is missing
    if not settings.EXCHANGE_RATE_API_KEY:
        RATE_CACHE[cache_key] = 1.0 # fallback
        return 1.0
        
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(f"https://api.exchangerate-api.com/v4/latest/{base}")
            if response.status_code == 200:
                data = response.json()
                rate = data.get("rates", {}).get(target, 1.0)
                RATE_CACHE[cache_key] = rate
                return rate
        except Exception:
            pass
            
    return 1.0
