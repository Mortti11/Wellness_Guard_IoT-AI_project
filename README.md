# WellnessGuard

This was a university IoT + ML project I did with classmates. The idea was to combine posture detection and simple sensor data in one dashboard.

The main active app in this repo is the Python posture backend in `backend/` and the Node dashboard in `Project_WellnessGuard/`.

## Overview

The project has two active parts:

- `backend/main.py` runs posture detection with MediaPipe and exposes an MJPEG camera feed.
- `Project_WellnessGuard/server.js` serves the dashboard, listens to MQTT sensor data, and forwards updates to the browser with Socket.IO.

There is also a `legacy/` folder. That folder is for older experiments and reference files. It is not the main app path.

## What It Does

- reads heart rate, step count, and inactivity messages from MQTT
- shows those values in a web dashboard
- runs webcam-based posture detection
- exposes the posture feed at `http://localhost:5000/mjpeg`
- stores incoming sensor data in a local SQLite database

## Team Context

This was a group project done for university coursework around IoT and machine learning. It was not a solo project.

## My Role

I was the project manager for the team. The direction around the IoT devices and posture detection was mine. I researched how to implement the steps, coded the sensor side, and implemented the posture detection part.

## Project Structure

```text
.
├── .gitignore
├── Posture-Detection.code-workspace
├── README.md
├── requirements.txt
├── backend/
│   ├── main.py
│   └── posture_detection.py
├── models/
│   └── pose_landmarker_lite.task
├── legacy/
│   ├── mqtt_test.py
│   ├── posture.py
│   ├── posture_test.py
│   ├── stepcounter.py
│   ├── test.py
│   └── templates/
│       ├── back-end.py
│       └── mqtt_test.html
└── Project_WellnessGuard/
    ├── index.html
    ├── package.json
    ├── script.js
    ├── server.js
    └── start_services.sh
```

## Requirements

- Python 3
- Node.js
- an MQTT broker running on `localhost:1883`
- a webcam for the posture detection part

The repo also includes `requirements.txt`. It looks like a broad environment export rather than a small project-only dependency list, so I would treat it carefully.

## Setup

For the active Python backend, `backend/main.py` imports:

- `numpy`
- `opencv-python`
- `mediapipe`
- `flask`
- `flask-cors`

For the Node side, install packages from `Project_WellnessGuard/package.json`:

```bash
cd Project_WellnessGuard
npm install
```

## How to Run

The manual startup path is the clearest one for the current repo.

1. Start an MQTT broker on `localhost:1883`.
2. Start the posture backend:

```bash
python backend/main.py
```

3. Start the dashboard server:

```bash
cd Project_WellnessGuard
node server.js
```

4. Open the dashboard at `http://localhost:3000`.

Notes:

- The browser should connect through the running server at `http://localhost:3000`.
- Do not open `Project_WellnessGuard/index.html` directly as a file if you want the live Socket.IO dashboard to work.
- `Project_WellnessGuard/start_services.sh` exists, but the manual steps above are the clearer documented path.

## MQTT Topics

The active Node server listens for these topics:

- `pulsesensor/bpm`
- `stepcounter/steps`
- `stepcounter/inactivity`

## Troubleshooting

- If the dashboard opens but does not update, make sure the Node server is running and you opened `http://localhost:3000`.
- If the posture feed does not load, make sure `backend/main.py` is running and the webcam is available.
- If MediaPipe cannot load the model, check that `models/pose_landmarker_lite.task` exists.
- If sensor data does not appear, check that the MQTT broker is running on `localhost:1883` and that the topic names match.

## Closing Note

This repo still includes older files in `legacy/` because they are useful as reference for the project history. For the current runnable path, focus on `backend/`, `models/`, and `Project_WellnessGuard/`.
