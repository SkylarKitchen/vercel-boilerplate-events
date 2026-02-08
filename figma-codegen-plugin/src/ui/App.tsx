import { useState, useEffect, useCallback } from "react";
import type { GeneratedCode } from "../shared/types";
import type { PluginToUIMessage, UIToPluginMessage } from "../shared/messages";
import { CodePreview } from "./CodePreview";
import { ContextPreview } from "./ContextPreview";
import { AnimationPanel } from "./AnimationPanel";

type OutputTab = "context" | "jsx";

export const App = () => {
  const [code, setCode] = useState<GeneratedCode | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<OutputTab>("context");

  const sendToPlugin = useCallback((msg: UIToPluginMessage) => {
    parent.postMessage({ pluginMessage: msg }, "*");
  }, []);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      const msg = event.data.pluginMessage as PluginToUIMessage | undefined;
      if (!msg) return;

      switch (msg.type) {
        case "code-result":
          setCode(msg.payload);
          setLoading(false);
          setError(null);
          break;
        case "selection-empty":
          setCode(null);
          setLoading(false);
          setError(null);
          break;
        case "error":
          setCode(null);
          setLoading(false);
          setError(msg.message);
          break;
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const handleToggleAnimation = (
    nodeId: string,
    animationType: string,
    enabled: boolean
  ) => {
    if (code) {
      setCode({
        ...code,
        animations: code.animations.map((a) =>
          a.nodeId === nodeId && a.type === animationType
            ? { ...a, enabled }
            : a
        ),
      });
    }
    sendToPlugin({ type: "toggle-animation", nodeId, animationType, enabled });
  };

  if (loading) {
    return (
      <div className="app">
        <header className="plugin-header">
          <h1>Code with Claude Codegen</h1>
        </header>
        <div className="empty-state">
          <div className="spinner" />
          <p>Waiting for selection...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <header className="plugin-header">
          <h1>Code with Claude Codegen</h1>
        </header>
        <div className="error-state">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D97757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!code) {
    return (
      <div className="app">
        <header className="plugin-header">
          <h1>Code with Claude Codegen</h1>
        </header>
        <div className="empty-state">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#A8A598" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 14l2 2 4-4" />
          </svg>
          <p>Select a frame or component to generate code</p>
          <span className="empty-hint">Works best with auto-layout frames using Anthropic design tokens</span>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="plugin-header">
        <h1>Code with Claude Codegen</h1>
        <div className="badge-row">
          {code.componentBadges.map((b) => (
            <span key={b.name} className="component-badge">
              {b.name}
              {b.count > 1 && <span className="badge-count">{b.count}</span>}
            </span>
          ))}
        </div>
      </header>

      {code.warnings.length > 0 && (
        <div className="warnings">
          {code.warnings.map((w, i) => (
            <p key={i} className="warning">{w}</p>
          ))}
        </div>
      )}

      {/* Tab bar */}
      <div className="tab-bar">
        <button
          className={`tab-button ${activeTab === "context" ? "tab-button--active" : ""}`}
          onClick={() => setActiveTab("context")}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
          Claude Code
        </button>
        <button
          className={`tab-button ${activeTab === "jsx" ? "tab-button--active" : ""}`}
          onClick={() => setActiveTab("jsx")}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          JSX
        </button>
      </div>

      {activeTab === "context" ? (
        <ContextPreview context={code.claudeContext} />
      ) : (
        <CodePreview imports={code.imports} jsx={code.jsx} />
      )}

      {code.animations.length > 0 && (
        <AnimationPanel
          animations={code.animations}
          onToggle={handleToggleAnimation}
        />
      )}
    </div>
  );
};
