import { useState } from "react";
import type { AnimationSuggestion, AnimationType } from "../shared/types";

const badgeColorMap: Record<string, string> = {
  "hero-heading": "badge--clay",
  hero: "badge--clay",
  heading: "badge--olive",
  "heading-body": "badge--olive",
  scroll: "badge--olive",
  stagger: "badge--sky",
  "stagger-fast": "badge--sky",
  countup: "badge--sky",
};

type AnimationPanelProps = {
  animations: AnimationSuggestion[];
  onToggle: (nodeId: string, animationType: string, enabled: boolean) => void;
};

export const AnimationPanel = ({
  animations,
  onToggle,
}: AnimationPanelProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <section className="animation-panel">
      <button
        className="animation-header"
        onClick={() => setCollapsed(!collapsed)}
        aria-expanded={!collapsed}
      >
        <span className="animation-title">
          Suggested animations
          <span className="animation-count">{animations.length}</span>
        </span>
        <svg
          className={`chevron ${collapsed ? "chevron--collapsed" : ""}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {!collapsed && (
        <ul className="animation-list">
          {animations.map((anim) => {
            const id = `anim-${anim.nodeId}-${anim.type}`;
            return (
              <li key={id} className="animation-item">
                <label className="animation-label" htmlFor={id}>
                  <input
                    id={id}
                    type="checkbox"
                    className="animation-checkbox"
                    checked={anim.enabled}
                    onChange={(e) =>
                      onToggle(anim.nodeId, anim.type, e.target.checked)
                    }
                  />
                  <span className="animation-info">
                    <span className="animation-row">
                      <span
                        className={`animation-badge ${badgeColorMap[anim.type] ?? "badge--olive"}`}
                      >
                        {anim.type}
                      </span>
                      <code className="animation-attr">{anim.attribute}</code>
                    </span>
                    <span className="animation-desc">{anim.description}</span>
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};
