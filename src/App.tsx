import { useState } from "react";
import "./App.css";

type EdgeInfo = {
  runtime: string;
  timestamp: string;
  colo: string;
  country: string;
};

function App() {
  const [edgeInfo, setEdgeInfo] = useState<EdgeInfo | null>(null);
  const [loading, setLoading] = useState(false);

  async function callEdgeApi() {
    setLoading(true);

    const response = await fetch("/api/edge-info");
    const data = await response.json();

    setEdgeInfo(data);
    setLoading(false);
  }

  return (
    <main>
      <p className="eyebrow">Cloudflare Connect demo</p>

      <h1>
        React frontend.
        <br />
        <span>Workers backend.</span>
      </h1>

      <p className="intro">
        This React application is running locally through Vite. Next, it will
        use a Cloudflare Worker API from the same application.
      </p>

      <button onClick={callEdgeApi} disabled={loading}>
        {loading ? "Calling Worker..." : "Call the edge API"}
      </button>

      <section className="card">
        <h2>What this demonstrates</h2>
        <ul>
          <li>React builds the user interface.</li>
          <li>Vite provides the development workflow.</li>
          <li>Workers will provide the backend API.</li>
          <li>Workers can serve both assets and API logic.</li>
        </ul>
      </section>

      {edgeInfo && (
        <section className="card">
          <h2>Worker response</h2>
          <pre>{JSON.stringify(edgeInfo, null, 2)}</pre>
        </section>
      )}
    </main>
  );
}

export default App;