import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
import numpy as np
import time
from typing import List, Dict, Any, Optional

class HandTracker:
    def __init__(self, mode: str = "VIDEO", model_path: str = "hand_landmarker.task"):
        """Initialize the hand tracker using MediaPipe Tasks API."""
        self.mode = mode
        self.landmark_buffer: List[Dict[str, Any]] = []
        self.is_tracking = False
        
        base_options = python.BaseOptions(model_asset_path=model_path)
        running_mode = vision.RunningMode.VIDEO if mode == "VIDEO" else vision.RunningMode.LIVE_STREAM
        
        options = vision.HandLandmarkerOptions(
            base_options=base_options,
            running_mode=running_mode,
            num_hands=2,
            result_callback=self._result_callback if running_mode == vision.RunningMode.LIVE_STREAM else None
        )
        try:
            self.landmarker = vision.HandLandmarker.create_from_options(options)
        except Exception as e:
            print(f"Failed to load MediaPipe model: {e}")
            self.landmarker = None

    def _result_callback(self, result: vision.HandLandmarkerResult, output_image: mp.Image, timestamp_ms: int):
        """Callback for LIVE_STREAM mode."""
        if result.hand_landmarks:
            self.landmark_buffer.append({
                "timestamp": timestamp_ms,
                "landmarks": result.hand_landmarks,
                "handedness": result.handedness
            })
            if len(self.landmark_buffer) > 1000:
                self.landmark_buffer.pop(0)

    def start_tracking(self, source=None):
        """Start tracking from a source."""
        self.is_tracking = True
        if self.mode == "VIDEO" and source:
            import cv2
            cap = cv2.VideoCapture(source)
            fps = cap.get(cv2.CAP_PROP_FPS)
            frame_time_ms = int(1000 / fps) if fps > 0 else 33
            frame_idx = 0
            
            while cap.isOpened() and self.is_tracking:
                ret, frame = cap.read()
                if not ret:
                    break
                
                rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb_frame)
                timestamp_ms = frame_idx * frame_time_ms
                
                if self.landmarker:
                    result = self.landmarker.detect_for_video(mp_image, timestamp_ms)
                    if result.hand_landmarks:
                        self.landmark_buffer.append({
                            "timestamp": timestamp_ms,
                            "landmarks": result.hand_landmarks,
                            "handedness": result.handedness
                        })
                
                frame_idx += 1
            cap.release()

    def stop_tracking(self):
        """Stop tracking and close landmarker."""
        self.is_tracking = False
        if self.landmarker:
            self.landmarker.close()

    def get_landmarks(self) -> List[Dict[str, Any]]:
        """Return the collected landmark frames."""
        return self.landmark_buffer

    def get_derived_metrics(self) -> Dict[str, Any]:
        """Calculate derived metrics from the landmark buffer."""
        if not self.landmark_buffer:
            return {}
        
        # Taking the last frame for simple calculation
        last_frame = self.landmark_buffer[-1]
        landmarks = last_frame["landmarks"][0] # Take first hand
        
        # contact points (fingertips: 4, 8, 12, 16, 20)
        # assuming normalized Z represents distance from camera/surface
        fingertips = [4, 8, 12, 16, 20]
        contact_points = []
        for tip in fingertips:
            if landmarks[tip].z < 0: # Arbitrary threshold for "contact"
                contact_points.append(tip)
                
        # arch angle (simplified MCP to tip angle using Euclidean distances)
        # MCP=5, PIP=6, DIP=7, TIP=8 for Index
        v1 = np.array([landmarks[5].x - landmarks[6].x, landmarks[5].y - landmarks[6].y, landmarks[5].z - landmarks[6].z])
        v2 = np.array([landmarks[8].x - landmarks[7].x, landmarks[8].y - landmarks[7].y, landmarks[8].z - landmarks[7].z])
        v1_norm = np.linalg.norm(v1)
        v2_norm = np.linalg.norm(v2)
        arch_angle = 0.0
        if v1_norm > 0 and v2_norm > 0:
            cos_theta = np.dot(v1, v2) / (v1_norm * v2_norm)
            cos_theta = np.clip(cos_theta, -1.0, 1.0)
            arch_angle = np.degrees(np.arccos(cos_theta))
            
        # wrist angle (wrist=0, middle_mcp=9)
        wrist_vector = np.array([landmarks[9].x - landmarks[0].x, landmarks[9].y - landmarks[0].y, landmarks[9].z - landmarks[0].z])
        wrist_norm = np.linalg.norm(wrist_vector)
        wrist_angle = np.degrees(np.arccos(wrist_vector[1] / wrist_norm)) if wrist_norm > 0 else 0.0
        
        # movement amplitude over sliding window
        window = self.landmark_buffer[-30:] if len(self.landmark_buffer) >= 30 else self.landmark_buffer
        xs = [f["landmarks"][0][0].x for f in window]
        ys = [f["landmarks"][0][0].y for f in window]
        movement_amplitude = float(np.std(xs) + np.std(ys))
        
        return {
            "contact_points": contact_points,
            "arch_angle": float(arch_angle),
            "wrist_angle": float(wrist_angle),
            "movement_amplitude": movement_amplitude
        }
