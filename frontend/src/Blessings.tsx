import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Blessing } from './types/Blessing';
import { Verse } from './types/Verse';
import PackedBubbleChart from './PackedBubbleChart';
import './Blessings.css';

const Blessings: React.FC = () => {
  const navigate = useNavigate();

  const [chartData, setChartData] = useState<
    { label: string; count: number }[]
  >([]);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [toggleType, setToggleType] = useState<'blessing' | 'invitation'>(
    'blessing'
  );
  const [selectedBlessing, setSelectedBlessing] = useState<string | null>(null);
  const [selectedInvitation, setSelectedInvitation] = useState<string | null>(
    null
  );
  const [chartVisible, setChartVisible] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialType, setInitialType] = useState<'blessing' | 'invitation'>(
    'blessing'
  );
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const containerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
    padding: '0 1rem',
  };

  useEffect(() => {
    if (!selectedBlessing && !selectedInvitation) {
      setInitialType(toggleType);
    }
  }, [toggleType]);

  useEffect(() => {
    setLoading(true);
    let url = '';

    if (selectedBlessing && selectedInvitation) {
      setChartVisible(false);
      setLoading(false);
      return;
    }

    if (toggleType === 'blessing') {
      url = selectedInvitation
        ? `https://localhost:5000/api/Blessings/blessings/count?invitation=${selectedInvitation}`
        : 'https://localhost:5000/api/Blessings/blessings/count';
    } else {
      url = selectedBlessing
        ? `https://localhost:5000/api/Blessings/invitations/count?blessing=${selectedBlessing}`
        : 'https://localhost:5000/api/Blessings/invitations/count';
    }

    axios
      .get<Blessing[]>(url)
      .then((response) => {
        if (response.data.length === 0) {
          setChartData([]);
          return;
        }
        const data = response.data.map((item) => ({
          label: item.name,
          count: item.count,
        }));
        setChartData(data);
        setChartVisible(true);
      })
      .catch((error) => console.error('Error fetching chart data:', error))
      .finally(() => setLoading(false));
  }, [toggleType, selectedBlessing, selectedInvitation]);

  useEffect(() => {
    if (!selectedBlessing && !selectedInvitation) return;

    let url = `https://localhost:5000/api/Blessings/verses?`;
    if (selectedBlessing) url += `blessing=${selectedBlessing}`;
    if (selectedInvitation) url += `&invitation=${selectedInvitation}`;

    axios
      .get<Verse[]>(url)
      .then((response) => {
        const uniqueVerses = response.data.filter(
          (verse, index, self) =>
            index ===
            self.findIndex(
              (v) =>
                v.verseLocation === verse.verseLocation &&
                v.contents === verse.contents &&
                v.invitation === verse.invitation &&
                v.blessing === verse.blessing
            )
        );
        setVerses(uniqueVerses);
      })
      .catch((error) => console.error('Error fetching verses:', error));
  }, [selectedBlessing, selectedInvitation]);

  const handleBubbleClick = (label: string) => {
    if (toggleType === 'blessing') {
      setSelectedBlessing(label);
      setToggleType('invitation');
    } else if (selectedBlessing) {
      setSelectedInvitation(label);
      setChartVisible(false);
    } else {
      setSelectedInvitation(label);
      setToggleType('blessing');
    }
  };

  const handleReset = () => {
    setSelectedBlessing(null);
    setSelectedInvitation(null);
    setToggleType(initialType);
    setChartVisible(true);
    setVerses([]);
  };

  const handleBack = () => {
    if (selectedBlessing && selectedInvitation) {
      if (initialType === 'blessing') {
        setSelectedInvitation(null);
        setToggleType('invitation');
      } else {
        setSelectedBlessing(null);
        setToggleType('blessing');
      }
      setChartVisible(true);
    }
  };

  return (
    <div className="container">
      <h1>Blessings & Invitations</h1>

      <button onClick={() => setShowDisclaimer(!showDisclaimer)}>
        {showDisclaimer ? 'Hide Disclaimer' : 'Show Disclaimer'}
      </button>

      {showDisclaimer && (
        <div
          style={{ marginTop: '10px', textAlign: 'center', padding: '0 20px' }}
        >
          <h3>
            We ought not to think of God’s plan as a cosmic vending machine
            where we (1) select a desired blessing, (2) insert the required sum
            of good works, and (3) the order is promptly delivered... It is
            essential that we honor and obey His laws, but not every blessing
            predicated on obedience to law is shaped, designed, and timed
            according to our expectations.
          </h3>
          <h4>
            — D. Todd Christofferson, "Our Relationship with God," April 2022
            General Conference
          </h4>
        </div>
      )}
      <br></br>
      {!selectedBlessing && !selectedInvitation && (
        <button
          onClick={() =>
            setToggleType(toggleType === 'blessing' ? 'invitation' : 'blessing')
          }
        >
          Show {toggleType === 'blessing' ? 'Invitations' : 'Blessings'}
        </button>
      )}

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        {/* Step 1 */}
        {!selectedBlessing && !selectedInvitation && (
          <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
            {toggleType === 'blessing'
              ? 'Step 1: Select a Blessing'
              : 'Step 1: Select an Invitation'}
          </p>
        )}

        {/* Step 2 (Blessings-first path) */}
        {selectedBlessing && !selectedInvitation && (
          <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
            Step 2:<br></br>Select an Invitation<br></br>(filtered by Blessing{' '}
            <em>"{selectedBlessing}"</em>)
          </p>
        )}

        {/* Step 2 (Invitations-first path) */}
        {selectedInvitation && !selectedBlessing && (
          <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
            Step 2:<br></br>Select a Blessing<br></br>(filtered by Invitation{' '}
            <em>"{selectedInvitation}"</em>)
          </p>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '10px',
        }}
      >
        <button onClick={handleReset}>Reset</button>
        {selectedInvitation && selectedBlessing && (
          <button onClick={handleBack}>Back</button>
        )}
      </div>

      {chartVisible && !loading && chartData.length > 0 && (
        <div style={containerStyle}>
          <PackedBubbleChart
            data={chartData}
            onBubbleClick={handleBubbleClick}
          />
        </div>
      )}
      <br></br>
      <button onClick={() => navigate('/request-scripture')}>
        Request a Scripture
      </button>

      {/* Verse Table */}
      {(selectedBlessing || selectedInvitation) && (
        <div style={containerStyle}>
          <h2>
            Verses where:<br></br>
            {selectedBlessing && ` Blessing = "${selectedBlessing}"`}
            <br></br>
            {selectedInvitation && ` Invitation = "${selectedInvitation}"`}
          </h2>

          {verses.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '10px' }}>
              No verses found.
            </p>
          ) : (
            <div className="verse-cards">
              {verses.map((verse, index) => (
                <div key={index} className="verse-card">
                  <p>
                    <strong>Verse:</strong>
                    <br></br>
                    {verse.verseLocation}
                  </p>
                  <br></br>
                  <p>
                    <strong>Invitation:</strong>
                    <br></br>
                    {verse.invitation}
                  </p>
                  <br></br>
                  <p>
                    <strong>Blessing:</strong>
                    <br></br>
                    {verse.blessing}
                  </p>
                  <br></br>
                  <p>
                    <strong>Contents:</strong>
                    <br></br>
                    {verse.contents}
                  </p>
                  <br></br>
                  <p>
                    <strong>Like:</strong>{' '}
                    <input
                      type="checkbox"
                      style={{ verticalAlign: 'middle' }}
                    />
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Blessings;
