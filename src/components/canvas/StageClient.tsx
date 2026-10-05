"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";
import { useScroll } from "@/lib/store";

const CanvasStage = dynamic(() => import("./Stage").then((module) => module.Stage), { ssr: false });

class OptionalCanvas extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

export function StageClient() {
  const reduced = useScroll((state) => state.reducedMotion);
  if (reduced) return null;
  return <OptionalCanvas><CanvasStage /></OptionalCanvas>;
}
