from sqlalchemy import Column, String, Integer, Float, ForeignKey, JSON, Boolean
from src.database import Base
import uuid

class Peripheral(Base):
    __tablename__ = "peripherals"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String)
    brand = Column(String)
    category = Column(String)
    price_usd = Column(Float)
    image_url = Column(String)
    purchase_url = Column(String)

class MouseSpec(Base):
    __tablename__ = "mouse_specs"
    id = Column(String, ForeignKey("peripherals.id"), primary_key=True)
    weight = Column(Float)
    shape = Column(String)
    sensor = Column(String)
    max_dpi = Column(Integer)
    polling_rate = Column(Integer)
    wireless = Column(Boolean)
    grip_compatibility = Column(JSON)

class MousepadSpec(Base):
    __tablename__ = "mousepad_specs"
    id = Column(String, ForeignKey("peripherals.id"), primary_key=True)
    width = Column(Float)
    height = Column(Float)
    surface_type = Column(String)
    material = Column(String)
    thickness = Column(Float)

class KeyboardSpec(Base):
    __tablename__ = "keyboard_specs"
    id = Column(String, ForeignKey("peripherals.id"), primary_key=True)
    layout = Column(String)
    switch_type = Column(String)
    actuation_point = Column(Float)
    polling_rate = Column(Integer)

class MonitorSpec(Base):
    __tablename__ = "monitor_specs"
    id = Column(String, ForeignKey("peripherals.id"), primary_key=True)
    panel_type = Column(String)
    refresh_rate = Column(Integer)
    response_time = Column(Float)
    resolution = Column(String)
    size_inches = Column(Float)
