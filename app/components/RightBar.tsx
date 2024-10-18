import React from 'react';
import styles from '../styles/TopBar.module.css';

const TopBar: React.FC = () => {
  return (
    <div className={styles.rightbar}>
      <div className={styles.logo}> 검색하기</div>
      <div className={styles.menu}>태그</div>
    </div>
  );
};

export default TopBar;