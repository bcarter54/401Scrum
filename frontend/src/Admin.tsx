import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StudyGroup } from "./types/StudyGroup";
import { Verse } from "./types/Verse";
import "./Admin.css"; // Import the new CSS file
import "./App.css"

function Admin() {
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [verses, setVerses] = useState<Verse[]>([]);
  const navigate = useNavigate();

  const handleDelete = async (studyGroupId: number) => {
    if (!window.confirm("Are you sure you want to delete this study group?")) {
      return;
    }

    const response = await fetch(`https://localhost:5000/api/Blessings/studygroups/${studyGroupId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setGroups(groups.filter((g) => g.studyGroupID !== studyGroupId));
    } else {
      console.error("Failed to delete study group");
    }
  };

  useEffect(() => {
    const fetchGroups = async () => {
      const response = await fetch("https://localhost:5000/api/Blessings/studygroups/pending");
      const data = await response.json();
      setGroups(data);
    };
    fetchGroups();
  }, []);

  useEffect(() => {
    const fetchVerses = async () => {
      const response = await fetch("https://localhost:5000/api/Blessings/verses/pending");
      const data = await response.json();
      setVerses(data);
    };
    fetchVerses();
  }, []);

  return (
    <div className="container">
      <h1>Study Groups</h1>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Group Name</th>
              <th>Approval Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((g) => (
              <tr key={g.studyGroupID}>
                <td>{g.groupName}</td>
                <td>{g.approved ? "Approved" : "Pending"}</td>
                <td className="actions">
                  <button
                    onClick={() => navigate(`/edit/${g.studyGroupID}`)}
                    className="button button-edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(g.studyGroupID)}
                    className="button button-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
<br /><br />
      <h1>Verses</h1>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Verse Location</th>
              <th>Approval Status</th>
              <th>Verse Content</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {verses.map((v) => (
              <tr key={v.verseID}>
                <td>{v.verseLocation}</td>
                <td>{v.approved ? "Approved" : "Pending"}</td>
                <td>{v.contents}</td>
                <td className="actions">
                  <button onClick={() => navigate(`/edit/pending/${v.verseID}`)} className="button button-edit">
                    Edit
                  </button>
                  <button className="button button-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
