"use client";

import { create } from "zustand";
import { chapters, type ChapterId } from "./script";

/**
 * Un solo store que leen el canvas 3D y el HTML.
 * `progress` es el progreso dentro de cada capítulo (0–1), escrito por los ScrollTrigger de cada sección.
 * `global` es el progreso de toda la página (0–1), para el anillo del logo.
 */
interface ScrollState {
  global: number;
  progress: Record<ChapterId, number>;
  active: ChapterId;
  reducedMotion: boolean;
  isMobile: boolean;
  setGlobal: (v: number) => void;
  setProgress: (id: ChapterId, v: number) => void;
  setActive: (id: ChapterId) => void;
  setEnv: (p: { reducedMotion?: boolean; isMobile?: boolean }) => void;
}

const zero = Object.fromEntries(chapters.map((c) => [c.id, 0])) as Record<ChapterId, number>;

export const useScroll = create<ScrollState>((set) => ({
  global: 0,
  progress: zero,
  active: "prologo",
  reducedMotion: false,
  isMobile: false,
  setGlobal: (v) => set({ global: v }),
  setProgress: (id, v) =>
    set((s) => (s.progress[id] === v ? s : { progress: { ...s.progress, [id]: v } })),
  setActive: (id) => set((s) => (s.active === id ? s : { active: id })),
  setEnv: (p) => set(p),
}));

/** Lectura sin suscripción (para useFrame en el canvas). */
export const readScroll = () => useScroll.getState();
