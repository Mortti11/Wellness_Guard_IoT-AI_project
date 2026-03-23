# 🛡️ WellnessGuard

A comprehensive health monitoring system that combines **real-time posture detection**, **heart rate monitoring**, **step counting**, and **activity tracking** into a unified web dashboard.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Installation](#installation)
- [How to Run](#how-to-run)
- [Usage Guide](#usage-guide)
- [API Reference](#api-reference)
- [Configuration](#configuration)
- [How It Works](#how-it-works)

---

## 🎯 Overview

WellnessGuard is designed to help users maintain healthy habits by:

- **Monitoring posture** in real-time using computer vision
- **Tracking heart rate** from pulse sensors via MQTT
- **Counting steps** from pedometer sensors
- **Alerting users** when they've been in bad posture too long
- **Reminding users** to move with a configurable timer

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📷 **Live Posture Detection** | Uses webcam + MediaPipe AI to analyze body posture |
| ❤️ **Heart Rate Monitoring** | Real-time BPM display from pulse sensors |
| 📊 **Heart Rate History Chart** | Visual graph of heart rate over time |
| 👟 **Step Counter** | Tracks daily steps from pedometer |
| 🏃 **Activity Status** | Shows Active/Inactive based on heart rate |
| ⏱️ **Move Reminder Timer** | Configurable countdown to remind you to move |
| 🔴 **Bad Posture Alerts** | Warning after 3 minutes of poor posture |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    WellnessGuard System                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐      ┌─────────────┐      ┌─────────────┐ │
│  │   Webcam    │      │ IoT Sensors │      │    MQTT     │ │
│  │             │      │(Heart/Steps)│      │   Broker    │ │
│  └──────┬──────┘      └──────┬──────┘      └──────┬──────┘ │
│         │                    │                    │        │
│         ▼                    └────────┬───────────┘        │
│  ┌─────────────┐                      ▼                    │
│  │  Posture    │             ┌─────────────┐               │
│  │  Detection  │             │  Node.js    │               │
│  │  (Python)   │             │  Server     │               │
│  │  Port 5000  │             │  Port 3000  │               │
│  └──────┬──────┘             └──────┬──────┘               │
│         │                           │                      │
│         │    MJPEG Stream           │  Socket.IO           │
│         │                           │                      │
│         └───────────┬───────────────┘                      │
│                     ▼                                      │
│            ┌─────────────────┐                             │
│            │  Web Dashboard  │                             │
│            │   (Browser)     │                             │
│            └─────────────────┘                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
Posture-Detection/
│
├── main.py                    # Main posture detection server (Flask + MediaPipe)
├── posture.py                 # Alternative posture detection implementation
├── posture_detection.py       # Utility functions (distance/angle calculations)
├── mqtt_test.py               # Flask + MQTT + SocketIO backend
├── test.py                    # Webcam testing utility
├── stepcounter.py             # Step counter module (placeholder)
├── requirements.txt           # Python dependencies
│
├── Project_WellnessGuard/     # Main web application
│   ├── server.js              # Node.js server (MQTT + Socket.IO + SQLite)
│   ├── index.html             # Web dashboard UI
│   ├── script.js              # Dashboard JavaScript logic
│   └── start_services.sh      # Startup script (Linux/Mac)
│
└── templates/                 # Flask templates
    ├── back-end.py            # Alternative MQTT backend
    └── mqtt_test.html         # Simple MQTT message display
```

---

## 📦 Requirements

### Software Prerequisites

| Software | Version | Purpose |
|----------|---------|---------|
| Python | 3.8+ | Posture detection backend |
| Node.js | 16+ | Web server backend |
| MQTT Broker | (Mosquitto) | IoT message routing |

### Python Packages

```
opencv-python      # Video capture and processing
mediapipe          # AI pose estimation
flask              # Web server
flask-mqtt         # MQTT integration
flask-socketio     # WebSocket support
eventlet           # Async networking
numpy              # Numerical operations
```

### Node.js Packages

```
express            # Web server
socket.io          # Real-time communication
mqtt               # MQTT client
sqlite3            # Database
```

---

## 🔧 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/Ehalkola/Project_WellnessGuard.git
cd Posture-Detection
```

### Step 2: Install Python Dependencies

```bash
pip install opencv-python mediapipe flask flask-mqtt flask-socketio eventlet numpy
```

### Step 3: Install Node.js Dependencies

```bash
cd Project_WellnessGuard
npm install express socket.io mqtt sqlite3
```

### Step 4: Install MQTT Broker (Mosquitto)

**Windows:**
Download from https://mosquitto.org/download/

**Linux (Ubuntu/Debian):**
```bash
sudo apt install mosquitto mosquitto-clients
```

**macOS:**
```bash
brew install mosquitto
```

---

## 🚀 How to Run

### Option 1: Using Shell Script (Linux/Mac)

```bash
cd Project_WellnessGuard
chmod +x start_services.sh
./start_services.sh
```

### Option 2: Manual Startup (All Platforms)

Open **4 separate terminals**:

**Terminal 1 - Start MQTT Broker:**
```bash
mosquitto
```

**Terminal 2 - Start Posture Detection Server:**
```bash
python main.py
```

**Terminal 3 - Start Node.js Server:**
```bash
cd Project_WellnessGuard
node server.js
```

**Terminal 4 - Open Dashboard:**
Open `Project_WellnessGuard/index.html` in a web browser

### Access Points

| Service | URL |
|---------|-----|
| Web Dashboard | Open `index.html` in browser |
| Posture Camera Feed | http://localhost:5000/mjpeg |
| Node.js API | http://localhost:3000 |

---

## 📖 Usage Guide

### 1. Posture Detection

1. Position your webcam to capture a **side view** of yourself
2. Sit in your normal position
3. The system will display:
   - **Green lines** = Good posture ✅
   - **Red lines** = Bad posture ❌
4. Watch for the "Aligned" / "Not Aligned" indicator in the top-right
5. After **3 minutes** of bad posture, you'll receive an alert

### 2. Move Reminder Timer

1. Enter the number of minutes in the input field
2. Click **Start** to begin countdown
3. Click **Pause** to pause the timer
4. Click **Reset** to restart from the beginning
5. When timer reaches zero, you'll get an alert to move

### 3. Heart Rate & Steps

- Connect your IoT sensors (Arduino/ESP32) to the MQTT broker
- Publish heart rate to: `pulsesensor/bpm`
- Publish step count to: `stepcounter/steps`
- Publish activity status to: `stepcounter/inactivity`

---

## 📡 API Reference

### Posture Detection Server (Port 5000)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Main page |
| `/mjpeg` | GET | MJPEG video stream with posture overlay |

### MQTT Topics

| Topic | Data Type | Description |
|-------|-----------|-------------|
| `pulsesensor/bpm` | Integer | Heart rate in beats per minute |
| `stepcounter/steps` | Integer | Current step count |
| `stepcounter/inactivity` | String | Activity status message |

### Socket.IO Events

| Event | Direction | Data |
|-------|-----------|------|
| `mqtt_message` | Server → Client | `{topic, payload}` |
| `connect` | Client → Server | Connection established |
| `disconnect` | Client → Server | Connection closed |

---

## ⚙️ Configuration

### Camera Settings (main.py / posture.py)

```python
device = 0                              # Camera index (0 = default)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280) # Width in pixels
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720) # Height in pixels
cap.set(cv2.CAP_PROP_FPS, 30)           # Frames per second
```

### MQTT Settings (mqtt_test.py)

```python
MQTT_BROKER_URL = '127.0.0.1'   # Broker IP address
MQTT_BROKER_PORT = 1883         # Broker port
MQTT_KEEPALIVE = 5              # Keep-alive interval (seconds)
```

### Posture Thresholds (main.py)

```python
# Good posture criteria:
neck_inclination < 40    # Neck angle less than 40 degrees
torso_inclination < 10   # Torso angle less than 10 degrees

# Camera alignment:
offset < 100             # Shoulder distance threshold for side view
```

---

## 🔬 How It Works

### Posture Detection Algorithm

1. **Capture** video frame from webcam
2. **Process** with MediaPipe Pose to detect body landmarks
3. **Extract** key points: shoulders, ear, hip
4. **Calculate** angles:
   - **Neck Inclination**: Angle between shoulder-ear line and vertical
   - **Torso Inclination**: Angle between hip-shoulder line and vertical
5. **Evaluate** posture:
   - If neck < 40° AND torso < 10° → **Good Posture**
   - Otherwise → **Bad Posture**
6. **Track** time spent in each posture state
7. **Alert** if bad posture exceeds 180 seconds

### Body Landmarks Used

```
       👂 Ear
        │
        │  ← Neck Angle
        │
       ─┼─ Shoulders
        │
        │  ← Torso Angle
        │
       ─┼─ Hip
```

### Visual Feedback Colors

| Color | Meaning |
|-------|---------|
| 🟢 Green | Good posture indicators |
| 🔴 Red | Bad posture indicators |
| 🟡 Yellow | Body landmark points |
| 💗 Pink | Right shoulder marker |

---

## 🗄️ Database Schema (SQLite)

The Node.js server stores sensor data in `mytopic.db`:

```sql
-- Heart rate readings
CREATE TABLE heartrate (
    timestamp TEXT,
    bpm INTEGER
);

-- Step count readings  
CREATE TABLE steps (
    timestamp TEXT,
    steps INTEGER
);

-- Inactivity alerts
CREATE TABLE inactivity (
    timestamp TEXT,
    status TEXT
);
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Camera not detected | Check `device` variable (try 0, 1, or `/dev/video0`) |
| "Not Aligned" warning | Position camera for side view of your body |
| MQTT not connecting | Ensure Mosquitto broker is running |
| No sensor data | Check MQTT topic names match exactly |
| Video stream lag | Reduce resolution or frame rate |

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👥 Contributors

- **Ehalkola** - Project Owner

---

## 🔗 Links

- Repository: https://github.com/Ehalkola/Project_WellnessGuard
- MediaPipe Documentation: https://mediapipe.dev/
- Mosquitto MQTT: https://mosquitto.org/
