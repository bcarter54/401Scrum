import { useState } from "react";

function RequestStudyGroup() {
  const [groupName, setGroupName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newGroup = {
      groupName,
      approved: false, // New groups should be unapproved by default
    };

    const response = await fetch("https://localhost:5000/api/Blessings/studygroups", {  // <-- Updated to HTTPS
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGroup),
    });

    if (response.ok) {
      setSubmitted(true);
      setGroupName("");
    }
  };

  return (
    <div>
      <h2>Request a Study Group</h2>
      {submitted ? (
        <p>Your request has been submitted for approval.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Group Name:
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
            />
          </label>
          <button type="submit">Request Group</button>
        </form>
      )}
    </div>
  );
}

export default RequestStudyGroup;
