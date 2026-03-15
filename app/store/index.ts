import { create } from "zustand";

interface PortfolioStore {
  currentScene: number;
  isLoaded: boolean;
  hoveredProject: string | null;
  setCurrentScene: (scene: number) => void;
  setIsLoaded: (loaded: boolean) => void;
  setHoveredProject: (project: string | null) => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  currentScene: 0,
  isLoaded: false,
  hoveredProject: null,
  setCurrentScene: (scene) => set({ currentScene: scene }),
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),
  setHoveredProject: (project) => set({ hoveredProject: project }),
}));
