# CivicPulse AI

<p align="center">
  <strong>AI-powered civic intelligence for smarter, more responsive cities.</strong>
</p>
<p align="center">
  Turning citizen feedback and civic data into actionable intelligence for better municipal decision-making.
</p>

<p align="center">
  <a href="https://civicpulse-ai-c331d.web.app/">Live Demo</a> •
  <a href="https://youtu.be/WVoiQ5ekzaI?feature=shared">Demo Video</a> •
  <a href="https://github.com/mariyashaikh-crypto/civicpulse-ai">Repository</a> •
  <a href="https://civicpulse-ai-63o1.onrender.com">Backend API</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.13-3776AB?style=for-the-badge&logo=python&logoColor=white">
  <img src="https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi&logoColor=white">
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/Vite-Build-646CFF?style=for-the-badge&logo=vite&logoColor=white">
  <img src="https://img.shields.io/badge/Firebase-Hosting-FFCA28?style=for-the-badge&logo=firebase&logoColor=black">
  <img src="https://img.shields.io/badge/Render-Backend-46E3B7?style=for-the-badge&logo=render&logoColor=black">
</p>

---

## Overview

**CivicPulse AI** is a full-stack civic intelligence platform that transforms citizen feedback, service requests, and regional civic data into structured insights for municipal decision-making.

The platform helps identify emerging civic issues, detect geographic hotspots, prioritize interventions, and translate civic intelligence into actionable recommendations.

**Citizen Input → Analysis → Prioritization → Intelligence → Action**

---

## Why CivicPulse AI?

Cities generate large volumes of civic information through complaints, service requests, infrastructure issues, and citizen feedback. When this information is handled independently, important patterns can be difficult to identify.

CivicPulse AI provides an intelligence layer that helps municipalities:

* Understand citizen needs
* Identify recurring civic issues
* Detect geographic concentrations
* Prioritize high-impact problems
* Generate actionable recommendations
* Support data-driven planning

---

## Core Capabilities

### Civic Dashboard

A centralized view of civic indicators, requests, priorities, hotspots, and recommendations.

### Citizen Requests

Allows citizens to submit civic issues and service requests that can be processed and analyzed.

### Citizen Voice

Supports more natural civic interaction through voice-based communication.

### Citizen Intelligence

Transforms citizen feedback into structured information that can be analyzed across civic contexts.

### Hotspot Monitoring

Identifies areas where civic issues are concentrated, helping decision-makers understand geographic patterns.

### Priority Intelligence

Analyzes civic issues to determine which problems require greater attention and resources.

### Analytics

Processes civic data to surface meaningful patterns and insights for municipal planning.

### Recommended Projects

Converts identified civic priorities into potential interventions and project recommendations.

### Decision Support

Combines civic intelligence, analytics, priorities, and recommendations into a unified decision-support experience.

---

## Multilingual & Regional Intelligence

CivicPulse AI is designed with multilingual and regional interaction in mind.

**Languages**

* English
* हिन्दी
* मराठी

**Regional Context**

* Pune
* Solapur

This helps keep civic information locally relevant and accessible.

---

## Architecture

```text
                              CITIZENS
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │     React + Vite        │
                    │    CivicPulse UI        │
                    └────────────┬────────────┘
                                 │
                              HTTPS
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │        FastAPI          │
                    │        Backend          │
                    └────────────┬────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
              ▼                  ▼                  ▼
       ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
       │   Citizen   │   │  Analytics  │   │   Hotspot   │
       │   Requests  │   │  Services   │   │    Engine   │
       └─────────────┘   └─────────────┘   └─────────────┘
              │                  │                  │
              └──────────────────┼──────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
                    ▼                         ▼
             ┌─────────────┐         ┌─────────────────┐
             │  Priority   │         │ Recommendation │
             │   Engine    │         │     Engine     │
             └─────────────┘         └─────────────────┘
                    │                         │
                    └────────────┬────────────┘
                                 │
                                 ▼
                       ┌──────────────────┐
                       │   AI Service     │
                       │     Layer        │
                       └────────┬─────────┘
                                │
                                ▼
                     CIVIC INTELLIGENCE
```

### Deployment Architecture

CivicPulse AI separates the frontend and backend into independently deployable services.

```text
                           GitHub
                             │
                 ┌───────────┴───────────┐
                 │                       │
                 ▼                       ▼
        Firebase Hosting              Render
                 │                       │
                 ▼                       ▼
          React + Vite              FastAPI API
            Frontend                   Backend
                 │                       │
                 │   HTTPS API Calls     │
                 └───────────────────────┘
                                         │
                                         ▼
                              Civic Data & Services
```

---

## Technology Stack

**Frontend**

* React
* Vite
* Axios
* CSS
* Firebase Hosting

**Backend**

* Python
* FastAPI
* SQLAlchemy
* Pydantic
* Pandas
* NumPy
* Uvicorn

**Data & Intelligence**

* SQLite
* Regional civic datasets
* Analytics services
* Hotspot detection
* Priority analysis
* Recommendation engine
* AI service layer

**Infrastructure**

* GitHub
* Render
* Firebase Hosting

---

## Project Structure

```text
civicpulse-ai/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── analytics.py
│   │   │   ├── dashboard.py
│   │   │   ├── hotspots.py
│   │   │   ├── recommendations.py
│   │   │   └── requests.py
│   │   ├── data/
│   │   │   └── regions.csv
│   │   ├── services/
│   │   │   ├── ai_service.py
│   │   │   ├── analytics_service.py
│   │   │   ├── hotspot_engine.py
│   │   │   ├── priority_engine.py
│   │   │   └── recommendation_engine.py
│   │   ├── database.py
│   │   ├── models.py
│   │   └── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── lib/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── firebase.json
│   ├── .firebaserc
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## API Endpoints

| Method | Endpoint                    | Description                 |
| ------ | --------------------------- | --------------------------- |
| `GET`  | `/api/dashboard/`           | Dashboard intelligence      |
| `GET`  | `/api/requests/`            | Retrieve civic requests     |
| `GET`  | `/api/analytics/priorities` | Retrieve priority analytics |
| `POST` | `/api/requests/`            | Submit a citizen request    |

---

## Local Development

**Backend**

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

---

## Deployment

```text
GitHub
   │
   ├── backend/  ──────► Render
   │
   └── frontend/ ──────► Firebase Hosting
```

The **FastAPI backend** is deployed on Render, while the **React/Vite frontend** is hosted on Firebase. The frontend communicates with the backend through HTTPS REST API requests.

---

## Live Demo

**Frontend:** https://civicpulse-ai-c331d.web.app/

**Backend API:** https://civicpulse-ai-63o1.onrender.com

**Demo Video:** YOUR_VIDEO_URL

---

## Vision

> **Turn citizen feedback into civic intelligence.**

CivicPulse AI aims to help municipalities move from fragmented citizen requests to connected, actionable intelligence — making it easier to identify problems, prioritize resources, monitor hotspots, and support better decisions.

**Citizen Voice → Civic Intelligence → Smarter Decisions → Better Cities**

---

## Author

<p align="center">
  <strong>Mariyashaikh</strong><br>
  <a href="https://github.com/mariyashaikh-crypto">GitHub Profile</a>
</p>
