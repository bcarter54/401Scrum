import { useEffect, useState } from 'react';
import './StudyGroups.css';

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

  // Function to format the date as YYYY-MM-DD
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  // Function to format military time to AM/PM
  const formatTime = (timeString: string): string => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for midnight
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

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
    <div className="study-groups-container">
      <h2 style={{ fontSize: '30px' }}>Study Groups</h2>
      {studyGroups.map((group) => (
        <div key={group.studyGroupID} className="study-group-card">
          <div className="study-group-title">{group.groupName}</div>
          <div className="study-group-details">
            <strong>Topic:</strong> {group.topic}
          </div>
          <div className="study-group-details">
            <strong>Location:</strong> {group.location}
          </div>
          <div className="study-group-details">
            <strong>Date:</strong> {formatDate(group.date)}
          </div>
          <div className="study-group-details">
            <strong>Time:</strong> {formatTime(group.time)}
          </div>
          <button
            className="join-button"
            onClick={() => handleJoinGroup(group.studyGroupID)}
          >
            Join Group
          </button>
        </div>
      ))}
    </div>
  );
}

export default StudyGroups;
