# ML Engineer Portfolio — EdTech Systems

Portfolio webpage and project repository for machine learning systems, automation pipelines, and deployment-focused prototypes in education technology.

## Principles

- Deployment-first: working systems over novelty
- Modular design: separate scraping logic from business logic
- Automation-first: minimize manual data entry
- Privacy-aware AI: safe, explainable, operator-friendly workflows

## Projects

### Smart Data Collector (MVP)

A lightweight automation system built with React, FastAPI, and SQLite.

- Frontend: React
- Backend: FastAPI
- Database: SQLite
- Automation engine: Python `requests` for MVP, designed to support Playwright/BeautifulSoup later

### Real-Time Computer Vision Prototype

A reliability-focused CV system using YOLO + MediaPipe for real-time object detection and tracking.

- Goal: stable performance under deployment constraints
- Focus: low latency, clear operator feedback, minimal failure modes

## Architecture

| Layer | Technology |
|------|------------|
| Frontend | React |
| Backend | FastAPI |
| Database | SQLite |
| Automation | Python `requests` (MVP), Playwright/BeautifulSoup (future) |

## Quick Start

### Prerequisites

- Node.js 20+
- Python 3.11+

### Frontend

```bash
cd apps/web
npm install
npm start
