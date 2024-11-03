export type Emotion = {
  id: string;
  label: string;
  color: string;
  icon: string;
};

export type DreamEntry = {
  content: string;
  emotions: string[];
  timestamp: number;
};

export type SharedDream = {
  id: string;
  author: string;
  avatar: string;
  content: string;
  emotions: string[];
  likes: number;
  comments: number;
  timestamp: number;
};

export type Theme = 'light' | 'dark';