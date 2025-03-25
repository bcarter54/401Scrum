export interface Video {
  title: string;
  url: string;
}

export interface VideoCategory {
  category: string;
  image: string; // New property for the category image
  videos: Video[];
}
