import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

async function request(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers }
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Request failed.");
  return result;
}

function App() {
  const [page, setPage] = useState("home");
  const [settings, setSettings] = useState(null);
  const [draft, setDraft] = useState({});
  const [provider, setProvider] = useState("groq");
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [loadingModels, setLoadingModels] = useState(false);
  const [issueKey, setIssueKey] = useState("");
  const [plan, setPlan] = useState("");
  const [busy, setBusy] = useState("");
  const [notice, setNotice] = useState("");

  async function loadSettings() {
    const data = await request("/api/settings");
    setSettings(data);
    setDraft({ jiraUrl: data.jiraUrl, jiraEmail: data.jiraEmail, ollamaUrl: data.ollamaUrl });
    if (!data.ai.groqKeyConfigured) setProvider("ollama");
  }

  async function loadModels() {
    setLoadingModels(true);
    setNotice("");
    setModels([]);
    setSelectedModel("");
    try {
      const data = await request(`/api/models/${provider}`);
      setModels(data.models);
      if (!data.models.length) setNotice("No models are available for this provider.");
    } catch (error) {
      setNotice(error.message);
    } finally {
      setLoadingModels(false);
    }
  }

  useEffect(() => {
    loadSettings().catch((error) => setNotice(error.message));
  }, []);

  function updateDraft(name, value) {
    setDraft((current) => ({ ...current, [name]: value }));
  }

  function chooseProvider(value) {
    setProvider(value);
    setModels([]);
    setSelectedModel("");
  }

  async function saveSettings(event) {
    event.preventDefault();
    setBusy("save");
    setNotice("");
    try {
      const data = await request("/api/settings", {
        method: "POST",
        body: JSON.stringify(draft)
      });
      setSettings(data);
      setDraft({ jiraUrl: data.jiraUrl, jiraEmail: data.jiraEmail, ollamaUrl: data.ollamaUrl });
      setNotice("Settings updated for this session.");
    } catch (error) {
      setNotice(error.message);
    } finally {
      setBusy("");
    }
  }

  async function testConnection(service) {
    setBusy(service);
    setNotice("");
    try {
      const data = await request(`/api/test/${service}`, {
        method: "POST",
        body: JSON.stringify({
          provider,
          jiraUrl: draft.jiraUrl,
          jiraEmail: draft.jiraEmail,
          jiraToken: draft.jiraToken,
          groqApiKey: draft.groqApiKey,
          ollamaUrl: draft.ollamaUrl
        })
      });
      setNotice(data.message);
    } catch (error) {
      setNotice(error.message);
    } finally {
      setBusy("");
    }
  }

  async function generatePlan(event) {
    event.preventDefault();
    if (!issueKey.trim()) {
      setNotice("Enter a Jira issue ID.");
      return;
    }
    if (!selectedModel) {
      setNotice("Load and select an AI model before generating.");
      return;
    }
    setBusy("generate");
    setNotice("");
    setPlan("");
    try {
      const data = await request("/api/generate", {
        method: "POST",
        body: JSON.stringify({ issueKey: issueKey.trim(), provider, model: selectedModel })
      });
      setPlan(data.plan);
      setNotice(`Generated from ${data.issueKey}. Review before use.`);
    } catch (error) {
      setNotice(error.message);
    } finally {
      setBusy("");
    }
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" onClick={() => setPage("home")}>
          <span className="brand-mark">Q</span> QA Test Plan
        </a>
        <button className="settings-link" onClick={() => setPage(page === "settings" ? "home" : "settings")}>
          {page === "settings" ? "Back to generator" : "Settings"}
        </button>
      </header>

      {page === "home" ? (
        <section className="workspace">
          <div className="intro">
            <p className="eyebrow">JIRA ISSUE TO TEST PLAN</p>
            <h1>Plan testing with clarity.</h1>
            <p>Retrieve an issue and draft a test plan that follows your QA template.</p>
          </div>
          <div className="generator-card">
            <form onSubmit={generatePlan}>
              <label htmlFor="issue">Jira issue ID</label>
              <div className="issue-row">
                <input id="issue" placeholder="e.g. QA-123" value={issueKey}
                  onChange={(event) => setIssueKey(event.target.value)} />
                <button className="primary" disabled={busy !== ""}>
                  {busy === "generate" ? "Generating…" : "Generate test plan"}
                </button>
              </div>
              <div className="provider-row">
                <span>AI provider</span>
                <label className="radio-label">
                  <input type="radio" name="provider" value="groq" checked={provider === "groq"}
                    onChange={() => chooseProvider("groq")} /> Groq
                </label>
                <label className="radio-label">
                  <input type="radio" name="provider" value="ollama" checked={provider === "ollama"}
                    onChange={() => chooseProvider("ollama")} /> Ollama
                </label>
              </div>
              <div className="model-row">
                <button type="button" className="text-button" disabled={loadingModels || busy !== ""} onClick={loadModels}>
                  {loadingModels ? "Loading models…" : "Load available models"}
                </button>
                <label htmlFor="model">Model
                  <select id="model" value={selectedModel} disabled={!models.length}
                    onChange={(event) => setSelectedModel(event.target.value)}>
                    <option value="">Select a model</option>
                    {models.map((model) => <option key={model} value={model}>{model}</option>)}
                  </select>
                </label>
              </div>
            </form>
            {notice && <p className="notice" role="status">{notice}</p>}
          </div>
          <section className="plan-card" aria-live="polite">
            <div className="plan-heading">
              <div><p className="eyebrow">DRAFT OUTPUT</p><h2>Test plan</h2></div>
              {plan && <button className="secondary" onClick={() => navigator.clipboard.writeText(plan)}>Copy</button>}
            </div>
            {plan ? <pre className="plan-output">{plan}</pre> :
              <div className="empty-state"><span className="empty-icon">✦</span><p>Your generated test plan will appear here.</p></div>}
          </section>
          <p className="review-note">Generated plans are drafts. Review and approve them before use.</p>
        </section>
      ) : (
        <section className="settings-page">
          <div className="intro">
            <p className="eyebrow">CONFIGURATION</p>
            <h1>Settings</h1>
            <p>Credentials stay on the backend and are never sent to the browser as configuration values.</p>
          </div>
          <form onSubmit={saveSettings} className="settings-grid">
            <section className="setting-card">
              <div className="card-title"><span className="card-icon">J</span><div><h2>Jira connection</h2><p>Connect to your Jira workspace</p></div></div>
              <label>Jira URL<input value={draft.jiraUrl || ""} onChange={(e) => updateDraft("jiraUrl", e.target.value)} placeholder="https://your-domain.atlassian.net" /></label>
              <label>Email<input value={draft.jiraEmail || ""} onChange={(e) => updateDraft("jiraEmail", e.target.value)} placeholder="you@company.com" /></label>
              <label>API token<input type="password" autoComplete="new-password" value={draft.jiraToken || ""}
                onChange={(e) => updateDraft("jiraToken", e.target.value)} placeholder={settings?.jiraTokenConfigured ? "Configured in environment" : "Enter Jira API token"} /></label>
              <div className="button-row"><button type="button" className="secondary" disabled={busy !== ""} onClick={() => testConnection("jira")}>{busy === "jira" ? "Testing…" : "Test connection"}</button></div>
            </section>
            <section className="setting-card">
              <div className="card-title"><span className="card-icon violet">✦</span><div><h2>LLM configuration</h2><p>Choose and test your AI provider</p></div></div>
              <label className="provider-choice"><input type="radio" name="settings-provider" checked={provider === "ollama"} onChange={() => chooseProvider("ollama")} /> Ollama local connection</label>
              <label>Ollama URL<input value={draft.ollamaUrl || ""} onChange={(e) => updateDraft("ollamaUrl", e.target.value)} placeholder="Set OLLAMA_BASE_URL in .env" /></label>
              <label className="provider-choice"><input type="radio" name="settings-provider" checked={provider === "groq"} onChange={() => chooseProvider("groq")} /> Groq.com</label>
              <label>Groq API key<input type="password" autoComplete="new-password" value={draft.groqApiKey || ""}
                onChange={(e) => updateDraft("groqApiKey", e.target.value)} placeholder={settings?.ai.groqKeyConfigured ? "Configured in environment" : "Enter Groq API key"} /></label>
              <div className="button-row"><button type="button" className="secondary" disabled={busy !== ""} onClick={() => testConnection("ai")}>{busy === "ai" ? "Testing…" : `Test ${provider === "groq" ? "Groq" : "local LLM"}`}</button></div>
              <p className="hint">Available models are loaded from the selected provider. Choose one on the generator page.</p>
            </section>
            <div className="save-row"><button className="primary" disabled={busy !== ""}>{busy === "save" ? "Saving…" : "Save settings"}</button></div>
          </form>
          {notice && <p className="notice settings-notice" role="status">{notice}</p>}
        </section>
      )}
      <footer>Built for QA teams <span>•</span> Test plans require human review</footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
