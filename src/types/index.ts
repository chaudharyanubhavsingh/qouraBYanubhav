
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  reputation: number;
  createdAt: Date;
}

export interface Question {
  id: string;
  title: string;
  content: string;
  author: User;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  views: number;
  answers: Answer[];
}

export interface Answer {
  id: string;
  content: string;
  author: User;
  questionId: string;
  createdAt: Date;
  updatedAt: Date;
  upvotes: number;
  downvotes: number;
  userVote?: "up" | "down" | null;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}
