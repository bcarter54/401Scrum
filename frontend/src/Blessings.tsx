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

// Register necessary Chart.js components
Chart.register(BubbleController, LinearScale, PointElement, Tooltip, Legend);

const Blessings: React.FC = () => {
  // State Management
  const [chartData, setChartData] = useState<{ datasets: any[] }>({
    datasets: [],
  });
  const [verses, setVerses] = useState<Verse[]>([]);
  const [toggleType, setToggleType] = useState<'blessing' | 'invitation'>(
    'blessing'
  );
  const [selectedBlessing, setSelectedBlessing] = useState<string | null>(null);
  const [chartVisible, setChartVisible] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch Blessing or Invitation Data
  useEffect(() => {
    setLoading(true);
    console.log(`Fetching data for: ${toggleType}`);

    const url =
      toggleType === 'blessing'
        ? 'https://localhost:5000/api/Blessings/blessings/count'
        : `https://localhost:5000/api/Blessings/invitations/count?blessing=${selectedBlessing || ''}`;

    console.log(`Using URL: ${url}`);

    axios
      .get<Blessing[]>(url)
      .then((response) => {
        console.log('API Response:', response.data);

        if (response.data.length === 0) {
          console.warn('No data received');
          setChartData({ datasets: [] });
          return;
        }

        const data = response.data.map((item, index) => ({
          x: index * 80, // Space out the bubbles
          y: (index % 5) * 15 + 5, // Stagger rows to reduce overlap
          r: Math.sqrt(item.count) * 6, // Scale bubble size
          label: item.name,
        }));

        console.log('Setting chart data:', data);

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
      })
      .catch((error) => console.error('Error fetching chart data:', error))
      .finally(() => setLoading(false));
  }, [toggleType, selectedBlessing]);

  // Fetch Verses when a blessing is selected
  useEffect(() => {
    if (selectedBlessing) {
      console.log(`Fetching verses for: ${selectedBlessing}`);
      axios
        .get<Verse[]>(
          `https://localhost:5000/api/Blessings/verses?blessing=${selectedBlessing}`
        )
        .then((response) => {
          console.log('Verse Data Response:', response.data);
          setVerses(response.data);
        })
        .catch((error) => console.error('Error fetching verses:', error));
    }
  }, [selectedBlessing]);

  // Handle Bubble Click
  const handleBubbleClick = (event: any, elements: any[]) => {
    if (!elements.length) return;

    const clickedIndex = elements[0].index;
    const clickedLabel = chartData.datasets[0].data[clickedIndex].label;

    console.log(`Clicked on: ${clickedLabel}`);

    if (toggleType === 'blessing') {
      setSelectedBlessing(clickedLabel);
      setToggleType('invitation'); // Switch to filtered Invitations
    }
  };

  return (
    <div className="container">
      <h1>Blessings</h1>

      {/* Toggle Button */}
      <button
        onClick={() => {
          setToggleType(toggleType === 'blessing' ? 'invitation' : 'blessing');
          setSelectedBlessing(null); // Reset selection when toggling
        }}
      >
        Show {toggleType === 'blessing' ? 'Invitations' : 'Blessings'}
      </button>

      {/* Bubble Chart */}
      {chartVisible && !loading && chartData.datasets.length > 0 && (
        <div
          className="chart-container"
          style={{
            width: '800px',
            height: '500px',
            margin: '20px auto',
          }}
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
              onClick: handleBubbleClick, // Bubble click handler
            }}
          />
        </div>
      )}

      {/* Verse Table - Always Rendered for Debugging */}
      {selectedBlessing && (
        <div className="verse-table-container" style={{ marginTop: '20px' }}>
          <h2>Verses for {selectedBlessing}</h2>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '10px',
            }}
          >
            <thead>
              <tr style={{ backgroundColor: '#f4f4f4' }}>
                <th style={tableHeaderStyle}>Verse</th>
                <th style={tableHeaderStyle}>Contents</th>
                <th style={tableHeaderStyle}>Invitation</th>
                <th style={tableHeaderStyle}>Blessing</th>
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
