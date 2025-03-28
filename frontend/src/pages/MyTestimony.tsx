import { useEffect, useState } from 'react';

type Verse = {
  verse: string;
  invitation: string;
  blessing: string;
};

type Video = {
  url: string;
  videoName: string;
};

type Event = {
  eventID: number;
  topic: string;
  location: string;
  date: string;
  time: string;
};

function MyTestimony() {
  const username = 'user1';

  const [likedVerses, setLikedVerses] = useState<Verse[]>([]);
  const [likedVideos, setLikedVideos] = useState<Video[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [versesRes, videosRes, eventsRes] = await Promise.all([
          fetch(
            `https://localhost:5000/api/testimony/verses?username=${username}`
          ),
          fetch(
            `https://localhost:5000/api/testimony/videos?username=${username}`
          ),
          fetch(`https://localhost:5000/api/testimony/events`),
        ]);

        if (!versesRes.ok || !videosRes.ok || !eventsRes.ok) {
          throw new Error('One or more fetches failed.');
        }

        const versesData = await versesRes.json();
        const videosData = await videosRes.json();
        const eventsData = await eventsRes.json();

        setLikedVerses(Array.isArray(versesData) ? versesData : []);
        setLikedVideos(Array.isArray(videosData) ? videosData : []);
        setEvents(Array.isArray(eventsData) ? eventsData : []);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load testimony data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-8">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      <h1 className="text-4xl font-bold text-center">My Testimony</h1>

      {/* Liked Scriptures */}
      <div className="border border-gray-400 rounded-xl p-4 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Liked Scriptures</h2>
        {likedVerses.length > 0 ? (
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 px-4 py-2 text-left">
                  Verse
                </th>
                <th className="border border-gray-400 px-4 py-2 text-left">
                  Invitation
                </th>
                <th className="border border-gray-400 px-4 py-2 text-left">
                  Blessing
                </th>
              </tr>
            </thead>
            <tbody>
              {likedVerses.map((v, i) => (
                <tr key={i}>
                  <td className="border border-gray-400 px-4 py-2">
                    {v.verse}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {v.invitation}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {v.blessing}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="italic text-gray-500">No liked scriptures found.</p>
        )}
      </div>

      {/* Liked Videos */}
      <div className="border border-gray-400 rounded-xl p-4 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Liked Videos</h2>
        {likedVideos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {likedVideos.map((video, idx) => (
              <div key={idx} className="text-center">
                <div className="aspect-video border border-gray-400 rounded overflow-hidden shadow mb-1">
                  <iframe
                    className="w-full h-full"
                    src={video.url}
                    allowFullScreen
                    title={`video-${idx}`}
                  ></iframe>
                </div>
                <p className="text-sm">{video.videoName}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="italic text-gray-500">No liked videos found.</p>
        )}
      </div>

      {/* Group Meetings */}
      <div className="border border-gray-400 rounded-xl p-4 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Group Meetings</h2>
        {events.length > 0 ? (
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 px-4 py-2 text-left">
                  Date
                </th>
                <th className="border border-gray-400 px-4 py-2 text-left">
                  Time
                </th>
                <th className="border border-gray-400 px-4 py-2 text-left">
                  Topic
                </th>
                <th className="border border-gray-400 px-4 py-2 text-left">
                  Location
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e.eventID}>
                  <td className="border border-gray-400 px-4 py-2">{e.date}</td>
                  <td className="border border-gray-400 px-4 py-2">{e.time}</td>
                  <td className="border border-gray-400 px-4 py-2">
                    {e.topic}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {e.location}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="italic text-gray-500">No upcoming events.</p>
        )}
      </div>
    </div>
  );
}

export default MyTestimony;
