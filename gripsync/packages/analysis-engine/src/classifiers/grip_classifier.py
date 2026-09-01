from pydantic import BaseModel
from typing import List, Dict, Any
import numpy as np

class GripResult(BaseModel):
    type: str
    confidence: float
    features_dict: Dict[str, float]
    description: str

class GripClassifier:
    def __init__(self):
        pass

    def classify(self, landmark_frames: List[List[Any]]) -> GripResult:
        if not landmark_frames:
            return GripResult(type="Unknown", confidence=0.0, features_dict={}, description="No data")

        # Mock feature extraction
        palm_contact_ratio = 0.8
        finger_arch_angle = 30.0
        fingertip_spread = 5.0
        thumb_position = 45.0
        grip_stability = 2.0

        features = {
            "palm_contact_ratio": palm_contact_ratio,
            "finger_arch_angle": finger_arch_angle,
            "fingertip_spread": fingertip_spread,
            "thumb_position": thumb_position,
            "grip_stability": grip_stability
        }

        # Rule-based logic
        if palm_contact_ratio > 0.7 and finger_arch_angle < 45:
            grip_type = "Palm Grip"
            conf = 0.9
            desc = "Full palm contact, flat fingers."
        elif finger_arch_angle > 60 and palm_contact_ratio > 0.3:
            grip_type = "Claw Grip"
            conf = 0.85
            desc = "Arched fingers, base of palm touching."
        elif palm_contact_ratio < 0.2 and fingertip_spread > 4:
            grip_type = "Fingertip Grip"
            conf = 0.8
            desc = "Only fingertips touching, high mobility."
        else:
            grip_type = "Hybrid Grip"
            conf = 0.6
            desc = "Mixed grip characteristics."

        return GripResult(type=grip_type, confidence=conf, features_dict=features, description=desc)
