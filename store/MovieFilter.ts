import create from 'zustand'
import { genreList } from '../utils/genreSelectionList';


interface GenreState {
    streamingService:string;
    genreList: string[];
    setStreamingService: (service: string) => void;
    setGenreList: (newItem: string) => void;
  }

interface GamePin{
    gamePin: string | null;
    setGamePin: (newPin:string) => void;
}

export const useStoreGamePin = create<GamePin>((set:any, get:any) => ({
    gamePin: null,
    setGamePin: (gamePin: string) => set({gamePin}),
}))

export const useStoreMovieFilters = create<GenreState>((set:any, get:any) => ({
  streamingService: "None",
  genreList: "None",
  setStreamingService: (streamingService) => set({streamingService}),
  setGenreList: (genreList:any) => set({genreList}),
}))