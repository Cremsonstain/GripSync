import datetime
from typing import Optional
from dateutil.relativedelta import relativedelta

def calculate_target_date(saved_amount: float, target_price: float, monthly_savings: float) -> Optional[datetime.datetime]:
    if monthly_savings <= 0:
        return None
    remaining = target_price - saved_amount
    if remaining <= 0:
        return datetime.datetime.utcnow()
    
    months_needed = int(remaining / monthly_savings)
    if remaining % monthly_savings > 0:
        months_needed += 1
        
    return datetime.datetime.utcnow() + relativedelta(months=months_needed)
