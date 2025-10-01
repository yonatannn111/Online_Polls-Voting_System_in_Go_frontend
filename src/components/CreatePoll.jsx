import React, { useState } from "react";

const BASE_URL = "https://online-polls-voting-system-in-go.onrender.com";

function CreatePoll() {
  const [newQuestion, setNewQuestion] = useState("");
  const [newOptions, setNewOptions] = useState(["", ""]);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newOptions];
    updatedOptions[index] = value;
    setNewOptions(updatedOptions);
  };

  const addOptionField = () => setNewOptions([...newOptions, ""]);

  const removeOptionField = (index) => {
    if (newOptions.length > 2) {
      setNewOptions(newOptions.filter((_, idx) => idx !== index));
    }
  };

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

      if (!res.ok) throw new Error("Failed to create poll");
      alert("✅ Poll created successfully!");
      setNewQuestion("");
      setNewOptions(["", ""]);
    } catch (err) {
      alert("❌ Error creating poll: " + err.message);
    }
  };

  return (
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
        <div key={idx} className="option-field">
          <input
            type="text"
            placeholder={`Option ${idx + 1}`}
            value={opt}
            onChange={(e) => handleOptionChange(idx, e.target.value)}
            required
          />
          {newOptions.length > 2 && (
            <button type="button" onClick={() => removeOptionField(idx)} className="remove-btn">
              ❌
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={addOptionField} className="add-option">
        ➕ Add Option
      </button>
      <button type="submit" className="create-btn">
        ✅ Create Poll
      </button>
    </form>
  );
}

export default CreatePoll;
