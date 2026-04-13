/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { create } from 'zustand';

export type Section = 'hero' | 'sensor' | 'insertion' | 'sample' | 'analysis' | 'mobile' | 'results' | 'applications' | 'competitors' | 'why-us' | 'target-market' | 'future' | 'vision';

interface GameStore {
  activeSection: Section;
  scrollProgress: number; // 0 to 1 for the current section
  totalScrollProgress: number; // 0 to 1 for the entire page
  demoStep: 'idle' | 'inserting' | 'dropping' | 'analyzing' | 'synced';
  
  setActiveSection: (section: Section) => void;
  setScrollProgress: (progress: number) => void;
  setTotalScrollProgress: (progress: number) => void;
  setDemoStep: (step: 'idle' | 'inserting' | 'dropping' | 'analyzing' | 'synced') => void;
}

export const useGameStore = create<GameStore>((set) => ({
  activeSection: 'hero',
  scrollProgress: 0,
  totalScrollProgress: 0,
  demoStep: 'idle',

  setActiveSection: (activeSection) => set({ activeSection }),
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),
  setTotalScrollProgress: (totalScrollProgress) => set({ totalScrollProgress }),
  setDemoStep: (demoStep) => set({ demoStep }),
}));

