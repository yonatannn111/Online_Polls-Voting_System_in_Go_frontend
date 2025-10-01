import React from "react";

function PollCard({ poll, onVote, onDelete }) {
  return (
    <div className="poll-card">
      <h2>{poll.question || "Untitled Poll"}</h2>
      <div className="options">
        {(poll.options || []).map((option) => (
          <button key={option} onClick={() => onVote(poll.id, option)} className="option-btn">
            {option} ({poll.votes?.[option] ?? 0})
          </button>
        ))}
      </div>
      <button className="delete-btn" onClick={() => onDelete(poll.id)}>
        🗑 Delete Poll
      </button>
    </div>
  );
}

export default PollCard;
