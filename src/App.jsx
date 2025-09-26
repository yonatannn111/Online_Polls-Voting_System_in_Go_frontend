import React, { useState, useEffect } from "react";

function App() {
  const [polls, setPolls] = useState([]);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState("");
  const [error, setError] = useState("");
  const [votedPolls, setVotedPolls] = useState({}); // track which poll user voted for

  const backendUrl = "http://localhost:8080"; // replace with your deployed backend

  const fetchPolls = async () => {
    try {
      const res = await fetch(`${backendUrl}/getPolls`);
      const data = await res.json();
      setPolls(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch polls");
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  const handleVote = async (pollId, option) => {
    try {
      await fetch(`${backendUrl}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ poll_id: pollId, option }),
      });
      setVotedPolls({ ...votedPolls, [pollId]: option });
      fetchPolls();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreatePoll = async (e) => {
    e.preventDefault();
    if (!question || !options) return;
    const optsArray = options.split(",").map((o) => o.trim());

    try {
      await fetch(`${backendUrl}/createPoll`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, options: optsArray }),
      });
      setQuestion("");
      setOptions("");
      fetchPolls();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1 className="title">🗳 Online Polls Voting System</h1>

      <section className="create-poll">
        <h2>Create a New Poll</h2>
        <form onSubmit={handleCreatePoll}>
          <input
            type="text"
            placeholder="Poll Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Options (comma separated)"
            value={options}
            onChange={(e) => setOptions(e.target.value)}
            required
          />
          <button type="submit">Create Poll</button>
        </form>
      </section>

      <section className="available-polls">
        <h2>Available Polls</h2>
        {error && <p className="error">{error}</p>}
        {polls.length === 0 ? (
          <p>No polls available</p>
        ) : (
          polls.map((poll) => (
            <div key={poll.id} className="poll-card">
              <div className="poll-question">{poll.question}</div>
              <ul>
                {poll.options.map((opt) => (
                  <li key={opt}>
                    <button
                      className={`option-button ${
                        votedPolls[poll.id] === opt ? "voted" : ""
                      }`}
                      onClick={() => handleVote(poll.id, opt)}
                      disabled={!!votedPolls[poll.id]}
                    >
                      {opt} - Votes: {poll.votes[opt] || 0}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="total-votes">
                Total Votes: {Object.values(poll.votes).reduce((a, b) => a + b, 0)}
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default App;
