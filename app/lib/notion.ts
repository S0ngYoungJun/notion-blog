import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';
import { NotionPost } from '../types/notionTypes';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const notionAPI = new NotionAPI(); 

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


export async function getAllPageContent(pageId: string) {
  try {
    // react-notion-x에서 사용하는 형태로 Notion 페이지 데이터를 가져옴
    const recordMap = await notionAPI.getPage(pageId);
    return recordMap;
  } catch (error) {
    console.error('Error fetching Notion page content:', error);
    return null;
  }
}

// export async function getAllPageContent(pageId: string) {
//   const allBlocks: any[] = [];

//   async function fetchBlocks(blockId: string) {
//     const response = await notion.blocks.children.list({
//       block_id: blockId,
//     });

//     for (const block of response.results) {
//       allBlocks.push(block);

//       if (block.has_children) {
//         await fetchBlocks(block.id);
//       }
//     }
//   }

//   await fetchBlocks(pageId);
//   return allBlocks;
// }

// export async function getPostDetails(postId: string) {
//   if (postId === 'favicon.ico') {
//     return null; // 에러 없이 무시
//   }

//   // 전체 블록을 가져오는 함수
//   const fetchBlocks = async (blockId: string, startCursor: string | null = null) => {
//     const response = await notion.blocks.children.list({
//       block_id: blockId,
//       start_cursor: startCursor || undefined,
//     });

//     // 만약 next_cursor가 있으면, 계속해서 데이터를 불러옴
//     if (response.has_more) {
//       const nextResults = await fetchBlocks(blockId, response.next_cursor);
//       return [...response.results, ...nextResults];
//     }
//     return response.results;
//   };

//   // 전체 블록 가져오기
//   const blocks = await fetchBlocks(postId);

//   // 각 블록을 처리
//   return blocks.map((block: any) => {
//     switch (block.type) {
//       case 'paragraph':
//         return block.paragraph.rich_text[0]?.plain_text || '';
//       case 'heading_1':
//         return `# ${block.heading_1.rich_text[0]?.plain_text || ''}`;
//       case 'heading_2':
//         return `## ${block.heading_2.rich_text[0]?.plain_text || ''}`;
//       case 'heading_3':
//         return `### ${block.heading_3.rich_text[0]?.plain_text || ''}`;
//       case 'bulleted_list_item':
//         return `• ${block.bulleted_list_item.rich_text[0]?.plain_text || ''}`;
//       case 'numbered_list_item':
//         return `1. ${block.numbered_list_item.rich_text[0]?.plain_text || ''}`;
//       // 추가적인 블록 타입 처리
//       default:
//         return '';
//     }
//   });
// }