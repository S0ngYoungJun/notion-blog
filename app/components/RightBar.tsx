import React from 'react';
import styles from '../styles/RightBar.module.css';

interface Tag {
  id: string;
  name: string;
  color: string; // 태그별 색상을 정의
}

const tags: Tag[] = [
  { id: '1', name: 'React', color: '#61dafb' },
  { id: '2', name: 'Network', color: '#000000' },
  { id: '3', name: 'Javascript', color: '#f7df1e' },
  // 추가 태그
];

const RightBar: React.FC = () => {
  return (
    <div className={styles.rightbar}>
      <div className={styles.search}>검색하기</div>
      <div className={styles.tagSection}>
        <h3>태그</h3>
        <ul className={styles.tagList}>
          {tags.map(tag => (
            <li
              key={tag.id}
              className={styles.tag}
              style={{ backgroundColor: tag.color }} // 태그별로 색상 적용
            >
              {tag.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RightBar;