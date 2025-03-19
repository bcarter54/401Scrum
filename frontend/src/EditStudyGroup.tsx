import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StudyGroup } from "./types/StudyGroup";

function EditStudyGroup() {
  const { studyGroupId } = useParams<{ studyGroupId: string }>(); // Extract studyGroupId from the URL
  const navigate = useNavigate();
  const [studyGroup, setStudyGroup] = useState<StudyGroup | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the study group data on component mount
  useEffect(() => {
    const fetchStudyGroup = async () => {
      console.log("Extracted studyGroupId from URL:", studyGroupId);
      if (!studyGroupId) {
        setError("Invalid study group ID.");
        setLoading(false);
        return;
      }

      const studyGroupIdNum = parseInt(studyGroupId); // Convert to number
      console.log(studyGroupIdNum)
      if (isNaN(studyGroupIdNum)) {
        setError("Study group ID must be a number.");
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching study group with ID:", studyGroupIdNum);
        const response = await fetch(
          `https://localhost:5000/api/Blessings/studygroups/${studyGroupIdNum}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        setStudyGroup({
          ...data,
          studyGroupID: data.StudyGroupID, // Ensure property mapping
        });
      } catch (error) {
        console.error("Error fetching study group:", error);
        setError("Failed to load study group data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudyGroup();
  }, [studyGroupId]); // Fetch data when studyGroupId changes

  // Save the edited study group data
  const handleSave = async () => {
    console.log("Passing: " + studyGroupId)
    if (!studyGroup) return;

    try {
      const response = await fetch(
        `https://localhost:5000/api/Blessings/studygroups/${studyGroupId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(studyGroup),
        }
      );

      if (response.ok) {
        alert("Study group updated successfully!");
        navigate("/admin"); // Redirect after save
      } else {
        throw new Error("Error saving study group.");
      }
    } catch (error) {
      setError("Failed to save study group.");
      console.error("Error saving study group:", error);
    }
  };

  // If loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there's an error, show an error message
  if (error) {
    return <div>Error: {error}</div>;
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
            value={studyGroup.groupName || ""}
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
            checked={studyGroup.approved || false}
            onChange={(e) =>
              setStudyGroup({
                ...studyGroup,
                approved: e.target.checked,
              })
            }
          />
        </div>
        <div>
          <button type="button" onClick={handleSave}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditStudyGroup;
