import React, { useState } from "react";

const BASE_URL = "https://online-polls-voting-system-in-go.onrender.com";

export default function PollCard({ poll, onDelete }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [message, setMessage] = useState("");

  const vote = async () => {
    if (!selectedOption) {
      setMessage("Select an option first.");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ poll_id: poll.id, option: selectedOption }),
      });

      if (!res.ok) throw new Error("Failed to vote");
      setMessage("✅ Vote recorded!");
      onDelete && onDelete(); // optional: to refresh list after voting
    } catch (err) {
      console.error(err);
      setMessage("❌ Error voting");
    }
  };

  const deletePoll = async () => {
    try {
      const res = await fetch(`${BASE_URL}/deletePoll`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ poll_id: poll.id }),
      });
      if (!res.ok) throw new Error("Failed to delete poll");
      onDelete(poll.id);
    } catch (err) {
      console.error(err);
      setMessage("❌ Error deleting poll");
    }
  };

  return (
    <div className="poll-card">
      <h3>{poll.question}</h3>
      <ul>
        {poll.options.map((opt, i) => (
          <li key={i}>
            <label>
              <input
                type="radio"
                name={`poll-${poll.id}`}
                value={opt}
                onChange={() => setSelectedOption(opt)}
              />
              {opt} ({poll.votes[opt] || 0})
            </label>
          </li>
        ))}
      </ul>
      <button onClick={vote}>Vote</button>
      <button onClick={deletePoll}>Delete</button>
      {message && <p>{message}</p>}
    </div>
  );
}
