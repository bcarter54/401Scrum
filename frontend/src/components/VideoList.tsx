import React, { useState } from "react";
import { VideoCategory } from "../types/video";

const VideoList: React.FC<VideoCategory> = ({ category, videos }) => {
  const [isOpen, setIsOpen] = useState(false); // Controls dropdown visibility

  return (
    <div className="mb-4">
      {/* Category Title - Click to Toggle Videos */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-3 bg-gray-200 rounded-lg font-semibold text-lg flex justify-between items-center"
      >
        {category}
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>

      {/* Videos List (Hidden Until Clicked) */}
      {isOpen && (
        <div className="mt-2 p-3 bg-gray-100 rounded-lg">
          {videos.map((video, index) => (
            <div key={index} className="mb-3">
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
      )}
    </div>
  );
};

export default VideoList;
