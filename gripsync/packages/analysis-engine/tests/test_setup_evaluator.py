from src.classifiers.setup_evaluator import SetupEvaluator
from src.classifiers.grip_classifier import GripResult
from src.classifiers.playstyle_classifier import PlaystyleResult

def test_setup_eval():
    evaluator = SetupEvaluator()
    g = GripResult(type="Fingertip Grip", confidence=0.9, features_dict={}, description="")
    p = PlaystyleResult(type="Flick Aimer", sub_traits=[], metrics_dict={}, description="")
    setup = {"monitor_hz": 60, "mouse_weight": 100, "edpi": 400}
    
    res = evaluator.evaluate(setup, g, p)
    assert res.overall_score > 0
    assert len(res.bottlenecks_ranked) > 0
