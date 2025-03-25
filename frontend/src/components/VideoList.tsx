import React, { useState } from "react";
import { VideoCategory } from "../types/video";


const VideoList: React.FC<VideoCategory> = ({ category, image, videos }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-5 text-center">
      {/* Category Image */}
      <div className="d-flex justify-content-center mb-2">
        <img
          src={image}
          alt={category}
          className="img-fluid rounded shadow"
          style={{ width: "200px", height: "130px", objectFit: "cover" }}
        />
      </div>

      {/* Category Toggle Button */}
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-outline-secondary w-75 text-uppercase fw-semibold"
          onClick={() => setIsOpen(!isOpen)}
        >
          {category} <span className="ms-2">{isOpen ? "▲" : "▼"}</span>
        </button>
      </div>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="mt-3 p-3 bg-light rounded mx-auto" style={{ maxWidth: "600px" }}>
          {videos.map((video, index) => (
            <div key={index} className="mb-4">
              <h5>{video.videoName}</h5>
              <div className="ratio ratio-16x9">
                <iframe
                  src={video.url}
                  title={video.videoName}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      )}
      <br></br>
    </div>
  );
};

export default VideoList;