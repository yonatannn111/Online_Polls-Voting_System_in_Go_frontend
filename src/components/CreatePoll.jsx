import React, { useState } from "react";

const BASE_URL = "https://online-polls-voting-system-in-go.onrender.com";

export default function CreatePoll() {
  const [newQuestion, setNewQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [message, setMessage] = useState("");

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const addOption = () => setOptions([...options, ""]);
  const removeOption = (index) => {
    if (options.length > 2) {
      const updated = options.filter((_, i) => i !== index);
      setOptions(updated);
    }
  };

  const createPoll = async (e) => {
    e.preventDefault();
    const filteredOptions = options.map(opt => opt.trim()).filter(Boolean);

    if (!newQuestion.trim() || filteredOptions.length < 2) {
      setMessage("Question and at least 2 options required.");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/polls`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: newQuestion, options: filteredOptions }),
      });

      if (!res.ok) throw new Error("Failed to create poll");
      const data = await res.json();
      setMessage(`Poll created! ID: ${data.id}`);
      setNewQuestion("");
      setOptions(["", ""]);
    } catch (err) {
      console.error(err);
      setMessage("❌ Error creating poll");
    }
  };

  return (
    <div className="create-poll">
      <h2>Create a New Poll</h2>
      <form onSubmit={createPoll}>
        <input
          type="text"
          placeholder="Enter your question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          required
        />
        {options.map((opt, i) => (
          <div key={i} className="option-input">
            <input
              type="text"
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(i, e.target.value)}
              required
            />
            {options.length > 2 && (
              <button type="button" onClick={() => removeOption(i)}>Remove</button>
            )}
          </div>
        ))}
        <button type="button" onClick={addOption}>Add Option</button>
        <button type="submit">Create Poll</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
