import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type BlessingGroup = {
  id: number;
  name: string;
};

const RequestScripture: React.FC = () => {
  const [verseLocation, setVerseLocation] = useState('');
  const [contents, setContents] = useState('');
  const [invitation, setInvitation] = useState('');
  const [blessing, setBlessing] = useState('');
  const [invitationGroups, setInvitationGroups] = useState<string[]>([]);
  const [blessingGroups, setBlessingGroups] = useState<BlessingGroup[]>([]);
  const [selectedInvitationGroup, setSelectedInvitationGroup] = useState('');
  const [selectedBlessingGroup, setSelectedBlessingGroup] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://localhost:5000/api/Blessings/invitations/groups')
      .then((response) => {
        setInvitationGroups(response.data);
        console.log('Fetched Invitation Groups:', response.data);
      })
      .catch((error) =>
        console.error('Error fetching invitation groups:', error)
      );

    axios
      .get('https://localhost:5000/api/Blessings/blessings/groups')
      .then((response) => {
        console.log('Fetched Blessing Groups:', response.data);

        // Check if data is in string format instead of expected object format
        if (
          Array.isArray(response.data) &&
          typeof response.data[0] === 'string'
        ) {
          // Convert array of strings to array of objects with fake IDs (for now)
          const formattedData = response.data.map((name, index) => ({
            id: index + 1, // Temporary ID (adjust if necessary)
            name,
          }));
          setBlessingGroups(formattedData);
        } else {
          setBlessingGroups(response.data); // Assume it's already correctly structured
        }
      })
      .catch((error) =>
        console.error('Error fetching blessing groups:', error)
      );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const blessingGroupID =
      blessingGroups.find((b) => b.name === selectedBlessingGroup)?.id || null;

    if (!blessingGroupID) {
      alert('Invalid Blessing Group selected.');
      return;
    }

    const newVerse = {
      verseLocation,
      contents,
      invitation,
      blessing,
      invitationGroup: selectedInvitationGroup,
      blessingGroupID,
    };

    console.log('Submitting verse:', newVerse);

    try {
      const response = await axios.post(
        'https://localhost:5000/api/Blessings/add-verse',
        newVerse,
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.status === 201) {
        alert('Verse successfully added!');
        navigate('/blessings');
      } else {
        alert('Failed to add verse.');
      }
    } catch (error) {
      console.error('Error adding verse:', error);
      alert('An error occurred while submitting.');
    }
  };

  return (
    <div>
      <h1>Request a Scripture</h1>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <label>
          Verse Location:
          <input
            type="text"
            value={verseLocation}
            onChange={(e) => setVerseLocation(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Contents:
          <input
            type="text"
            value={contents}
            onChange={(e) => setContents(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Invitation:
          <input
            type="text"
            value={invitation}
            onChange={(e) => setInvitation(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Blessing:
          <input
            type="text"
            value={blessing}
            onChange={(e) => setBlessing(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Invitation Group:
          <select
            value={selectedInvitationGroup}
            onChange={(e) => setSelectedInvitationGroup(e.target.value)}
            required
          >
            <option value="">Select an Invitation Group</option>
            {invitationGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Blessing Group:
          <select
            value={selectedBlessingGroup}
            onChange={(e) => setSelectedBlessingGroup(e.target.value)}
            required
          >
            <option value="">Select a Blessing Group</option>
            {blessingGroups.map((group) => (
              <option key={group.id} value={group.name}>
                {group.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RequestScripture;
