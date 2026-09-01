import mss
import cv2
import numpy as np
import time
import threading
from typing import Dict, Any, Optional
import pytesseract
from pydantic import BaseModel

class GameProfile(BaseModel):
    name: str
    kill_feed_roi: Dict[str, int] # {"top": 100, "left": 100, "width": 300, "height": 200}
    
PROFILES = {
    "Valorant": GameProfile(name="Valorant", kill_feed_roi={"top": 50, "left": 1500, "width": 400, "height": 300}),
    "CS2": GameProfile(name="CS2", kill_feed_roi={"top": 50, "left": 1500, "width": 400, "height": 300}),
    "Apex": GameProfile(name="Apex", kill_feed_roi={"top": 50, "left": 1500, "width": 400, "height": 300})
}

class ScreenAnalyzer:
    def __init__(self, game_name: str = "Valorant", fps: int = 3):
        self.game_profile = PROFILES.get(game_name, PROFILES["Valorant"])
        self.fps = fps
        self.is_capturing = False
        self.thread: Optional[threading.Thread] = None
        self.stats = {
            "kills": 0,
            "deaths": 0,
            "assists": 0,
            "headshots": 0,
            "rounds_played": 0
        }
        self.sct = mss.mss()

    def start_capture(self, region: Optional[Dict[str, int]] = None):
        self.is_capturing = True
        self.thread = threading.Thread(target=self._capture_loop, args=(region,), daemon=True)
        self.thread.start()

    def _capture_loop(self, region: Optional[Dict[str, int]] = None):
        roi = region or self.game_profile.kill_feed_roi
        monitor = {"top": roi["top"], "left": roi["left"], "width": roi["width"], "height": roi["height"]}
        
        while self.is_capturing:
            start_time = time.time()
            
            # Capture frame
            sct_img = self.sct.grab(monitor)
            frame = np.array(sct_img)
            
            # Preprocess for OCR
            gray = cv2.cvtColor(frame, cv2.COLOR_BGRA2GRAY)
            _, thresh = cv2.threshold(gray, 200, 255, cv2.THRESH_BINARY)
            
            # Tesseract OCR
            # text = pytesseract.image_to_string(thresh)
            # Parse text (mocked logic)
            # if "killed" in text.lower():
            #     self.stats["kills"] += 1
                
            sleep_time = (1.0 / self.fps) - (time.time() - start_time)
            if sleep_time > 0:
                time.sleep(sleep_time)

    def stop_capture(self):
        self.is_capturing = False
        if self.thread:
            self.thread.join()
            
    def get_stats(self) -> Dict[str, Any]:
        return self.stats
