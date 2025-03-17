import { VideoCategory } from "../types/video";


const videos: VideoCategory[] = [
  {
    category: "Gospel of Jesus Christ",
    videos: [
      { title: "The Atonement of Jesus Christ", url: "https://www.youtube.com/embed/example1" },
      { title: "Faith in Christ", url: "https://www.youtube.com/embed/example2" }
    ]
  },
  {
    category: "Inspirational Messages",
    videos: [
      { title: "Finding Hope", url: "https://www.youtube.com/embed/example3" },
      { title: "God’s Love", url: "https://www.youtube.com/embed/example4" }
    ]
  },
  {
    category: "Book of Mormon Videos",
    videos: [
      { title: "Nephi’s Journey", url: "https://www.youtube.com/embed/example5" },
      { title: "Abinadi Testifies", url: "https://www.youtube.com/embed/example6" }
    ]
  },
  {
    category: "Bible Videos",
    videos: [
      { title: "The Birth of Christ", url: "https://www.youtube.com/embed/example7" },
      { title: "The Sermon on the Mount", url: "https://www.youtube.com/embed/example8" }
    ]
  }
];

export default videos;
