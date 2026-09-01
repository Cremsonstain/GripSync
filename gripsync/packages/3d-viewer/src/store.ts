import { proxy } from 'valtio';
import type { KeyboardLayout, PadSurface, ViewerSelection } from './types';

const initial: ViewerSelection = {
  mouseModel: 'reference-mouse',
  keyboardLayout: '65%',
  mousepadSurface: 'control',
  monitorAspectRatio: 16 / 9,
  monitorRefreshRate: 240,
};

export const setupViewerState = proxy<ViewerSelection>({ ...initial });

export function setKeyboardLayout(layout: KeyboardLayout) {
  setupViewerState.keyboardLayout = layout;
}

export function setMousepadSurface(surface: PadSurface) {
  setupViewerState.mousepadSurface = surface;
}

export function setMonitor(aspectRatio: number, refreshRate: number) {
  setupViewerState.monitorAspectRatio = Math.max(1, Math.min(4, aspectRatio));
  setupViewerState.monitorRefreshRate = Math.max(30, Math.min(1000, refreshRate));
}

export function setMouseModel(model: string) {
  setupViewerState.mouseModel = model;
}

export function useSetupViewerStore() {
  return setupViewerState;
}
