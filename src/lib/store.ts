"use client";

import { create } from "zustand";
import { chapters, type ChapterId } from "./script";

/**
 * Un solo store que leen el canvas 3D y el HTML.
 * `progress` es el progreso dentro de cada capítulo (0–1), escrito por los ScrollTrigger de cada sección.
 * `global` es el progreso de toda la página (0–1), para el anillo del logo.
 * `pinned` dice qué pantallas de capítulo están pegadas: la pizarra solo se enseña si hay alguna.
 */
interface ScrollState {
  global: number;
  progress: Record<ChapterId, number>;
  active: ChapterId;
  /** qué pantallas de capítulo están pegadas ahora mismo (ninguna en los textos largos y los planes) */
  pinned: Partial<Record<ChapterId, boolean>>;
  reducedMotion: boolean;
  isMobile: boolean;
  setGlobal: (v: number) => void;
  setProgress: (id: ChapterId, v: number) => void;
  setActive: (id: ChapterId) => void;
  setPinned: (id: ChapterId, on: boolean) => void;
  setEnv: (p: { reducedMotion?: boolean; isMobile?: boolean }) => void;
}

const zero = Object.fromEntries(chapters.map((c) => [c.id, 0])) as Record<ChapterId, number>;

export const useScroll = create<ScrollState>((set) => ({
  global: 0,
  progress: zero,
  active: "prologo",
  pinned: { prologo: true },
  reducedMotion: false,
  isMobile: false,
  setGlobal: (v) => set({ global: v }),
  setProgress: (id, v) =>
    set((s) => (s.progress[id] === v ? s : { progress: { ...s.progress, [id]: v } })),
  setActive: (id) => set((s) => (s.active === id ? s : { active: id })),
  setPinned: (id, on) => set((s) => (!!s.pinned[id] === on ? s : { pinned: { ...s.pinned, [id]: on } })),
  setEnv: (p) => set(p),
}));

/** Lectura sin suscripción (para useFrame en el canvas). */
export const readScroll = () => useScroll.getState();
