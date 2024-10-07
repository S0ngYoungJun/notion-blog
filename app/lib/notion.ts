import { Client } from '@notionhq/client';
import { NotionPost } from '../types/notionTypes';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function getPosts(): Promise<NotionPost[]> {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
  });
  console.log(response.results)
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

  return response.results.map((block: any) => {
    // 여기서는 paragraph 블록만 처리합니다.
    if (block.type === 'paragraph') {
      return block.paragraph.rich_text[0]?.plain_text || '';
    }
    // 다른 블록 타입을 추가로 처리할 수 있습니다.
    return '';
  });
}

// import axios from "axios";

// // Notion API에서 반환되는 데이터를 정의 (간략한 예시)
// interface NotionPost {
//   id: string;
//   properties: {
//     Name: {
//       title: Array<{ plain_text: string }>;
//     };
//   };
// }

// // Notion API 응답 타입 정의
// interface NotionApiResponse {
//   results: NotionPost[];
// }

// export default class NotionApi {
//   static async getItem(): Promise<NotionApiResponse> {
//     const notionKey: string | undefined = process.env.REACT_APP_NOTION_KEY;
//     const notionDatabaseKey: string | undefined = process.env.REACT_APP_NOTION_DATABASE_KEY;

//     // 환경 변수 유효성 체크
//     if (!notionKey || !notionDatabaseKey) {
//       throw new Error("Notion API Key or Database ID is missing");
//     }

//     try {
//       const result = await axios.post<NotionApiResponse>(
//         `https://api.notion.com/v1/databases/${notionDatabaseKey}/query`,
//         {
//           page_size: 100,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${notionKey}`,
//             "Notion-Version": "2021-08-16",
//           },
//         }
//       );
//       return result.data; // 타입에 맞게 result.data만 반환
//     } catch (error: any) {
//       console.error("Error fetching data from Notion:", error.response?.data || error.message);
//       throw new Error("Failed to fetch data from Notion");
//     }
//   }
// }