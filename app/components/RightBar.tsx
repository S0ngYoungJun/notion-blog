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
  const { selectedTag, setSelectedTag } = useTagStore(); // Zustand 스토어에서 상태와 상태변경 함수 가져오기
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
              onClick={() => setSelectedTag(tag.name)} // 태그 클릭 시 선택된 태그를 Zustand에 설정
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