import time
import threading
import ctypes
from typing import List, Dict, Any, Optional

class InputLogger:
    def __init__(self):
        self.is_logging = False
        self.mouse_events: List[Dict[str, Any]] = []
        self.keyboard_events: List[Dict[str, Any]] = []
        self.lock = threading.Lock()
        self.thread: Optional[threading.Thread] = None

    def start_logging(self):
        """Start capturing input events using raw input/ctypes."""
        self.is_logging = True
        self.thread = threading.Thread(target=self._capture_loop, daemon=True)
        self.thread.start()

    def _capture_loop(self):
        # A simple mocked loop using ctypes for win32 api
        # Real implementation would register raw input devices and run a message loop
        user32 = ctypes.windll.user32
        class POINT(ctypes.Structure):
            _fields_ = [("x", ctypes.c_long), ("y", ctypes.c_long)]
            
        pt = POINT()
        last_x, last_y = 0, 0
        
        while self.is_logging:
            user32.GetCursorPos(ctypes.byref(pt))
            current_x, current_y = pt.x, pt.y
            
            dx = current_x - last_x
            dy = current_y - last_y
            
            if dx != 0 or dy != 0:
                with self.lock:
                    self.mouse_events.append({
                        "dx": dx,
                        "dy": dy,
                        "buttons": 0,
                        "scroll": 0,
                        "timestamp": time.time()
                    })
                    
            last_x, last_y = current_x, current_y
            time.sleep(0.01)

    def stop_logging(self):
        self.is_logging = False
        if self.thread:
            self.thread.join()

    def get_mouse_data(self) -> List[Dict[str, Any]]:
        with self.lock:
            return list(self.mouse_events)

    def get_keyboard_data(self) -> List[Dict[str, Any]]:
        with self.lock:
            return list(self.keyboard_events)

    def calculate_metrics(self) -> Dict[str, Any]:
        """Calculate movement_heatmap, velocity_distribution, flick_events, micro_adjustments."""
        with self.lock:
            events = list(self.mouse_events)
            
        if not events:
            return {}
            
        velocities = []
        flicks = 0
        micros = 0
        
        for i in range(1, len(events)):
            dt = events[i]["timestamp"] - events[i-1]["timestamp"]
            if dt > 0:
                dist = (events[i]["dx"]**2 + events[i]["dy"]**2)**0.5
                vel = dist / dt
                velocities.append(vel)
                if vel > 2000:
                    flicks += 1
                elif 0 < vel < 50:
                    micros += 1
                    
        return {
            "movement_heatmap": [], # Would be 2D array
            "velocity_distribution": velocities,
            "flick_events": flicks,
            "micro_adjustments": micros
        }
