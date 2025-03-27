
import VideoList from "../components/VideoList";
import React, { useEffect, useState } from "react";
import { VideoCategory, Video } from "../types/video";

// Hardcoded categories and images
const categories = [
  "Gospel of Jesus Christ",
  "Inspirational Messages",
  "Book of Mormon Videos",
  "Bible Videos"
];

const categoryImages: Record<string, string> = {
  "Gospel of Jesus Christ": "/images/gospel.jpg",
  "Inspirational Messages": "/images/family.jpg",
  "Book of Mormon Videos": "/images/book-of-mormon.jpg",
  "Bible Videos": "/images/bible.jpg"
};

const VideosPage: React.FC = () => {
  const [videoCategories, setVideoCategories] = useState<VideoCategory[]>([]);

  useEffect(() => {
    fetch("https://localhost:5000/api/videoapi")
      .then((res) => res.json())
      .then((data: Video[]) => {
        const chunkSize = Math.ceil(data.length / categories.length);
        const grouped: VideoCategory[] = categories.map((category, index) => ({
          category,
          image: categoryImages[category],
          videos: data.slice(index * chunkSize, (index + 1) * chunkSize)
        }));
        setVideoCategories(grouped);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
      });
  }, []);

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Videos</h1>
      {videoCategories.map((cat, idx) => (
        <VideoList key={idx} {...cat} />
      ))}
    </div>
  );
};

export default VideosPage;
