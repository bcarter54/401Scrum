import React from "react";
import { VideoCategory } from "../types/video";

const VideoList: React.FC<VideoCategory> = ({ category, videos }) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold mb-3 text-gray-800">{category}</h2>
      <div className="space-y-4">
        {videos.map((video, index) => (
          <div key={index} className="bg-white p-3 rounded-lg shadow-md">
            <h3 className="text-sm font-semibold mb-2">{video.title}</h3>
            <div className="relative w-full pt-[56.25%]"> 
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-md"
                src={video.url}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;
