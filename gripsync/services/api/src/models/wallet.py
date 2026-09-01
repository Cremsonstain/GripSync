from sqlalchemy import Column, String, Float, ForeignKey, DateTime, Boolean
from src.database import Base
import uuid

class WalletItem(Base):
    __tablename__ = "wallet_items"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"))
    peripheral_id = Column(String, ForeignKey("peripherals.id"))
    target_price = Column(Float)
    currency_code = Column(String)
    monthly_savings = Column(Float)
    saved_amount = Column(Float)
    start_date = Column(DateTime(timezone=True))
    target_date = Column(DateTime(timezone=True))
    is_completed = Column(Boolean, default=False)
