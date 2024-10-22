import React from 'react';
import styles from '../styles/TopBar.module.css';
import Link from 'next/link';

const TopBar: React.FC = () => {
  return (
    <div className={styles.topbar}>
      <Link href={`/`} className={styles.link}><div className={styles.logo}> The Wanderers Library</div></Link>
      <div className={styles.menu}>
        
      </div>
    </div>
  );
};

export default TopBar;