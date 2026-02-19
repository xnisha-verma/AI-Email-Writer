# AI Email Writer

AI-powered Chrome Extension that generates contextual email replies directly inside Gmail using a cloud-deployed Spring Boot backend integrated with Google Gemini API.

---

## 🌐 Live Backend

🔗 https://ai-email-writer-crn8.onrender.com

---

## 📌 Project Overview

AI Email Writer is a full-stack application that:

- Injects an "AI Reply" button inside Gmail
- Generates professional email responses using AI
- Communicates with a secure cloud-deployed Spring Boot backend
- Uses environment-based configuration for API security
- Is fully Dockerized and deployed on Render

---

## 🏗 System Architecture

The request flow works as follows:

1. Gmail UI (Chrome Extension)
2. Content Script (DOM Injection + Fetch API)
3. Spring Boot REST API (Hosted on Render)
4. Google Gemini API
5. AI-generated email response returned to Gmail

---

## 🛠 Tech Stack

### Frontend (Chrome Extension)
- JavaScript
- Chrome Manifest V3
- DOM Manipulation
- MutationObserver
- Fetch API

### Backend
- Spring Boot 3
- Maven
- REST APIs
- Google Gemini API
- CORS Configuration
- Environment Variables

### Deployment
- Render (Cloud Deployment)
- GitHub

---

## 🔐 Security Implementation

- API keys stored securely using environment variables
- No secrets committed to GitHub
- Backend-only AI API communication
- CORS configured for secure cross-origin access
- Dynamic port binding for cloud environments:i API
        ↓
Generated Email Response

---

## 🧪 API Endpoints

### 🔹 Health Check

**Response**

```json
{
  "status": "UP",
  "service": "AI Email Writer Backend"
}

POST /api/email/generate
{
  "emailContent": "Test email",
  "tone": "professional"
}
Generated AI reply text


