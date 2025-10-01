import React, { useState, useEffect } from "react";
import PollCard from "./PollCard";

const BASE_URL = "https://online-polls-voting-system-in-go.onrender.com";

function PollList() {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPolls = async () => {
    try {
      const res = await fetch(`${BASE_URL}/getPolls`);
      const data = await res.json();
      setPolls(data || []);
    } catch (err) {
      console.error("Error fetching polls:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (pollId, option) => {
    try {
      await fetch(`${BASE_URL}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ poll_id: pollId, option }),
      });
      fetchPolls();
    } catch (err) {
      console.error("Error voting:", err);
    }
  };

  const handleDelete = async (pollId) => {
    if (!window.confirm("Are you sure you want to delete this poll?")) return;
    try {
      await fetch(`${BASE_URL}/deletePoll/${pollId}`, {
        method: "DELETE",
      });
      setPolls(polls.filter((p) => p.id !== pollId));
    } catch (err) {
      console.error("Error deleting poll:", err);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  if (loading) return <p>Loading polls...</p>;

  return (
    <div>
      {polls.length === 0 ? (
        <p>No polls available.</p>
      ) : (
        polls.map((poll) => (
          <PollCard key={poll.id} poll={poll} onVote={handleVote} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
}

export default PollList;
