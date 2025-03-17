import React from "react";
import videos from "../data/videos";
import VideoList from "../components/VideoList";

const VideosPage: React.FC = () => {
  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">Videos</h1>
      {videos.map((categoryData, index) => (
        <VideoList key={index} category={categoryData.category} videos={categoryData.videos} />
      ))}
    </div>
  );
};

export default VideosPage;
