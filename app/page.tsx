import { getPosts } from './lib/notion';
import PostList from './components/PostList';
import styles from './page.module.css'
export default async function Home() {
  const posts = await getPosts();


  return (
    <div className={styles.root}>
      <PostList posts={posts} />
    </div>
  );
}
