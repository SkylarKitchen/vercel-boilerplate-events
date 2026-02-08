import { CopyButton } from "./CopyButton";

type ContextPreviewProps = {
  context: string;
};

export const ContextPreview = ({ context }: ContextPreviewProps) => {
  return (
    <section className="context-preview">
      <div className="code-toolbar">
        <span className="code-label">Design context</span>
        <CopyButton text={context} label="Copy for Claude" />
      </div>
      <div className="context-hint">
        Paste into Claude Code to generate production JSX with full codebase context.
      </div>
      <pre className="context-block">{context}</pre>
    </section>
  );
};
