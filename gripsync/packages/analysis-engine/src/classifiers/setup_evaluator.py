from pydantic import BaseModel
from typing import Dict, Any, List
from .grip_classifier import GripResult
from .playstyle_classifier import PlaystyleResult

class SetupEvaluation(BaseModel):
    overall_score: float
    component_scores: Dict[str, float]
    bottlenecks_ranked: List[str]
    improvement_potential: str

class SetupEvaluator:
    def evaluate(self, user_setup: Dict[str, Any], grip_result: GripResult, playstyle_result: PlaystyleResult) -> SetupEvaluation:
        scores = {}
        bottlenecks = []
        
        # Monitor
        hz = user_setup.get("monitor_hz", 60)
        if hz >= 240:
            scores["monitor"] = 100
        elif hz >= 144:
            scores["monitor"] = 80
        else:
            scores["monitor"] = 50
            bottlenecks.append("Monitor refresh rate is limiting reaction time.")
            
        # Mouse
        weight = user_setup.get("mouse_weight", 100)
        if grip_result.type == "Fingertip Grip" and weight > 70:
            scores["mouse"] = 60
            bottlenecks.append("Mouse is too heavy for optimal fingertip grip.")
        elif grip_result.type == "Palm Grip" and weight > 90:
            scores["mouse"] = 70
        else:
            scores["mouse"] = 90
            
        # Sensitivity
        edpi = user_setup.get("edpi", 800)
        if playstyle_result.type == "Flick Aimer" and edpi < 200:
            scores["sensitivity"] = 50
            bottlenecks.append("Sensitivity too low for flick-heavy playstyle.")
        else:
            scores["sensitivity"] = 85
            
        overall = sum(scores.values()) / len(scores) if scores else 0
        
        improvement = "High potential for improvement with hardware upgrades." if overall < 70 else "Setup is well-optimized."
        
        return SetupEvaluation(
            overall_score=overall,
            component_scores=scores,
            bottlenecks_ranked=bottlenecks,
            improvement_potential=improvement
        )
