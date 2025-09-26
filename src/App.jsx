import React, { useState, useEffect } from "react";
import "./App.css";

const BASE_URL = "https://online_polls-voting_system_in_go.railway.internal";

function App() {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newQuestion, setNewQuestion] = useState("");
  const [newOptions, setNewOptions] = useState(["", ""]);

  // Fetch all polls from backend
  const fetchPolls = async () => {
    try {
      const res = await fetch(`${BASE_URL}/getPolls`);
      const data = await res.json();
      setPolls(data || []); // Ensure array
    } catch (err) {
      console.error("Error fetching polls:", err);
      setPolls([]);
    } finally {
      setLoading(false);
    }
  };

  // Vote for an option
  const vote = async (pollId, option) => {
    try {
      await fetch(`${BASE_URL}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ poll_id: pollId, option }),
      });
      fetchPolls(); // refresh votes
    } catch (err) {
      console.error("Error voting:", err);
    }
  };

  // Create a new poll
  const createPoll = async (e) => {
    e.preventDefault();
    const filteredOptions = newOptions.filter((opt) => opt.trim() !== "");
    if (!newQuestion || filteredOptions.length < 2) {
      alert("Please enter a question and at least 2 options.");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/createPoll`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: newQuestion, options: filteredOptions }),
      });
      const createdPoll = await res.json();
      setPolls([...polls, createdPoll]);
      setNewQuestion("");
      setNewOptions(["", ""]);
    } catch (err) {
      console.error("Error creating poll:", err);
    }
  };

  // Handle option input change
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newOptions];
    updatedOptions[index] = value;
    setNewOptions(updatedOptions);
  };

  // Add more option input fields
  const addOptionField = () => setNewOptions([...newOptions, ""]);

  useEffect(() => {
    fetchPolls();
  }, []);

  if (loading) return <div className="loading">Loading polls...</div>;

  return (
    <div className="app">
      <h1>🗳 Online Polls Voting System</h1>

      {/* Create Poll Form */}
      <form className="create-poll" onSubmit={createPoll}>
        <h2>Create a New Poll</h2>
        <input
          type="text"
          placeholder="Enter poll question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          required
        />
        {newOptions.map((opt, idx) => (
          <input
            key={`opt-${idx}`}
            type="text"
            placeholder={`Option ${idx + 1}`}
            value={opt}
            onChange={(e) => handleOptionChange(idx, e.target.value)}
            required
          />
        ))}
        <button type="button" onClick={addOptionField} className="add-option">
          + Add Option
        </button>
        <button type="submit" className="create-btn">
          Create Poll
        </button>
      </form>

      {/* Poll List */}
      {polls.length === 0 ? (
        <p>No polls available.</p>
      ) : (
        polls.map((poll) => (
          <div key={poll.id || Math.random()} className="poll-card">
            <h2>{poll.question || "Untitled Poll"}</h2>
            <div className="options">
              {(poll.options || []).map((option) => (
                <button
                  key={option}
                  onClick={() => vote(poll.id, option)}
                  className="option-btn"
                >
                  {option} ({poll.votes?.[option] ?? 0})
                </button>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
