"use client";

import { useEffect, useState } from 'react';
import { getAllPageContent } from '../lib/notion';
import { NotionRenderer } from 'react-notion-x';
import 'react-notion-x/src/styles.css'; // 필요한 스타일 임포트

interface PostPageProps {
  params: { postId: string };
}

export default function PostPage({ params }: PostPageProps) {
  const [postDetails, setPostDetails] = useState<any>(null); // 데이터를 저장할 상태 생성
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  useEffect(() => {
    async function fetchData() {
      const data = await getAllPageContent(params.postId); // 비동기로 데이터 가져오기
      setPostDetails(data); // 상태에 데이터 저장
      setLoading(false); // 로딩 완료
    }

    fetchData(); // 데이터 가져오기 함수 호출
  }, [params.postId]); // postId가 변경될 때마다 데이터 다시 가져오기

  if (loading) {
    return <p>Loading...</p>; // 로딩 중일 때 보여줄 내용
  }

  if (!postDetails || postDetails.length === 0) {
    return <p>No content found.</p>; // 데이터가 없을 때 보여줄 내용
  }

  // react-notion-x를 사용하여 페이지 렌더링
  return (
    <div>
      <h1>Post Content</h1>
      <NotionRenderer recordMap={postDetails} fullPage={true} darkMode={false} />
    </div>
  );
}