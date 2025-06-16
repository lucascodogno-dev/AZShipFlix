import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface EpisodeState {
  favorites: string[];
  watched: string[];
  toggleFavorite: (id: string) => void;
  toggleWatched: (id: string) => void;
}

export const useEpisodeStore = create<EpisodeState>()(
  persist(
    (set) => ({
      favorites: [],
      watched: [],
      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((f) => f !== id)
            : [...state.favorites, id],
        })),
      toggleWatched: (id) =>
        set((state) => ({
          watched: state.watched.includes(id)
            ? state.watched.filter((w) => w !== id)
            : [...state.watched, id],
        })),
    }),
    {
      name: 'episode-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);