from pydantic import BaseModel
from typing import Dict, Any
from ..classifiers.grip_classifier import GripResult
from ..classifiers.playstyle_classifier import PlaystyleResult
from ..classifiers.setup_evaluator import SetupEvaluation

class Verdict(BaseModel):
    setup_grade: str
    aim_grade: str
    tag: str
    one_liner: str
    detailed_brief_markdown: str

class VerdictGenerator:
    def __init__(self):
        self.templates = {
            ("A", "C"): "Your setup is cracked but your aim is holding you back.",
            ("C", "A"): "You're a BUDGET_WARRIOR dropping heads on a toaster.",
            ("A", "A"): "PEAK_PERFORMANCE achieved. Setup and aim are in perfect sync.",
            ("C", "C"): "SKILL_ISSUE and HARDWARE_CHOKED. Time to upgrade both."
        }

    def generate(self, grip: GripResult, playstyle: PlaystyleResult, setup: SetupEvaluation, screen: Dict[str, Any]) -> Verdict:
        # Calculate grades
        setup_grade = "A" if setup.overall_score >= 80 else ("B" if setup.overall_score >= 60 else "C")
        
        aim_score = playstyle.metrics_dict.get("kill_efficiency", 0) * 10 + (screen.get("headshots", 0) * 2)
        aim_grade = "A" if aim_score > 50 else ("B" if aim_score > 20 else "C")
        
        # Determine tag
        if setup_grade == "C" and aim_grade == "C":
            tag = "SKILL_ISSUE"
        elif setup_grade == "C" and aim_grade == "A":
            tag = "BUDGET_WARRIOR"
        elif setup_grade == "A" and aim_grade == "A":
            tag = "PEAK_PERFORMANCE"
        else:
            tag = "IDENTITY_CRISIS"
            
        template_key = (setup_grade, aim_grade)
        one_liner = self.templates.get(template_key, f"Grip: {grip.type}, Style: {playstyle.type}")
        
        brief = f"""# GripSync Verdict
## Setup Grade: {setup_grade}
## Aim Grade: {aim_grade}
### Grip Analysis
{grip.description}
### Playstyle Analysis
{playstyle.description}
### Hardware Bottlenecks
{chr(10).join(f"- {b}" for b in setup.bottlenecks_ranked)}
"""
        
        return Verdict(
            setup_grade=setup_grade,
            aim_grade=aim_grade,
            tag=tag,
            one_liner=one_liner,
            detailed_brief_markdown=brief
        )
