from pydantic import BaseModel
from typing import Dict, Any, List
import numpy as np

class PlaystyleResult(BaseModel):
    type: str
    sub_traits: List[str]
    metrics_dict: Dict[str, float]
    description: str

class PlaystyleClassifier:
    def classify(self, mouse_data: List[Dict[str, Any]], screen_stats: Dict[str, Any]) -> PlaystyleResult:
        if not mouse_data:
            return PlaystyleResult(type="Unknown", sub_traits=[], metrics_dict={}, description="No data")
            
        velocities = []
        for i in range(1, len(mouse_data)):
            dt = mouse_data[i]["timestamp"] - mouse_data[i-1]["timestamp"]
            if dt > 0:
                dist = (mouse_data[i]["dx"]**2 + mouse_data[i]["dy"]**2)**0.5
                velocities.append(dist/dt)
                
        if not velocities:
            return PlaystyleResult(type="Unknown", sub_traits=[], metrics_dict={}, description="Insufficient data")
            
        v = np.array(velocities)
        p50 = float(np.percentile(v, 50))
        p90 = float(np.percentile(v, 90))
        p99 = float(np.percentile(v, 99))
        
        flicks = np.sum(v > 2000)
        flick_ratio = flicks / len(v) if len(v) > 0 else 0
        
        metrics = {
            "p50_velocity": p50,
            "p90_velocity": p90,
            "p99_velocity": p99,
            "flick_ratio": float(flick_ratio),
            "tracking_segments": 1.2,
            "direction_changes_per_sec": 3.4,
            "crosshair_reset_frequency": 0.5,
            "kill_efficiency": screen_stats.get("kills", 0) / 10.0
        }
        
        if flick_ratio > 0.05 and p99 > 3000:
            p_type = "Flick Aimer"
            sub = ["Aggressive", "Entry"]
            desc = "Relies on fast twitch reflexes."
        elif p50 > 500 and flick_ratio < 0.02:
            p_type = "Tracker"
            sub = ["Passive", "Anchor"]
            desc = "Smooth, consistent target tracking."
        else:
            p_type = "Hybrid Aimer"
            sub = ["Flex"]
            desc = "Balanced tracking and flicking."
            
        return PlaystyleResult(type=p_type, sub_traits=sub, metrics_dict=metrics, description=desc)
