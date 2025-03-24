import React from "react";
import videos from "../data/videos";
import VideoList from "../components/VideoList";

const VideosPage: React.FC = () => {
  return (
    <div >
      <div className="container py-4">
      <h1 className="text-center mb-4">Videos</h1>
      {videos.map((categoryData, index) => (
      <VideoList
        key={index}
        category={categoryData.category}
        image={categoryData.image}
        videos={categoryData.videos}
        />
        ))}
      </div>
    </div>

  );
};

export default VideosPage;
