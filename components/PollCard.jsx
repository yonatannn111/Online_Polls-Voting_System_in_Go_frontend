import React from "react";

export default function PollCard({ poll, handleVote }) {
  return (
    <div className="poll-card">
      <h2>{poll.question}</h2>
      <div className="options">
        {poll.options.map((option) => (
          <button
            key={option}
            onClick={() => handleVote(poll.id, option)}
          >
            {option} ({poll.votes[option] || 0})
          </button>
        ))}
      </div>
    </div>
  );
}
