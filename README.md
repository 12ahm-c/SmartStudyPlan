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
