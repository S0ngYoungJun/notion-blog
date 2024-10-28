import { create } from 'zustand';

interface TagState {
  selectedTag: string | null;
  searchTerm: string; 
  setSelectedTag: (tag: string | null) => void;
  setSearchTerm: (term: string) => void; 
}

export const useTagStore = create<TagState>((set) => ({
  selectedTag: null,
  searchTerm: '',
  setSelectedTag: (tag) => set({ selectedTag: tag }),
  setSearchTerm: (term) => set({ searchTerm: term }), 
}));