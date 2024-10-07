import React, { createContext, useState , ReactNode } from 'react';

interface Post {
  id: string;
  title: string;
}

interface PostContextType {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
}

interface PostProviderProps {
  children: ReactNode;  // children에 대한 타입 정의 추가
}

export const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostContext.Provider>
  );
};