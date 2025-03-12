import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart, BubbleController, LinearScale, PointElement } from 'chart.js';
import { Bubble } from 'react-chartjs-2';
import { Blessing } from './types/Blessing';
import { Verse } from './types/Verse';

// Register necessary Chart.js components
Chart.register(BubbleController, LinearScale, PointElement);

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
  const [selectedInvitation, setSelectedInvitation] = useState<string | null>(
    null
  );
  const [chartVisible, setChartVisible] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch Blessing/Invitation Data
  useEffect(() => {
    setLoading(true);
    const url =
      toggleType === 'blessing'
        ? 'https://localhost:5000/api/Blessings/blessings/count'
        : 'https://localhost:5000/api/Blessings/invitations/count';

    console.log('Fetching data for:', toggleType);
    console.log('Using URL:', url);

    axios
      .get<Blessing[]>(url)
      .then((response) => {
        console.log('API Response:', response.data);

        const data = response.data.map((item, index) => ({
          x: index * 10,
          y: Math.random() * 10,
          r: item.count * 5, // Bubble size based on count
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
  }, [toggleType]);

  // Fetch Verse Data When Filter is Applied
  useEffect(() => {
    if (selectedBlessing || selectedInvitation) {
      axios
        .get<Verse[]>(
          `https://localhost:5000/api/Blessings/verses?blessing=${selectedBlessing}&invitation=${selectedInvitation}`
        )
        .then((response) => setVerses(response.data))
        .catch((error) => console.error('Error fetching verses:', error));
    }
  }, [selectedBlessing, selectedInvitation]);

  // Handle Bubble Click
  const handleBubbleClick = (event: any, elements: any[]) => {
    if (!elements.length) return;

    const clickedIndex = elements[0].index;
    const clickedLabel = chartData.datasets[0].data[clickedIndex].label;

    if (toggleType === 'blessing') {
      setSelectedBlessing(clickedLabel);
      setToggleType('invitation');
    } else {
      setSelectedInvitation(clickedLabel);
      setChartVisible(false); // Hide chart when filtering both Blessings and Invitations
    }
  };

  return (
    <div className="container">
      <h1>Blessings</h1>

      {/* Toggle Button */}
      <button
        onClick={() =>
          setToggleType(toggleType === 'blessing' ? 'invitation' : 'blessing')
        }
      >
        Show {toggleType === 'blessing' ? 'Invitations' : 'Blessings'}
      </button>

      {/* Bubble Chart */}
      {chartVisible && !loading && chartData.datasets.length > 0 ? (
        <div className="chart-container">
          <Bubble
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
              },
              onClick: handleBubbleClick,
            }}
          />
        </div>
      ) : (
        <p>No data available to display</p>
      )}

      {/* Verse Table (Only Show When Filter is Applied) */}
      {selectedBlessing || selectedInvitation ? (
        <table>
          <thead>
            <tr>
              <th>Verse</th>
              <th>Invitation</th>
              <th>Blessing</th>
              <th>Like</th>
            </tr>
          </thead>
          <tbody>
            {verses.map((verse, index) => (
              <tr key={index}>
                <td>{verse.verseLocation}</td>
                <td>{verse.invitation}</td>
                <td>{verse.blessingGroup}</td>
                <td>
                  <input type="checkbox" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default Blessings;
