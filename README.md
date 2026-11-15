# Plan B with AI

> An AI-powered workout generator that creates personalized training plans in the same format as [Plan B Training](https://github.com/Brunapessoa/b-plan-training).

**Live demo:** https://plan-b-w-ai.vercel.app

---

## Overview

**Plan B with AI** generates a weekly workout plan from four choices: goal, fitness level, training days per week and available equipment. The plan comes from Google's Gemini model and is shown as one table per workout, with exercise, suggested weight and reps.

The output uses the same `{ exercise, weights, reps }` structure as Plan B Training, my offline workout planner, so a generated plan can later be sent to that app.

---

## Features

- Form with goal, level, days per week and equipment
- One workout per training day, each with a descriptive name (e.g. "Upper body", "Full body A")
- Exercise details such as rest time, duration or intensity, when relevant
- Suggested starting weights in kg
- Loading overlay while the plan is being generated
- Clear error messages, including when the AI service is busy
- Responsive, mobile-first layout

---

## How It Works

```
Form (React)  →  POST /api/generate  →  Serverless function  →  Gemini API
                                                 ↓
Table (React)  ←  JSON workout plan  ←──────────┘
```

1. The user picks the options and submits the form. The frontend sends them to `/api/generate`.
2. A Vercel serverless function validates the input. Only the values offered in the form are accepted.
3. The function builds the prompt and calls Gemini. It uses a JSON schema, so the response always follows the expected structure.
4. The function parses the response and returns the workout plan as JSON. The frontend then renders it in tables.

**Why a backend?** The Gemini API key must stay secret. Anything that runs in the browser can be read by anyone, so the key lives only in the serverless function's environment variables. The browser only talks to `/api/generate` and never sees the key.

---

## Tech Stack

| Layer    | Technology                                      |
|----------|-------------------------------------------------|
| Frontend | React 19, TypeScript, Vite                      |
| Styling  | Tailwind CSS v4                                 |
| Backend  | Vercel Serverless Functions                     |
| AI       | Google Gemini API (`@google/genai`), JSON output |
| Hosting  | Vercel                                          |

---

## Running Locally

You need a Gemini API key (free at [Google AI Studio](https://aistudio.google.com)) and the [Vercel CLI](https://vercel.com/docs/cli).

```bash
git clone https://github.com/Brunapessoa/plan-b-w-ai.git
cd plan-b-w-ai
npm install
```

Create a `.env` file in the project root:

```
GEMINI_API_KEY=your_key_here
```

Start the frontend and the API together:

```bash
vercel dev
```

Then open http://localhost:3000.

> `npm run dev` starts only the frontend. Use `vercel dev` so `/api/generate` works locally.

---

## Related Project

[Plan B Training](https://github.com/Brunapessoa/b-plan-training): a lightweight, offline-first workout planner built with vanilla JavaScript.
