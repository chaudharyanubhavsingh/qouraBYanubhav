
import { Question, Answer, User } from "@/types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    bio: "Software Engineer at Tech Corp",
    reputation: 2500,
    createdAt: new Date("2023-01-15")
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: "Data Scientist and ML enthusiast",
    reputation: 1800,
    createdAt: new Date("2023-02-20")
  },
  {
    id: "3",
    name: "Carol Davis",
    email: "carol@example.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    bio: "UX Designer with 5+ years experience",
    reputation: 3200,
    createdAt: new Date("2022-11-10")
  }
];

export const mockAnswers: Answer[] = [
  {
    id: "a1",
    content: "React is a powerful library for building user interfaces. It uses a component-based architecture that makes code reusable and maintainable. The virtual DOM helps optimize performance by minimizing direct DOM manipulation.",
    author: mockUsers[0],
    questionId: "q1",
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-16"),
    upvotes: 45,
    downvotes: 3,
    userVote: null
  },
  {
    id: "a2",
    content: "I'd also add that React's ecosystem is incredibly rich. You have tools like Next.js for full-stack development, React Router for navigation, and countless UI libraries. The learning curve can be steep initially, but it's worth it.",
    author: mockUsers[1],
    questionId: "q1",
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-17"),
    upvotes: 32,
    downvotes: 1,
    userVote: null
  }
];

export const mockQuestions: Question[] = [
  {
    id: "q1",
    title: "What are the benefits of using React for web development?",
    content: "I'm considering learning React for my next project. What are the main advantages it offers over vanilla JavaScript or other frameworks?",
    author: mockUsers[2],
    tags: ["react", "javascript", "web-development", "frontend"],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-17"),
    views: 1250,
    answers: mockAnswers.filter(a => a.questionId === "q1")
  },
  {
    id: "q2",
    title: "How to implement authentication in a Next.js application?",
    content: "I'm building a Next.js app and need to add user authentication. What are the best practices and libraries to use?",
    author: mockUsers[0],
    tags: ["nextjs", "authentication", "security", "javascript"],
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-14"),
    views: 890,
    answers: []
  },
  {
    id: "q3",
    title: "What's the difference between SQL and NoSQL databases?",
    content: "I'm trying to choose a database for my project. Can someone explain the key differences between SQL and NoSQL databases and when to use each?",
    author: mockUsers[1],
    tags: ["database", "sql", "nosql", "backend"],
    createdAt: new Date("2024-01-13"),
    updatedAt: new Date("2024-01-13"),
    views: 2100,
    answers: []
  }
];
