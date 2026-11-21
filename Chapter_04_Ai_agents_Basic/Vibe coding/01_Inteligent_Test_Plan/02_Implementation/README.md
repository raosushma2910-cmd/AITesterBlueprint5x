# Jira Test Plan

## Run locally

From this folder:

```powershell
npm install
npm run dev
```

Open `http://127.0.0.1:5173`.

## Configuration

The backend reads `../.env` and never returns credential values to the browser:

```text
JIRA_URL=
JIRA_EMAIL=
JIRA_API_TOKEN=
GROQ_API_KEY=
OLLAMA_BASE_URL=
```

The existing parent `.env` provides the Jira URL, email, Jira token, and Groq API key. Choose the model from the provider's available-model list in the app. Ollama also needs its base URL. Settings entered in the UI are held in backend memory for this run and are not written to disk.

## Use

Enter a Jira issue key, select Groq or Ollama, load the available models, choose one, and generate a draft. Use Settings to test Jira or AI connectivity. Plans follow the parent `01_plan/Testplan.md` template and require human review.

## Verification

Run `npm run build` to build the React frontend. Jira and AI live requests require valid credentials, permissions, a configured model, and reachable services; do not treat connection or mock checks as successful plan generation.
