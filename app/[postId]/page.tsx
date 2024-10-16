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
        {postDetails.map((detail, index) => (
          <p key={index}>{detail}</p>
        ))}
      </div>
    </div>
  );
}
