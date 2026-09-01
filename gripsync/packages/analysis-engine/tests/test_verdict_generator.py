from src.verdict.generator import VerdictGenerator
from src.classifiers.grip_classifier import GripResult
from src.classifiers.playstyle_classifier import PlaystyleResult
from src.classifiers.setup_evaluator import SetupEvaluation

def test_verdict_generator():
    gen = VerdictGenerator()
    g = GripResult(type="Palm", confidence=1.0, features_dict={}, description="desc")
    p = PlaystyleResult(type="Tracker", sub_traits=[], metrics_dict={"kill_efficiency": 5.0}, description="desc")
    s = SetupEvaluation(overall_score=90, component_scores={}, bottlenecks_ranked=[], improvement_potential="")
    
    v = gen.generate(g, p, s, {"headshots": 10})
    assert v.setup_grade == "A"
    assert v.aim_grade in ["A", "B", "C"]
