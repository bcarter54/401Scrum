export interface Video {
  videoID: number;
  videoName: string;
  url: string;
}

export interface VideoCategory {
  category: string;
  image: string;
  videos: Video[];
}
