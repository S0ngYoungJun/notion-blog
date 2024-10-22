"use client"
import React from 'react';
import { NotionPost } from '../types/notionTypes';
import styles from './PostList.module.css'
import Link from 'next/link';
import { useTagStore } from '../store/useTagStore'

interface PostListProps {
  posts: NotionPost[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  const { selectedTag } = useTagStore(); // 선택된 태그 가져오기
  if (posts.length === 0) {
    return <p>No posts available.</p>;
  }

  const filteredPosts = selectedTag
    ? posts.filter(post => post.tags.some(tag => tag.name === selectedTag))
    : posts;

  if (filteredPosts.length === 0) {
    return <p>No posts available.</p>;
  }

  return (
    <div className={styles.postList}>
      {filteredPosts.map((post) => (
        <Link href={`/post/${post.id}`} key={post.id} className={styles.link}>
          <div key={post.id} className={styles.postItem}>
            <h2 className={styles.postTitle}>{post.title || 'No title'}</h2>
            <span className={styles.postDate}>
              {new Date(post.created_time).toLocaleString()}
            </span>
            {/* 태그 표시 */}
            {post.tags.length > 0 && (
              <div className={styles.tagList}>
                <div className={styles.tagContainer}>
                  {post.tags.map((tag) => (
                    <div key={tag.id} className={styles.tagItem}>{tag.name}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostList;