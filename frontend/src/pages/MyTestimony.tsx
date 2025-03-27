import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Verse } from '../types/Verse';
import { Video } from '../types/video';

type Event = {
  eventID: number;
  topic: string;
  location: string;
  date: string; // ISO string
  time: string;
};

const MyTestimony = () => {
  const username = 'user1'; // TODO: replace with auth context/localStorage

  const [likedVerses, setLikedVerses] = useState<Verse[]>([]);
  const [likedVideos, setLikedVideos] = useState<Video[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    axios
      .get(`/api/testimony/verses?username=${username}`)
      .then((res) => {
        console.log('Verses response:', res.data);
        setLikedVerses(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => console.error('Error loading verses', err));

    axios
      .get(`/api/testimony/videos?username=${username}`)
      .then((res) => {
        console.log('Videos response:', res.data);
        setLikedVideos(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => console.error('Error loading videos', err));

    axios
      .get('/api/testimony/events')
      .then((res) => {
        console.log('Events response:', res.data);
        setEvents(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => console.error('Error loading events', err));
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
            {likedVerses.map((v, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-4 py-2">{v.verseLocation}</td>
                <td className="px-4 py-2">{v.invitation}</td>
                <td className="px-4 py-2">{v.blessing}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 italic mb-6">No liked scriptures found.</p>
      )}

      {/* Liked Videos */}
      <h2 className="text-xl font-semibold mb-2">Liked Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {likedVideos.length > 0 ? (
          likedVideos.map((video, idx) => (
            <div key={idx} className="border rounded p-2">
              <iframe
                className="w-full aspect-video mb-2"
                src={video.url}
                allowFullScreen
              ></iframe>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No liked videos found.</p>
        )}
      </div>

      {/* Upcoming Events */}
      <h2 className="text-xl font-semibold mb-2">Upcoming Events</h2>
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
        <p className="text-gray-500 italic">No upcoming events.</p>
      )}
    </div>
  );
};

export default MyTestimony;
