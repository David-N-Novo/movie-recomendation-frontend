import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ setCurrentUser, users, setUsers }) {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const cleanName = username.trim();

    if (!cleanName) {
      alert("Please enter your username!");
      return;
    }

    if (!users[cleanName]) {
      alert("Username not found. Please sign up first!");
      return;
    }

    setCurrentUser(cleanName);
    localStorage.setItem("currentUser", cleanName);
    navigate("/");
  };

  const handleSignUp = () => {
    const cleanName = username.trim();

    if (!cleanName) {
      alert("Please enter a username to sign up!");
      return;
    }

    if (users[cleanName]) {
      alert("Username already exists. Please log in instead!");
      return;
    }

    const newUserId = Object.keys(users).length + 1;
    const updatedUsers = {
      ...users,
      [cleanName]: newUserId,
    };

    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setCurrentUser(username);
    localStorage.setItem("currentUser", cleanName);
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎬 Welcome to Movie Recommender</h1>
      <input
        type="text"
        placeholder="Enter your Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />
      <div style={styles.buttonGroup}>
        <button onClick={handleLogin} style={{ ...styles.button, backgroundColor: "#007BFF" }}>
          Login
        </button>
        <button onClick={handleSignUp} style={{ ...styles.button, backgroundColor: "#28a745" }}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "40px",
    backgroundColor: "#f4f6f8",
    minHeight: "100vh",
  },
  title: {
    fontSize: "2.5rem",
    color: "#333",
    marginBottom: "30px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    width: "250px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default LoginPage;
