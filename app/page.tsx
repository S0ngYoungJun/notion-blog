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

          {/* 오른쪽 영역: 검색창 공간 */}
          <div className={styles.right}>
            <h2>Search</h2>
            <p>검색창이 여기에 들어갑니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
