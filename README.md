
# SmartStudyPlan Backend

This repository contains the backend for **SmartStudyPlan**, an AI-powered study schedule generator. The backend handles user onboarding data, communicates with OpenAI API to generate personalized weekly study plans, and serves the data to the frontend application.

---

## Features

- Receive onboarding data from users (daily work hours, subjects, activities, schedule availability).
- Validate user inputs.
- Build prompts for OpenAI API based on user data.
- Generate personalized weekly study plans using AI.
- Return JSON-formatted study plans to the frontend.

---

## Tech Stack

- Node.js
- Express.js
- Axios (for API requests)
- dotenv (for environment variables)

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- OpenAI API Key

### Installation

1. Clone the repository:

```bash
git clone -b backend-clean https://github.com/12ahm-c/SmartStudyPlan.git backend
cd backend

	2.	Install dependencies:

npm install

	3.	Create a .env file in the root of the backend folder and add your OpenAI API key:

OPENAI_API_KEY=your_openai_api_key_here
PORT=5000

Running the Server

Start the backend server:

node server.js

The server will run on http://localhost:5000 by default.

⸻

API Endpoints

1. POST /api/onboarding

Receive user onboarding data for validation.

Request Body:

{
  "dailyWork": { "start": "08:00", "end": "20:00" },
  "schedule": { "Mon": { "status": "free" }, "Tue": { "status": "busy" }, ... },
  "subjects": [ { "name": "Math", "coefficient": 5 }, ... ],
  "activities": [ { "name": "Football", "startTime": "18:00", "endTime": "19:00" }, ... ]
}

Response:

{
  "status": "success",
  "message": "Data received successfully",
  "data": { ... }
}


⸻

2. POST /api/ai

Generate a personalized study plan using OpenAI API.

Request Body:

{
  "data": { ... } // same structure as onboarding
}

Response:

{
  "status": "success",
  "message": "Study plan generated successfully",
  "studyPlan": {
    "Mon": { "08:00-10:00": "Math", "10:30-12:00": "Physics", ... },
    "Tue": { ... },
    ...
  }
}


⸻





يمكنك الآن نسخها كاملة إلى ملف `README.md` في مجلد **backend** ثم عمل commit و push على فرعك.  

إذا أحببت، أستطيع أن أصنع لك **نسخة أبسط جدًا وسريعة الفهم للزملاء** لفرع backend. هل تريد ذلك؟
