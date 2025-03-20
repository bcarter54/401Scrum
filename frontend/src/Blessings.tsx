import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart,
  BubbleController,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bubble } from 'react-chartjs-2';
import { Blessing } from './types/Blessing';
import { Verse } from './types/Verse';
import { useNavigate } from 'react-router-dom';

// Register necessary Chart.js components
Chart.register(BubbleController, LinearScale, PointElement, Tooltip, Legend);

const Blessings: React.FC = () => {
  const navigate = useNavigate();
  // State Management
  const [chartData, setChartData] = useState<{ datasets: any[] }>({
    datasets: [],
  });
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

  useEffect(() => {
    if (!selectedBlessing && !selectedInvitation) {
      setInitialType(toggleType);
    }
  }, [toggleType]);

  // Fetch Data for Chart
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
          setChartData({ datasets: [] });
          return;
        }

        const data = response.data.map((item, index) => ({
          x: index * 80,
          y: (index % 5) * 15 + 5,
          r: Math.sqrt(item.count) * 6,
          label: item.name,
        }));

        setChartData({
          datasets: [
            {
              label:
                toggleType === 'blessing'
                  ? 'Blessing Groups'
                  : 'Invitation Groups',
              data: data,
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
            },
          ],
        });
        setChartVisible(true);
      })
      .catch((error) => console.error('Error fetching chart data:', error))
      .finally(() => setLoading(false));
  }, [toggleType, selectedBlessing, selectedInvitation]);

  // Fetch Verses
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

  // Handle Bubble Click
  const handleBubbleClick = (event: any, elements: any[]) => {
    if (!elements.length) return;

    const clickedIndex = elements[0].index;
    const clickedLabel = chartData.datasets[0].data[clickedIndex].label;

    if (toggleType === 'blessing') {
      setSelectedBlessing(clickedLabel);
      setToggleType('invitation');
    } else if (selectedBlessing) {
      setSelectedInvitation(clickedLabel);
      setChartVisible(false);
    } else {
      setSelectedInvitation(clickedLabel);
      setToggleType('blessing');
    }
  };

  // Handle Reset
  const handleReset = () => {
    setSelectedBlessing(null);
    setSelectedInvitation(null);
    setToggleType(initialType);
    setChartVisible(true);
    setVerses([]);
  };

  // Handle Back - Now correctly restores filtered Step 2 for both paths
  const handleBack = () => {
    if (selectedBlessing && selectedInvitation) {
      // Coming from Step 3, should restore Step 2 (Filtered)
      if (initialType === 'blessing') {
        setSelectedInvitation(null); // Restore Invitations filtered by Blessing
        setToggleType('invitation');
      } else {
        setSelectedBlessing(null); // Restore Blessings filtered by Invitation
        setToggleType('blessing');
      }
      setChartVisible(true);
    }
  };

  return (
    <div className="container">
      <h1>Blessings & Invitations</h1>
      <h3>
        We ought not to think of God’s plan as a cosmic vending machine where we
        (1) select a desired blessing, (2) insert the required sum of good
        works, and (3) the order is promptly delivered... It is essential that
        we honor and obey His laws, but not every blessing predicated on
        obedience to law is shaped, designed, and timed according to our
        expectations.
      </h3>
      <h4>
        D. Todd Chrisofferson, "Our Relationship with God," April 2022 General
        Conference
      </h4>
      {/* Step 1: Show Toggle Button */}
      {!selectedBlessing && !selectedInvitation && (
        <button
          onClick={() =>
            setToggleType(toggleType === 'blessing' ? 'invitation' : 'blessing')
          }
        >
          Show {toggleType === 'blessing' ? 'Invitations' : 'Blessings'}
        </button>
      )}
      {/* Step 2 & 3: Reset Button */}
      {(selectedBlessing || selectedInvitation) && (
        <button onClick={handleReset} style={{ marginLeft: '10px' }}>
          Reset
        </button>
      )}
      {/* Step 3: Back Button */}
      {selectedInvitation && selectedBlessing && (
        <button onClick={handleBack} style={{ marginLeft: '10px' }}>
          Back
        </button>
      )}
      {/* Bubble Chart */}
      {chartVisible && !loading && chartData.datasets.length > 0 && (
        <div
          className="chart-container"
          style={{ width: '800px', height: '500px', margin: '20px auto' }}
        >
          <Bubble
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      const dataPoint = context.raw as {
                        label: string;
                        r: number;
                      };
                      if (!dataPoint) return '';
                      return `${dataPoint.label} (Count: ${Math.round((dataPoint.r / 6) ** 2)})`;
                    },
                  },
                },
              },
              scales: {
                x: { display: false, grid: { display: false } },
                y: { display: false, grid: { display: false } },
              },
              onClick: handleBubbleClick,
            }}
          />
        </div>
      )}

      <button onClick={() => navigate('/request-scripture')}>
        Request a Scripture
      </button>

      {/* Verse Table */}
      {(selectedBlessing || selectedInvitation) && (
        <div className="verse-table-container" style={{ marginTop: '20px' }}>
          <h2>
            Verses where:{' '}
            {selectedBlessing && ` Blessing = "${selectedBlessing}"`}
            {selectedInvitation && ` Invitation = "${selectedInvitation}"`}
          </h2>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '10px',
            }}
          >
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Verse</th>
                <th style={tableHeaderStyle}>Contents</th>
                <th style={tableHeaderStyle}>Invitation</th>
                <th style={tableHeaderStyle}>Blessing</th>
                <th style={tableHeaderStyle}>Like</th>
              </tr>
            </thead>
            <tbody>
              {verses.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    style={{ textAlign: 'center', padding: '10px' }}
                  >
                    No verses found.
                  </td>
                </tr>
              ) : (
                verses.map((verse, index) => (
                  <tr
                    key={index}
                    style={index % 2 === 0 ? evenRowStyle : oddRowStyle}
                  >
                    <td style={tableCellStyle}>{verse.verseLocation}</td>
                    <td style={tableCellStyle}>{verse.contents}</td>
                    <td style={tableCellStyle}>{verse.invitation}</td>
                    <td style={tableCellStyle}>{verse.blessing}</td>
                    <td style={{ ...tableCellStyle, textAlign: 'center' }}>
                      <input type="checkbox" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

/* Table Styling */
const tableHeaderStyle: React.CSSProperties = {
  padding: '12px',
  borderBottom: '2px solid #ccc',
  textAlign: 'center', // Align text to the left (can change to 'center' or 'right' if needed)
  fontWeight: 'bold',
  backgroundColor: '#f4f4f4', // Ensure headers have a distinct background
};

const tableCellStyle: React.CSSProperties = {
  padding: '10px',
  borderBottom: '1px solid #ddd',
  textAlign: 'left', // Adjust this as needed: 'left', 'center', or 'right'
  verticalAlign: 'top', // Ensures multi-line text aligns properly
};

const evenRowStyle: React.CSSProperties = {
  backgroundColor: '#f9f9f9',
};

const oddRowStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
};

export default Blessings;
