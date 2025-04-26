import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : {
      "David": 1,
      "Paige": 2,
      "Quinn": 3,
      "Mary": 4,
      "Mine": 5
    };
  });

  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (!savedUsers) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={<LoginPage users={users} setUsers={setUsers} setCurrentUser={setCurrentUser} />} 
        />
        <Route 
          path="/" 
          element={currentUser ? <HomePage currentUser={currentUser} /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
