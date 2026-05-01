import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState, useMemo } from "react";

// Helper to generate a random name once per session
function generateRandomName() {
  const adjectives = ["Sunny", "Happy", "Cool", "Clever", "Brave", "Kind", "Witty", "Zen"];
  const animals = ["Panda", "Fox", "Koala", "Tiger", "Rabbit", "Dolphin", "Otter", "Owl"];
  
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  
  return `${adj} ${animal}`;
}

function App() {
  // 1. Hook to get the list of greetings
  const messages = useQuery(api.greetings.get);
  
  // 2. Hook to send a new greeting
  const sendGreeting = useMutation(api.greetings.add);
  
  // 3. State for the input field
  const [input, setInput] = useState("");

  // 4. Generate a persistent name for the current user session
  // useMemo ensures the user doesn't get a new name every time the component re-renders
  const myName = useMemo(() => generateRandomName(), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // We pass both the body and the name to the mutation
    await sendGreeting({ 
      body: input, 
      name: myName 
    });
    setInput("");
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 style={{ margin: 0 }}>Red Opik</h1>
          <p style={styles.userName}>Posting as: <strong>{myName}</strong></p>
        </div>
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
                <div style={styles.messageContent}>
                  {/* msg.name might be undefined for old records, so we fallback to "Guest" */}
                  <span style={styles.nameLabel}>{msg.name ?? "Guest"}:</span>
                  <span>{msg.body}</span>
                </div>
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

// Styles
const styles = {
  container: { maxWidth: "500px", margin: "40px auto", fontFamily: "system-ui, sans-serif", padding: "0 20px" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid #eee", paddingBottom: "10px" },
  userName: { fontSize: "13px", color: "#666", margin: "5px 0 0 0" },
  statusBadge: { fontSize: "12px", padding: "4px 8px", borderRadius: "12px", backgroundColor: "#f0f0f0" },
  main: { marginTop: "20px" },
  messageBox: { minHeight: "200px", padding: "15px", backgroundColor: "#f9f9f9", borderRadius: "8px", marginBottom: "20px" },
  list: { listStyle: "none", padding: 0, margin: 0 },
  listItem: { 
    padding: "10px", 
    backgroundColor: "#fff", 
    marginBottom: "8px", 
    borderRadius: "6px", 
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)", 
    display: "flex", 
    flexDirection: "column",
    gap: "4px"
  },
  messageContent: { display: "flex", gap: "8px", fontSize: "15px" },
  nameLabel: { fontWeight: "bold", color: "#4A90E2", minWidth: "fit-content" },
  timestamp: { color: "#bbb", fontSize: "10px", alignSelf: "flex-end" },
  emptyText: { color: "#666", fontStyle: "italic", textAlign: "center", marginTop: "40px" },
  form: { display: "flex", gap: "10px" },
  input: { flex: 1, padding: "12px", borderRadius: "6px", border: "1px solid #ddd", fontSize: "16px" },
  button: { padding: "10px 20px", backgroundColor: "#4A90E2", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" },
} as const;

export default App;