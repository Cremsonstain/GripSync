from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from src.database import get_db
from src.schemas.requests import WalletItemCreate, WalletItemUpdate
from src.schemas.responses import WalletItemResponse
from src.models.wallet import WalletItem
from src.models.peripheral import Peripheral
from src.models.user import User
from src.auth import get_current_user
from src.services.wallet_service import calculate_target_date
import datetime

router = APIRouter()

@router.post("/", response_model=WalletItemResponse)
async def add_wallet_item(item: WalletItemCreate, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Peripheral).where(Peripheral.id == item.peripheral_id))
    periph = result.scalars().first()
    if not periph:
        raise HTTPException(status_code=404, detail="Peripheral not found")

    target_price = periph.price_usd  # Should use currency conversion here
    target_date = calculate_target_date(item.saved_amount, target_price, item.monthly_savings)

    new_item = WalletItem(
        user_id=current_user.id,
        peripheral_id=item.peripheral_id,
        target_price=target_price,
        currency_code=item.currency_code,
        monthly_savings=item.monthly_savings,
        saved_amount=item.saved_amount,
        start_date=datetime.datetime.utcnow(),
        target_date=target_date,
        is_completed=False
    )
    db.add(new_item)
    await db.commit()
    await db.refresh(new_item)
    
    return WalletItemResponse(
        id=new_item.id,
        peripheral=periph,
        target_price=new_item.target_price,
        currency_code=new_item.currency_code,
        monthly_savings=new_item.monthly_savings,
        saved_amount=new_item.saved_amount,
        start_date=new_item.start_date,
        target_date=new_item.target_date,
        is_completed=new_item.is_completed
    )

@router.get("/", response_model=List[WalletItemResponse])
async def get_wallet(current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(WalletItem, Peripheral)
        .join(Peripheral, WalletItem.peripheral_id == Peripheral.id)
        .where(WalletItem.user_id == current_user.id)
    )
    items = []
    for w_item, periph in result.all():
        items.append(WalletItemResponse(
            id=w_item.id,
            peripheral=periph,
            target_price=w_item.target_price,
            currency_code=w_item.currency_code,
            monthly_savings=w_item.monthly_savings,
            saved_amount=w_item.saved_amount,
            start_date=w_item.start_date,
            target_date=w_item.target_date,
            is_completed=w_item.is_completed
        ))
    return items

@router.put("/{item_id}", response_model=WalletItemResponse)
async def update_wallet_item(item_id: str, update_data: WalletItemUpdate, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(WalletItem).where(WalletItem.id == item_id, WalletItem.user_id == current_user.id))
    w_item = result.scalars().first()
    if not w_item:
        raise HTTPException(status_code=404, detail="Wallet item not found")
        
    w_item.saved_amount = update_data.saved_amount
    if update_data.monthly_savings is not None:
        w_item.monthly_savings = update_data.monthly_savings
        
    w_item.target_date = calculate_target_date(w_item.saved_amount, w_item.target_price, w_item.monthly_savings)
    if w_item.saved_amount >= w_item.target_price:
        w_item.is_completed = True
        
    await db.commit()
    await db.refresh(w_item)
    
    # Reload with peripheral for response
    result = await db.execute(select(Peripheral).where(Peripheral.id == w_item.peripheral_id))
    periph = result.scalars().first()
    
    return WalletItemResponse(
        id=w_item.id,
        peripheral=periph,
        target_price=w_item.target_price,
        currency_code=w_item.currency_code,
        monthly_savings=w_item.monthly_savings,
        saved_amount=w_item.saved_amount,
        start_date=w_item.start_date,
        target_date=w_item.target_date,
        is_completed=w_item.is_completed
    )

@router.delete("/{item_id}")
async def remove_wallet_item(item_id: str, current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(WalletItem).where(WalletItem.id == item_id, WalletItem.user_id == current_user.id))
    w_item = result.scalars().first()
    if not w_item:
        raise HTTPException(status_code=404, detail="Wallet item not found")
    
    await db.delete(w_item)
    await db.commit()
    return {"status": "deleted"}
