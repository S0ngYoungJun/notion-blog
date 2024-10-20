export interface NotionPost {
  id: string;
  title: string;
  created_time: string;
  tags: { id: string; name: string }[]; // 태그 배열 추가
}