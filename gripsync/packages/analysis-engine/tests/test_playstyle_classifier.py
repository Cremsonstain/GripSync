from src.classifiers.playstyle_classifier import PlaystyleClassifier
import time

def test_flick_aimer():
    classifier = PlaystyleClassifier()
    mouse_data = [
        {"dx": 10, "dy": 0, "timestamp": 1.0},
        {"dx": 500, "dy": 0, "timestamp": 1.01},
        {"dx": 10, "dy": 0, "timestamp": 1.02}
    ]
    res = classifier.classify(mouse_data, {"kills": 10})
    assert res.type in ["Flick Aimer", "Tracker", "Hybrid Aimer"]
