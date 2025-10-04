import React, { useEffect, useState } from "react";
import PollCard from "./PollCard";

const BASE_URL = "https://online-polls-voting-system-in-go.onrender.com";

export default function PollList() {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPolls = async () => {
    try {
      const res = await fetch(`${BASE_URL}/getPolls`);
      const data = await res.json();
      setPolls(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  const handleDelete = (pollId) => {
    setPolls(polls.filter(p => p.id !== pollId));
  };

  if (loading) return <p>Loading polls...</p>;
  if (!polls.length) return <p>No polls available.</p>;

  return (
    <div className="poll-list">
      {polls.map((poll) => (
        <PollCard key={poll.id} poll={poll} onDelete={handleDelete} />
      ))}
    </div>
  );
}
