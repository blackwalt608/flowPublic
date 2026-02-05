import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const ShowPartArray = [
  "idle",
  "focused",
  "stage",
  "truss",
  "lineSpeaker",
  "lights",
  "fogMachine",
  "subwoofer",
  "mainScreen",
  "police",
  "delayTower",
  "frontFillSpeaker",
  "stageMonitor",
  "enstrumants",
  "sideScreen",
] as const;

export type ShowParts = (typeof ShowPartArray)[number];

interface State {
  cameraPos: ShowParts;
  canvasPos: 1 | 2 | 3;
  cameraAniAvailability: boolean;
}
interface Actions {
  setCameraPos: (pos: ShowParts) => void;
  setCanvasPos: (value: 1 | 2 | 3) => void;
  setCameraAniAvailability: (value: boolean) => void;
}

export const useFlowStore = create<State & Actions>()(
  subscribeWithSelector((set) => ({
    cameraPos: "idle",
    setCameraPos: (value) => set({ cameraPos: value }),

    canvasPos: 1,
    setCanvasPos: (value) => set({ canvasPos: value }),

    cameraAniAvailability: false,
    setCameraAniAvailability: (value) => set({ cameraAniAvailability: value }),
  })),
);
