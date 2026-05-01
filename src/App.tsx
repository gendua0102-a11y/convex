import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState } from "react";

function App() {
  // 1. Hook to get the list of greetings (returns undefined while loading)
  const messages = useQuery(api.greetings.get);
  
  // 2. Hook to send a new greeting
  const sendGreeting = useMutation(api.greetings.add);
  
  const [input, setInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    await sendGreeting({ body: input });
    setInput("");
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Convex Hello World</h1>
        <div style={styles.statusBadge}>
          {messages === undefined ? "🟠 Connecting..." : "🟢 Live"}
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.messageBox}>
          {/* Loading State */}
          {messages === undefined && <p>Syncing with cloud...</p>}

          {/* Empty State */}
          {messages !== undefined && messages.length === 0 && (
            <p style={styles.emptyText}>No greetings yet. Be the first!</p>
          )}

          {/* Data List */}
          <ul style={styles.list}>
            {messages?.map((msg) => (
              <li key={msg._id} style={styles.listItem}>
                <span>{msg.body}</span>
                <small style={styles.timestamp}>
                  {new Date(msg._creationTime).toLocaleTimeString()}
                </small>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a greeting..."
          />
          <button type="submit" style={styles.button}>
            Send
          </button>
        </form>
      </main>
    </div>
  );
}

// Simple styles to make it look clean
const styles = {
  container: { maxWidth: "500px", margin: "40px auto", fontFamily: "system-ui, sans-serif" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #eee", paddingBottom: "10px" },
  statusBadge: { fontSize: "12px", padding: "4px 8px", borderRadius: "12px", backgroundColor: "#f0f0f0" },
  main: { marginTop: "20px" },
  messageBox: { minHeight: "200px", padding: "15px", backgroundColor: "#f9f9f9", borderRadius: "8px", marginBottom: "20px" },
  list: { listStyle: "none", padding: 0 },
  listItem: { padding: "8px", backgroundColor: "#fff", marginBottom: "8px", borderRadius: "4px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", display: "flex", justifyContent: "space-between" },
  timestamp: { color: "#999", fontSize: "10px" },
  emptyText: { color: "#666", fontStyle: "italic" },
  form: { display: "flex", gap: "10px" },
  input: { flex: 1, padding: "10px", borderRadius: "4px", border: "1px solid #ccc" },
  button: { padding: "10px 20px", backgroundColor: "#4A90E2", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
} as const;

export default App;