import { getPosts } from './lib/notion';
import PostList from './components/PostList';
import TopBar from './components/TopBar';
import styles from './page.module.css'
export default async function Home() {
  const posts = await getPosts();


  return (
    <div className={styles.root}>
      <div className={styles.top}>
      <TopBar />
      </div>
      <div className={styles.main}>
        <div className={styles.container}>
          {/* 왼쪽 영역: 포스트 목록 */}
          <div className={styles.left}>
            <PostList posts={posts} />
          </div>
  
        </div>
      </div>
    </div>
  );
}
