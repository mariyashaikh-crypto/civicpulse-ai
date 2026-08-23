# CivicPulse AI

<p align="center">
  <strong>AI-powered civic intelligence for smarter, more responsive cities.</strong>
</p>

<p align="center">
  CivicPulse AI transforms citizen feedback and civic data into actionable intelligence for municipal decision-making.
</p>

<p align="center">

![Python](https://img.shields.io/badge/Python-3.13-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-Build-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Hosting-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Render](https://img.shields.io/badge/Render-Backend-46E3B7?style=for-the-badge&logo=render&logoColor=black)

</p>

<p align="center">
  <a href="https://github.com/mariyashaikh-crypto/civicpulse-ai">Repository</a>
  •
  <a href="https://civicpulse-ai-63o1.onrender.com">Backend API</a>
</p>

---

## Live Demo

[Visit CivicPulse AI →](https://civicpulse-ai-c331d.web.app/)

## Demo Video

[Watch the CivicPulse AI Demo →](YOUR_VIDEO_URL)

---

## Overview

CivicPulse AI is a civic intelligence platform designed to help cities understand citizen needs, identify emerging civic problems, prioritize interventions, and support data-driven decision-making.

The platform brings together:

- Citizen feedback
- Civic requests
- Regional context
- Hotspot detection
- Priority intelligence
- Analytics
- AI-assisted insights
- Recommended projects
- Decision support
- Multilingual civic interaction

Instead of treating citizen complaints as isolated requests, CivicPulse AI turns them into structured intelligence that can help municipal teams identify patterns and determine where attention is needed most.

---

## Why CivicPulse AI?

Cities generate large amounts of civic information every day.

Citizen complaints, infrastructure issues, service requests, and regional patterns can become difficult to analyze when they are handled independently.

CivicPulse AI provides a unified intelligence layer that helps transform this information into:

**Citizen Input → Analysis → Prioritization → Intelligence → Action**

This creates a more structured approach to understanding civic needs.

---

## Core Capabilities

### Civic Dashboard

A centralized view of important civic indicators, requests, priorities, and recommendations.

### Citizen Requests

Citizens can submit civic issues and requests that can be processed by the platform.

### Citizen Voice

Voice-based interaction allows citizens to communicate civic needs naturally rather than relying only on traditional forms.

### Citizen Intelligence

Citizen feedback is transformed into structured information that can be analyzed across civic contexts.

### Hotspot Monitoring

The platform identifies areas where civic issues are concentrated, helping decision-makers understand geographic patterns.

### Priority Intelligence

Civic issues can be analyzed and prioritized to help identify areas requiring greater attention.

### Analytics

Civic data is processed to generate useful analytical insights for municipal decision-making.

### Recommended Projects

The recommendation layer helps translate identified civic priorities into potential interventions and projects.

### Decision Support

The platform brings together civic intelligence and recommendations to support more informed planning.

---

## Multilingual & Regional Intelligence

Civic services should work within the language and regional context of the people using them.

CivicPulse AI is designed with multilingual and regional interaction in mind.

### Languages

The application supports the languages implemented in the current frontend.

Examples include:

- English
- हिन्दी
- मराठी

### Regional Context

The platform also supports regional civic contexts implemented within the application, including locations such as:

- Pune
- Solapur

Language and regional options are designed to make civic interaction more accessible and locally relevant.

---

## System Architecture

```text
                         CITIZENS
                            |
                            v
                +------------------------+
                |   React + Vite         |
                |   CivicPulse Frontend  |
                +-----------+------------+
                            |
                            | REST API
                            v
                +------------------------+
                |       FastAPI          |
                |       Backend          |
                +-----------+------------+
                            |
          +-----------------+------------------+
          |                 |                  |
          v                 v                  v
   +-------------+   +-------------+   +-------------+
   | Citizen     |   | Analytics   |   | Hotspot     |
   | Requests    |   | Services    |   | Engine      |
   +-------------+   +-------------+   +-------------+
          |                 |                  |
          +-----------------+------------------+
                            |
          +-----------------+------------------+
          |                 |                  |
          v                 v                  v
   +-------------+   +----------------+   +-------------+
   | Priority    |   | Recommendation |   | AI Service  |
   | Engine      |   | Engine         |   |             |
   +-------------+   +----------------+   +-------------+
                            |
                            v
                    Civic Intelligence

Deployment Architecture
                         GitHub Repository
                                |
              +-----------------+-----------------+
              |                                   |
              v                                   v
      Firebase Hosting                         Render
              |                                   |
              v                                   v
      React + Vite Frontend                 FastAPI Backend
              |                                   |
              |        HTTPS REST API             |
              +---------------------------------->|
                                                  |
                                                  v
                                      Civic Data & Services
                                                  |
                           +----------------------+----------------+
                           |                      |                |
                           v                      v                v
                      Analytics             Hotspot Engine   AI Services
                           |
                           v
                   Priority & Recommendation
                       Intelligence

Production Flow

Frontend
React + Vite
     ↓
Firebase Hosting
     ↓
https://civicpulse-ai-c331d.web.app/

Backend
FastAPI
     ↓
Render
     ↓
https://civicpulse-ai-63o1.onrender.com

API Communication
Firebase Frontend
       |
       | HTTPS REST API
       v
Render FastAPI Backend
       |
       v
CivicPulse Intelligence Services

Technology Stack

Frontend
React
Vite
Axios
CSS
Firebase Hosting

Backend
Python
FastAPI
SQLAlchemy
Pydantic
Pandas
NumPy
Uvicorn
Data & Intelligence
SQLite
Regional civic datasets
Analytics services
Hotspot detection
Priority analysis
Recommendation engine
AI service layer

Deployment
GitHub
Render
Firebase Hosting

Project Structure

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
│   │   │
│   │   ├── data/
│   │   │   └── regions.csv
│   │   │
│   │   ├── services/
│   │   │   ├── ai_service.py
│   │   │   ├── analytics_service.py
│   │   │   ├── hotspot_engine.py
│   │   │   ├── priority_engine.py
│   │   │   └── recommendation_engine.py
│   │   │
│   │   ├── database.py
│   │   ├── models.py
│   │   └── main.py
│   │
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
│   │
│   ├── firebase.json
│   ├── .firebaserc
│   ├── package.json
│   └── vite.config.js
│
└── README.md

Architecture

Citizen
   │
   ▼
CivicPulse AI Frontend
   │
   │ API Requests
   ▼
FastAPI Backend
   │
   ├── Analytics
   ├── Citizen Requests
   ├── Hotspot Detection
   ├── Priority Intelligence
   └── Recommendations
   │
   ▼
Civic Data & AI Services

API Endpoints

| Method | Endpoint                    | Purpose                     |
| ------ | --------------------------- | --------------------------- |
| GET    | `/api/dashboard/`           | Dashboard intelligence      |
| GET    | `/api/requests/`            | Retrieve citizen requests   |
| GET    | `/api/analytics/priorities` | Retrieve priority analytics |
| POST   | `/api/requests/`            | Submit a citizen request    |


Local Development
Backend

cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

Frontend

cd frontend
npm install
npm run dev

Deployment

GitHub
   │
   ├── Backend → Render
   │
   └── Frontend → Firebase Hosting

Backend Deployment

The FastAPI backend is deployed on Render.

Frontend Deployment

The React/Vite frontend is deployed using Firebase Hosting.

Vision

CivicPulse AI transforms citizen feedback into actionable civic intelligence, helping municipalities identify problems, prioritize resources, monitor hotspots, and make data-driven decisions.

