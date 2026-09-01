import asyncio
import json
import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

# Temporary import path hack
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '../../services/api'))

from src.config import settings
from src.models.peripheral import Peripheral, MouseSpec, MousepadSpec, KeyboardSpec, MonitorSpec

async def seed_db():
    engine = create_async_engine(settings.DATABASE_URL)
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    seed_file = os.path.join(os.path.dirname(__file__), 'peripherals.json')
    with open(seed_file, 'r') as f:
        data = json.load(f)
        
    async with async_session() as session:
        for item in data:
            periph = Peripheral(
                id=item['id'],
                name=item['name'],
                brand=item['brand'],
                category=item['category'],
                price_usd=item['price_usd'],
                image_url=item['image_url'],
                purchase_url=item['purchase_url']
            )
            session.add(periph)
            
            spec = item['spec']
            if item['category'] == 'mouse':
                session.add(MouseSpec(id=item['id'], **spec))
            elif item['category'] == 'mousepad':
                session.add(MousepadSpec(id=item['id'], **spec))
            elif item['category'] == 'keyboard':
                session.add(KeyboardSpec(id=item['id'], **spec))
            elif item['category'] == 'monitor':
                session.add(MonitorSpec(id=item['id'], **spec))
                
        await session.commit()
    print("Seeding complete.")

if __name__ == '__main__':
    asyncio.run(seed_db())
