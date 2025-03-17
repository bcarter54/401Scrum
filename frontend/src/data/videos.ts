import { VideoCategory } from "../types/video";

// Convert YouTube share URLs to embed format
const videos: VideoCategory[] = [
  {
    category: "Gospel of Jesus Christ",
    videos: [
      { title: "The Atonement of Jesus Christ", url: "https://www.youtube.com/embed/rdF6NCs7jL8?si=y0LaSADDZ15qiCRV" },
      { title: "Faith in Christ", url: "https://www.youtube.com/embed/YXmkn7OgHMQ?si=BrKiZC0gSbQvuBB2" }
    ]
  },
  {
    category: "Inspirational Messages",
    videos: [
      { title: "Finding Hope", url: "https://www.youtube.com/embed/2w49_1a9X0Q?si=YOt_paAZoJ6fcUpQ" },
      { title: "God’s Love", url: "https://www.youtube.com/embed/lOt6z0Edg3U?si=jx8poGP2EjQ47aBl" }
    ]
  },
  {
    category: "Book of Mormon Videos",
    videos: [
      { title: "Nephi’s Journey", url: "https://www.youtube.com/embed/edg-0hAM3iA?si=5BQjrqZ0T5vA7qF5" },
      { title: "Abinadi Testifies", url: "https://www.youtube.com/embed/DquMLCdVUpo?si=qVRMK33UZAwdkCFR" }
    ]
  },
  {
    category: "Bible Videos",
    videos: [
      { title: "The Birth of Christ", url: "https://www.youtube.com/embed/yXWoKi5x3lw?si=YBOMEwIOg5YlZVdK" },
      { title: "The Sermon on the Mount", url: "https://www.youtube.com/embed/Ik0aS368Kv0?si=JdT1tIg7WhIgKrVh" }
    ]
  }
];

export default videos;
