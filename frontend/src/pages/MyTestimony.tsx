import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Verse = {
  verse: string;
  invitation: string;
  blessing: string;
  contents?: string;
};

type Video = {
  url: string;
};

type Event = {
  eventID: number;
  topic: string;
  location: string;
  date: string;
  time: string;
};

const MyTestimony = () => {
  const username = 'user1'; // Replace this later with actual login

  const [likedVerses, setLikedVerses] = useState<Verse[]>([]);
  const [likedVideos, setLikedVideos] = useState<Video[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Fetch liked verses
    axios
      .get(`/api/testimony/verses?username=${username}`)
      .then((res) => {
        console.log('Verses:', res.data);
        setLikedVerses(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error('Error loading verses', err);
        setLikedVerses([]);
      });

    // Fetch liked videos
    axios
      .get(`/api/testimony/videos?username=${username}`)
      .then((res) => {
        console.log('Videos:', res.data);
        setLikedVideos(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error('Error loading videos', err);
        setLikedVideos([]);
      });

    // Fetch events
    axios
      .get('/api/testimony/events')
      .then((res) => {
        console.log('Events:', res.data);
        setEvents(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error('Error loading events', err);
        setEvents([]);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">My Testimony</h1>

      {/* Liked Scriptures */}
      <h2 className="text-xl font-semibold mb-2">Liked Scriptures</h2>
      {likedVerses.length > 0 ? (
        <table className="table-auto w-full mb-6 border">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Verse</th>
              <th className="px-4 py-2 text-left">Invitation</th>
              <th className="px-4 py-2 text-left">Blessing</th>
            </tr>
          </thead>
          <tbody>
            {likedVerses.map((v, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-2">{v.verse}</td>
                <td className="px-4 py-2">{v.invitation}</td>
                <td className="px-4 py-2">{v.blessing}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="italic text-gray-500 mb-6">No liked scriptures found.</p>
      )}

      {/* Liked Videos */}
      <h2 className="text-xl font-semibold mb-2">Liked Videos</h2>
      {likedVideos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {likedVideos.map((video, idx) => (
            <div key={idx} className="border rounded p-2">
              <iframe
                className="w-full aspect-video"
                src={video.url}
                allowFullScreen
                title={`video-${idx}`}
              ></iframe>
            </div>
          ))}
        </div>
      ) : (
        <p className="italic text-gray-500 mb-6">No liked videos found.</p>
      )}

      {/* Upcoming Events */}
      <h2 className="text-xl font-semibold mb-2">Group Meetings</h2>
      {events.length > 0 ? (
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Time</th>
              <th className="px-4 py-2 text-left">Topic</th>
              <th className="px-4 py-2 text-left">Location</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.eventID} className="border-t">
                <td className="px-4 py-2">{e.date}</td>
                <td className="px-4 py-2">{e.time}</td>
                <td className="px-4 py-2">{e.topic}</td>
                <td className="px-4 py-2">{e.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="italic text-gray-500">No upcoming events.</p>
      )}
    </div>
  );
};

export default MyTestimony;
