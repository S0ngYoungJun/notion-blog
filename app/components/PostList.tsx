import React from 'react';
import { NotionPost } from '../types/notionTypes';
import styles from './PostList.module.css'
interface PostListProps {
  posts: NotionPost[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  if (posts.length === 0) {
    return <p>No posts available.</p>;
  }

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id} className={styles.postItem}>
          <h2 className={styles.postTitle}>{post.title || 'No title'}</h2>
          <p className={styles.postContent}>{post.post || 'No content'}</p>
          <span className={styles.postDate}>
            {new Date(post.created_time).toLocaleString()}
          </span>
          {/* 태그 표시하기 */}
          {post.tags.length > 0 && (
            <div className={styles.tagList}>
              <strong>Tags:</strong>
              <ul>
                {post.tags.map((tag) => (
                  <li key={tag.id} className={styles.tagItem}>{tag.name}</li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default PostList;