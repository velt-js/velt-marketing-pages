import type { ReactNode } from "react";

// Lightweight, dependency-free syntax highlighter for the feature-page editor
// cards. Tokens map to the .vfp .tk-* syntax classes (see styles.css). This
// is intentionally heuristic (not a full parser) — the code samples are short
// TS/JSX or shell snippets, so a single tokenizing pass is enough.

/** Supported highlight languages. */
export type CodeLang = "tsx" | "bash";

const KEYWORDS = new Set([
  "import",
  "from",
  "export",
  "default",
  "const",
  "let",
  "var",
  "function",
  "return",
  "if",
  "else",
  "for",
  "while",
  "new",
  "await",
  "async",
  "class",
  "extends",
  "type",
  "interface",
  "of",
  "in",
  "as",
  "true",
  "false",
  "null",
  "undefined",
  "void",
]);

const PKG_MANAGERS = /^(npm|npx|yarn|pnpm|bun)$/;

const TS_TOKEN_RE =
  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(<\/?[A-Za-z][\w.-]*|\/>|>)|([A-Za-z_$][\w$]*)|(\d+(?:\.\d+)?)/g;

/**
 * Tokenize a TS/JSX snippet into highlighted React spans.
 * @param {string} code Source code string.
 * @returns {ReactNode[]} Highlighted nodes.
 */
function highlightTsx(code: string): ReactNode[] {
  try {
    const nodes: ReactNode[] = [];
    let lastIndex = 0;
    let key = 0;
    let match: RegExpExecArray | null;
    TS_TOKEN_RE.lastIndex = 0;

    while ((match = TS_TOKEN_RE.exec(code)) !== null) {
      const full = match[0];
      const [, comment, str, tag, ident, num] = match;

      if (match.index > lastIndex) {
        nodes.push(code.slice(lastIndex, match.index));
      }

      if (comment) {
        nodes.push(
          <span key={key++} className="tk-cm">
            {comment}
          </span>
        );
      } else if (str) {
        nodes.push(
          <span key={key++} className="tk-str">
            {str}
          </span>
        );
      } else if (tag) {
        nodes.push(
          <span key={key++} className="tk-tag">
            {tag}
          </span>
        );
      } else if (ident) {
        if (KEYWORDS.has(ident)) {
          nodes.push(
            <span key={key++} className="tk-kw">
              {ident}
            </span>
          );
        } else {
          const rest = code.slice(match.index + full.length);
          const isAttr = /^\s*=(?!=)/.test(rest);
          const isComponent = /^[A-Z]/.test(ident);
          if (isAttr) {
            nodes.push(
              <span key={key++} className="tk-attr">
                {ident}
              </span>
            );
          } else if (isComponent) {
            nodes.push(
              <span key={key++} className="tk-tag">
                {ident}
              </span>
            );
          } else {
            nodes.push(ident);
          }
        }
      } else if (num) {
        nodes.push(
          <span key={key++} className="tk-num">
            {num}
          </span>
        );
      }

      lastIndex = match.index + full.length;
    }

    if (lastIndex < code.length) {
      nodes.push(code.slice(lastIndex));
    }

    return nodes;
  } catch (error) {
    console.error("highlightTsx failed", error);
    return [code];
  }
}

/**
 * Tokenize a shell command: package managers as keywords, scoped packages as
 * strings, and flags as attributes.
 * @param {string} code Shell command string.
 * @returns {ReactNode[]} Highlighted nodes.
 */
function highlightBash(code: string): ReactNode[] {
  try {
    const nodes: ReactNode[] = [];
    const parts = code.split(/(\s+)/);
    parts.forEach((part, index) => {
      if (part.trim() === "") {
        nodes.push(part);
        return;
      }
      if (part.startsWith("#")) {
        nodes.push(
          <span key={index} className="tk-cm">
            {part}
          </span>
        );
      } else if (PKG_MANAGERS.test(part)) {
        nodes.push(
          <span key={index} className="tk-kw">
            {part}
          </span>
        );
      } else if (part.startsWith("@") || part.startsWith("-")) {
        nodes.push(
          <span key={index} className={part.startsWith("-") ? "tk-attr" : "tk-str"}>
            {part}
          </span>
        );
      } else {
        nodes.push(part);
      }
    });
    return nodes;
  } catch (error) {
    console.error("highlightBash failed", error);
    return [code];
  }
}

/**
 * Highlight code into React nodes for rendering inside a <pre>. Strings are
 * tokenized; any pre-built ReactNode (e.g. authored JSX) passes through as-is.
 * @param {ReactNode} code Source code string or pre-rendered node.
 * @param {CodeLang} [lang="tsx"] Language to highlight as.
 * @returns {ReactNode} Highlighted content.
 */
export function highlightCode(code: ReactNode, lang: CodeLang = "tsx"): ReactNode {
  try {
    if (typeof code !== "string") {
      return code;
    }
    if (lang === "bash") {
      return highlightBash(code);
    }
    return highlightTsx(code);
  } catch (error) {
    console.error("highlightCode failed", error);
    return code;
  }
}

/**
 * Pick a highlight language from an editor filename/tab label.
 * @param {string} filename Editor tab/filename, e.g. "App.tsx" or "terminal".
 * @returns {CodeLang} The detected language.
 */
export function langForFilename(filename: string): CodeLang {
  try {
    const lower = filename.toLowerCase();
    if (lower.includes("terminal") || lower.endsWith(".sh") || lower.includes("bash")) {
      return "bash";
    }
    return "tsx";
  } catch (error) {
    console.error("langForFilename failed", error);
    return "tsx";
  }
}
