import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import PollList from "./components/PollList";
import CreatePoll from "./components/CreatePoll";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <h1>🗳 Online Polls Voting System</h1>
          <nav>
            <NavLink to="/" end className={({ isActive }) => (isActive ? "active-link" : "")}>
              Polls
            </NavLink>
            <NavLink to="/create" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Create Poll
            </NavLink>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<PollList />} />
            <Route path="/create" element={<CreatePoll />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
