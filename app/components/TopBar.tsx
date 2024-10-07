import React from 'react';
import styles from '../styles/TopBar.module.css';

const TopBar: React.FC = () => {
  return (
    <div className={styles.topbar}>
      <div className={styles.logo}> The Wanderers Library</div>
      <div className={styles.menu}>
        
      </div>
    </div>
  );
};

export default TopBar;