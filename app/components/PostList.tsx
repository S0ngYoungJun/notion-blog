import React from 'react';
import { NotionPost } from '../types/notionTypes';
import styles from './PostList.module.css'
import Link from 'next/link';
interface PostListProps {
  posts: NotionPost[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  if (posts.length === 0) {
    return <p>No posts available.</p>;
  }

  return (
    <div className={styles.postList}>
      {posts.map((post) => (
        <Link href={`/post/${post.id}`} key={post.id} className={styles.link}>
        <div key={post.id} className={styles.postItem}>
          <h2 className={styles.postTitle}>{post.title || 'No title'}</h2>
          <p className={styles.postContent}>{post.post || 'No content'}</p>
          <span className={styles.postDate}>
            {new Date(post.created_time).toLocaleString()}
          </span>
          {/* 태그 표시하기 */}
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