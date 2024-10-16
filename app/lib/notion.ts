import { Client } from '@notionhq/client';
import { NotionPost } from '../types/notionTypes';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function getPosts(): Promise<NotionPost[]> {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
  });
  
  return response.results.map((page: any) => ({
    id: page.id,
    title: page.properties?.title?.title?.[0]?.plain_text || 'No title',
    post: page.properties?.post?.rich_text?.[0]?.plain_text || 'No content',
    created_time: page.created_time|| 'No date',
    tags: page.properties?.태그?.multi_select.map((tag: any) => ({
      id: tag.id,
      name: tag.name,
    })) || [],
  }));
}

export async function getPostDetails(postId: string) {
  const response = await notion.blocks.children.list({
    block_id: postId,
  });
  console.log(response); // 응답을 확인

  return response.results.map((block: any) => {
    switch (block.type) {
      case 'paragraph':
        return block.paragraph.rich_text[0]?.plain_text || '';
      case 'heading_1':
        return `# ${block.heading_1.rich_text[0]?.plain_text || ''}`;
      case 'heading_2':
        return `## ${block.heading_2.rich_text[0]?.plain_text || ''}`;
      case 'heading_3':
        return `### ${block.heading_3.rich_text[0]?.plain_text || ''}`;
      case 'bulleted_list_item':
        return `• ${block.bulleted_list_item.rich_text[0]?.plain_text || ''}`;
      case 'numbered_list_item':
        return `1. ${block.numbered_list_item.rich_text[0]?.plain_text || ''}`;
      // 필요에 따라 더 많은 블록 타입 처리 추가
      default:
        return '';
    }
  });
}