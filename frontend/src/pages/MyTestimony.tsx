import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyTestimony = () => {
  const [likedVerses, setLikedVerses] = useState([]);
  const [likedVideos, setLikedVideos] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('/api/testimony/verses').then((res) => setLikedVerses(res.data));
    axios.get('/api/testimony/videos').then((res) => setLikedVideos(res.data));
    axios.get('/api/testimony/events').then((res) => setEvents(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">My Testimony</h1>

      <h2 className="text-xl font-semibold">Liked Scriptures</h2>
      <table className="table-auto w-full mb-6">
        <thead>
          <tr>
            <th>Verse</th>
            <th>Invitation</th>
            <th>Blessing</th>
          </tr>
        </thead>
        <tbody>
          {likedVerses.map((v) => (
            <tr key={v.verseID}>
              <td>{v.verseLocation}</td>
              <td>{v.invitation}</td>
              <td>{v.blessing}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-semibold">Liked Videos</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {likedVideos.map((video) => (
          <img
            key={video.videoID}
            src={video.url}
            alt="Video thumbnail"
            className="border rounded"
          />
        ))}
      </div>

      <h2 className="text-xl font-semibold">Group Meetings</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Date</th>
            <th>Topic</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e) => (
            <tr key={e.eventID}>
              <td>{e.date}</td>
              <td>{e.topic}</td>
              <td>{e.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyTestimony;
