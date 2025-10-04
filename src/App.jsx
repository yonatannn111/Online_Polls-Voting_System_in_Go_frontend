import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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
            <Link to="/">Polls</Link>
            <Link to="/create">Create Poll</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<PollList />} />
            <Route path="/create" element={<CreatePoll />} />
          </Routes>
        </main>

        <footer>
          <p>© 2025 Online Polls Voting System</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
