import { getAllPageContent } from '../../lib/notion'; // Notion 데이터 가져오는 함수
import NotionPage from '../../components/NotionPages';
import styles from '../../styles/post.module.css'
interface PostPageProps {
  params: {
    id: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = params; // 동적 경로로부터 id 가져오기
  const recordMap = await getAllPageContent(id); // 페이지 내용 가져오기

  if (!recordMap) {
    return <div>페이지를 불러올 수 없습니다.</div>;
  }

  return <div className={styles.main}><NotionPage recordMap={recordMap} /></div>;
}