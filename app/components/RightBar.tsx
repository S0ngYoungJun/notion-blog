import React from 'react';
import styles from '../styles/RightBar.module.css';

const TopBar: React.FC = () => {
  return (
    <div className={styles.rightbar}>
      <div className={styles.search}>검색하기</div>
      <div className={styles.tag}>태그</div>
    </div>
  );
};

export default TopBar;