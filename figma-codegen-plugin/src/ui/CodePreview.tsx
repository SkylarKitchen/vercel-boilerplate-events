import { Highlight, type PrismTheme } from "prism-react-renderer";
import { CopyButton } from "./CopyButton";

const anthropicTheme: PrismTheme = {
  plain: {
    color: "#141413",
    backgroundColor: "#FFFFFF",
  },
  styles: [
    {
      types: ["keyword", "tag", "builtin"],
      style: { color: "#D97757" },
    },
    {
      types: ["string", "attr-value"],
      style: { color: "#788C5D" },
    },
    {
      types: ["attr-name"],
      style: { color: "#6A9BCC" },
    },
    {
      types: ["class-name", "maybe-class-name", "function"],
      style: { color: "#C46686" },
    },
    {
      types: ["comment"],
      style: { color: "#A8A598", fontStyle: "italic" },
    },
    {
      types: ["punctuation", "operator"],
      style: { color: "#6E6D65" },
    },
    {
      types: ["number", "boolean"],
      style: { color: "#6A9BCC" },
    },
  ],
};

type CodePreviewProps = {
  imports: string[];
  jsx: string;
};

export const CodePreview = ({ imports, jsx }: CodePreviewProps) => {
  const fullCode = imports.length > 0
    ? imports.join("\n") + "\n\n" + jsx
    : jsx;

  return (
    <section className="code-preview">
      <div className="code-toolbar">
        <span className="code-label">JSX</span>
        <CopyButton text={fullCode} />
      </div>
      <Highlight theme={anthropicTheme} code={fullCode} language="tsx">
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre className="code-block" style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className="line-number">{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </section>
  );
};
