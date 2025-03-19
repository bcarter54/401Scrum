import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StudyGroup } from './types/StudyGroup';

function EditStudyGroup() {
  const { studyGroupId } = useParams<{ studyGroupId: string }>(); // Extract studyGroupId from the URL
  const [studyGroup, setStudyGroup] = useState<StudyGroup | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch the study group data on component mount
  useEffect(() => {
    const fetchStudyGroup = async () => {
        const response = await fetch(
          `http://localhost:5000/api/Blessings/studygroups/${studyGroupId}`
        );
        const data = await response.json();
      
        if (response.ok) {
          // Map the StudyGroupID from the API to studyGroupID for consistency in React
          setStudyGroup({
            ...data,
            studyGroupID: data.StudyGroupID, // Rename property here
          });
          setLoading(false);
        } else {
          console.error('Error fetching study group:', data);
          setLoading(false);
        }
      };
      

    fetchStudyGroup();
  }, [studyGroupId]); // Fetch data when studyGroupId changes

  // If loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If no data found, show an error message
  if (!studyGroup) {
    return <div>Study group not found</div>;
  }

  return (
    <div>
      <h2>Edit Study Group</h2>
      <form>
        <div>
          <label htmlFor="groupName">Group Name:</label>
          <input
            type="text"
            id="groupName"
            name="groupName"
            value={studyGroup.groupName}
            onChange={(e) =>
              setStudyGroup({
                ...studyGroup,
                groupName: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="approved">Approval Status:</label>
          <input
            type="checkbox"
            id="approved"
            name="approved"
            checked={studyGroup.approved}
            onChange={(e) =>
              setStudyGroup({
                ...studyGroup,
                approved: e.target.checked,
              })
            }
          />
        </div>
        <div>
          <button type="button">Save</button>
        </div>
      </form>
    </div>
  );
}

export default EditStudyGroup;
