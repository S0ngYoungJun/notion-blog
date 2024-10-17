import { getPostDetails } from '../lib/notion';
import { notFound } from 'next/navigation';

interface PostPageProps {
  params: { postId: string };
}

export default async function PostPage({ params }: PostPageProps) {
  const postDetails = await getPostDetails(params.postId);

  if (!postDetails) {
    return notFound();
  }

  return (
    <div>
      <h1>Post Details</h1>
      <div>
        {postDetails.map((detail, index) => {
          if (typeof detail === 'string') {
            return <p key={index}>{detail}</p>;
          } else if (detail.type === 'heading_1') {
            return <h1 key={index}>{detail.content}</h1>;
          } else if (detail.type === 'heading_2') {
            return <h2 key={index}>{detail.content}</h2>;
          } else if (detail.type === 'heading_3') {
            return <h3 key={index}>{detail.content}</h3>;
          } else if (detail.type === 'bulleted_list_item') {
            return <li key={index}>{detail.content}</li>;
          } else if (detail.type === 'numbered_list_item') {
            return <li key={index}>{detail.content}</li>;
          }
          // 다른 블록 타입에 대해서도 처리가 가능
          return <p key={index}>{detail.content || ''}</p>;
        })}
      </div>
    </div>
  );
}
