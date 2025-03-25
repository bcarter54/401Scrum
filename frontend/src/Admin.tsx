import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StudyGroup } from "./types/StudyGroup";

function Admin() {
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const navigate = useNavigate(); // Navigation hook
  const handleDelete = async (studyGroupId: number) => {
    if (!window.confirm("Are you sure you want to delete this study group?")) {
      return;
    }

    console.log(studyGroupId)
  
    const response = await fetch(`https://localhost:5000/api/Blessings/studygroups/${studyGroupId}`, {
      method: "DELETE",
    });
  
    if (response.ok) {
      setGroups(groups.filter((g) => g.studyGroupID !== studyGroupId)); // Remove from UI
    } else {
      console.error("Failed to delete study group");
    }
  };
  

  // Fetch groups from API
  useEffect(() => {
    


    const fetchGroups = async () => {
      const response = await fetch(
        "https://localhost:5000/api/Blessings/studygroups/pending"
      );
      const data = await response.json();
      setGroups(data);
    };
    fetchGroups();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <td>Group Name</td>
          <td>Approval Status</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {groups.map((g) => (
          <tr key={g.studyGroupID}>
            <td>{g.groupName}</td>
            <td>{g.approved ? "Approved ✅" : "Pending ❌"}</td>
            <td>
              <button onClick={() => navigate(`/edit/${g.studyGroupID}`)}>Edit</button>
            </td>
            <button onClick={() => handleDelete(g.studyGroupID)}>Delete</button>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Admin;
