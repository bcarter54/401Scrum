import { useEffect, useState } from 'react';
import { StudyGroup } from './types/StudyGroup';

function Admin() {
  const [groups, setGroups] = useState<StudyGroup[]>([]);

  // Fetch groups from API
  useEffect(() => {
    const fetchGroups = async () => {
      const response = await fetch(
        'https://localhost:5000/api/blessings/studygroups/pending'
      );
      const data = await response.json();
      setGroups(data);
    };
    fetchGroups();
  }, []);

  // Handle delete request
  const handleDelete = async (id: number) => {
    const response = await fetch(
      `https://localhost:5000/api/blessings/studygroups/pending/${id}`, 
      {
        method: 'DELETE', // DELETE method
      }
    );
    
    if (response.ok) {
      // Remove deleted group from state (UI)
      setGroups(groups.filter((g) => g.studyGroupId !== id));
    } else {
      console.error("Failed to delete the group");
    }
  };

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
          <tr key={g.studyGroupId}>
            <td>{g.groupName}</td>
            <td>{g.approved ? "Approved ✅" : "Pending ❌"}</td>
            <td>
              {/* Delete button */}
              <button onClick={() => handleDelete(g.studyGroupId)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Admin;
