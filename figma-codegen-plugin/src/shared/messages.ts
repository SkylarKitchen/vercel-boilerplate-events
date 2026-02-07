import type { GeneratedCode, AnimationSuggestion } from "./types.ts";

// Main thread → UI thread
export type PluginToUIMessage =
  | {
      type: "code-result";
      payload: GeneratedCode;
    }
  | {
      type: "selection-empty";
    }
  | {
      type: "error";
      message: string;
    };

// UI thread → Main thread
export type UIToPluginMessage =
  | {
      type: "toggle-animation";
      nodeId: string;
      animationType: string;
      enabled: boolean;
    }
  | {
      type: "regenerate";
      animations: AnimationSuggestion[];
    };
