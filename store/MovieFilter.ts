import create from 'zustand'
import { genreList } from '../utils/genreSelectionList';


interface GenreState {
    streamingService:string;
    genreList: string[];
    setStreamingService: (service: string) => void;
    setGenreList: (newItem: string[]) => void;
  }

export const useStoreMovieFilters = create<GenreState>((set:any, get:any) => ({
  streamingService: "None",
  genreList:[],
  setStreamingService: (streamingService) => set({streamingService}),
  setGenreList: (genreList:any) => set({genreList}),
}))