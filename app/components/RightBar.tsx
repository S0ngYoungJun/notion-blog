"use client"
import React from 'react';
import styles from '../styles/RightBar.module.css';
import { useTagStore } from '../store/useTagStore'; 


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
  const selectedTag = useTagStore(state => state.selectedTag);
  const setSelectedTag = useTagStore(state => state.setSelectedTag);

  const handleTagClick = (tagName: string) => {
    if (selectedTag === tagName) {
      setSelectedTag(null); // 동일한 태그를 클릭하면 필터 해제
    } else {
      setSelectedTag(tagName); // 선택한 태그로 필터 설정
    }
  };
  
  return (
    <div className={styles.rightbar}>
      <div className={styles.search}>검색하기</div>
      <div className={styles.tagSection}>
        <h3>태그</h3>
        <ul className={styles.tagList}>
          {tags.map(tag => (
            <li
              key={tag.id}
              className={`${styles.tag} ${selectedTag === tag.name ? styles.activeTag : ''}`}
              style={{ backgroundColor: tag.color }}
              onClick={() => handleTagClick(tag.name)} // 태그 클릭 이벤트 핸들러
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