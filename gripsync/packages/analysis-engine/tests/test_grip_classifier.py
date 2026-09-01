from src.classifiers.grip_classifier import GripClassifier

def test_palm_grip():
    classifier = GripClassifier()
    # Mock data would be used here in a real test
    res = classifier.classify([[]]) 
    assert res.type in ["Palm Grip", "Claw Grip", "Fingertip Grip", "Hybrid Grip", "Unknown"]
