import { useEffect, useState } from 'react';

interface StudyGroupEvent {
  studyGroupID: number;
  groupName: string;
  topic: string;
  location: string;
  date: string;
  time: string;
}

function StudyGroups() {
  const [studyGroups, setStudyGroups] = useState<StudyGroupEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudyGroups = async () => {
      try {
        const response = await fetch(
          'https://localhost:44367/api/Blessings/studygroups'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch study groups');
        }
        const data = await response.json();
        setStudyGroups(data);
      } catch (err) {
        setError('Error loading study groups.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudyGroups();
  }, []);

  const handleJoinGroup = async (studyGroupID: number) => {
    const username = 'YourLoggedInUsername'; // Replace this with actual username from authentication context

    try {
      const response = await fetch(
        'https://localhost:44367/api/Blessings/studygroups/join',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Username: username,
            StudyGroupID: studyGroupID,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to join study group');
      }

      alert('Successfully joined the study group!');
    } catch (error) {
      alert('Error joining study group.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <h2>Study Groups</h2>
      <table>
        <thead>
          <tr>
            <th>Group Name</th>
            <th>Topic</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {studyGroups.map((group) => (
            <tr key={group.studyGroupID}>
              <td>{group.groupName}</td>
              <td>{group.topic}</td>
              <td>{group.location}</td>
              <td>{group.date}</td>
              <td>{group.time}</td>
              <td>
                <button onClick={() => handleJoinGroup(group.studyGroupID)}>
                  Join Group
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudyGroups;
