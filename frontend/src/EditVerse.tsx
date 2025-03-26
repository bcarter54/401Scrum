import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Verse } from "./types/Verse";

function EditVerse() {
  const { verseID } = useParams<{ verseID: string }>(); // Extract verseID from URL
  const [verse, setVerse] = useState<Verse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVerse = async () => {
      const response = await fetch(`https://localhost:5000/api/Blessings/verses/pending/${verseID}`);
      const data = await response.json();

      if (response.ok) {
        setVerse(data);
      } else {
        console.error("Error fetching verse:", data);
      }
      setLoading(false);
    };

    fetchVerse();
  }, [verseID]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!verse) return;

    const { name, value, type, checked } = e.target;
    setVerse({
      ...verse,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = async () => {
    if (!verse) return;

    const response = await fetch(`https://localhost:5000/api/Blessings/verses/pending${verseID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(verse),
    });

    if (response.ok) {
      alert("Verse updated successfully!");
    } else {
      console.error("Failed to update verse");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!verse) return <div>Verse not found</div>;

  return (
    <div>
      <h2>Edit Verse</h2>
      <form>
        <div>
          <label htmlFor="verseLocation">Verse Location:</label>
          <input
            type="text"
            id="verseLocation"
            name="verseLocation"
            value={verse.verseLocation}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="contents">Contents:</label>
          <textarea
            id="contents"
            name="contents"
            value={verse.contents}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="invitation">Invitation:</label>
          <input
            type="text"
            id="invitation"
            name="invitation"
            value={verse.invitation}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="blessing">Blessing:</label>
          <input
            type="text"
            id="blessing"
            name="blessing"
            value={verse.blessing}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="approved">Approved:</label>
          <input
            type="checkbox"
            id="approved"
            name="approved"
            checked={verse.approved}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="button" onClick={handleSave}>Save</button>
        </div>
      </form>
    </div>
  );
}

export default EditVerse;
