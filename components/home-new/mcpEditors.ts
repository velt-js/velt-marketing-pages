export const VELT_MCP_INSTALLER_PACKAGE = "@velt-js/mcp-installer";

export type McpEditorKey = "cursor" | "claude" | "windsurf" | "copilot" | "zed";

export type McpEditorConfig = {
  key: McpEditorKey;
  tabLabel: string;
  terminal: {
    prompt: string;
    cmd: string;
  };
  mcpPrompt: string;
  manualPrompts: {
    install: string;
    wrap: string;
    configure: string;
  };
};

export const MCP_EDITOR_ORDER: McpEditorKey[] = [
  "cursor",
  "claude",
  "windsurf",
  "copilot",
  "zed",
];

export const MCP_EDITORS: Record<McpEditorKey, McpEditorConfig> = {
  cursor: {
    key: "cursor",
    tabLabel: "Cursor",
    terminal: {
      prompt: "cursor ›",
      cmd: `npx -y ${VELT_MCP_INSTALLER_PACKAGE}`,
    },
    mcpPrompt: "install velt",
    manualPrompts: {
      install: "Install @veltdev/react in my React app and verify the package is in package.json.",
      wrap: "Wrap my React app with VeltProvider from @veltdev/react. Use a placeholder apiKey prop.",
      configure: "Mount VeltComments, VeltCommentsSidebar, and VeltNotificationsTool from @veltdev/react in my app.",
    },
  },
  claude: {
    key: "claude",
    tabLabel: "Claude Code",
    terminal: {
      prompt: "$",
      cmd: `claude mcp add velt-installer -- npx -y ${VELT_MCP_INSTALLER_PACKAGE}`,
    },
    mcpPrompt: `Add the Velt MCP server, then say: install velt — claude mcp add velt-installer -- npx -y ${VELT_MCP_INSTALLER_PACKAGE}`,
    manualPrompts: {
      install: "Install @veltdev/react in my React app and verify the package is in package.json.",
      wrap: "Wrap my React app with VeltProvider from @veltdev/react. Use a placeholder apiKey prop.",
      configure: "Mount VeltComments, VeltCommentsSidebar, and VeltNotificationsTool from @veltdev/react in my app.",
    },
  },
  windsurf: {
    key: "windsurf",
    tabLabel: "Windsurf",
    terminal: {
      prompt: "windsurf ›",
      cmd: `npx -y ${VELT_MCP_INSTALLER_PACKAGE}`,
    },
    mcpPrompt: "install velt",
    manualPrompts: {
      install: "Install @veltdev/react in my React app and verify the package is in package.json.",
      wrap: "Wrap my React app with VeltProvider from @veltdev/react. Use a placeholder apiKey prop.",
      configure: "Mount VeltComments, VeltCommentsSidebar, and VeltNotificationsTool from @veltdev/react in my app.",
    },
  },
  copilot: {
    key: "copilot",
    tabLabel: "Copilot",
    terminal: {
      prompt: "$",
      cmd: "gh copilot extension install veltdev/copilot",
    },
    mcpPrompt: "Install the Velt GitHub Copilot extension (veltdev/copilot) and set up @veltdev/react with VeltComments.",
    manualPrompts: {
      install: "Install @veltdev/react in my React app and verify the package is in package.json.",
      wrap: "Wrap my React app with VeltProvider from @veltdev/react. Use a placeholder apiKey prop.",
      configure: "Mount VeltComments, VeltCommentsSidebar, and VeltNotificationsTool from @veltdev/react in my app.",
    },
  },
  zed: {
    key: "zed",
    tabLabel: "Zed",
    terminal: {
      prompt: "zed ›",
      cmd: "assistant: add-server velt-mcp",
    },
    mcpPrompt: "Add the Velt MCP server (velt-mcp) and install @veltdev/react with VeltComments.",
    manualPrompts: {
      install: "Install @veltdev/react in my React app and verify the package is in package.json.",
      wrap: "Wrap my React app with VeltProvider from @veltdev/react. Use a placeholder apiKey prop.",
      configure: "Mount VeltComments, VeltCommentsSidebar, and VeltNotificationsTool from @veltdev/react in my app.",
    },
  },
};

export type ManualStepKey = keyof McpEditorConfig["manualPrompts"];

export type EditorOpenContext = "mcp" | ManualStepKey;

/**
 * Builds a Cursor web deeplink that prefills a prompt in the editor.
 * @param prompt - Prompt text to prefill
 * @returns {string} Cursor web deeplink URL
 */
export const buildCursorOpenUrl = (prompt: string): string => {
  try {
    const url = new URL("https://cursor.com/link/prompt");
    url.searchParams.set("text", prompt);
    return url.toString();
  } catch (error) {
    console.error("buildCursorOpenUrl failed", error);
    return "https://cursor.com/link/prompt";
  }
};

/**
 * Builds a Claude Code deeplink that opens a new session with a prefilled composer.
 * @see https://support.claude.com/en/articles/14729294-open-claude-desktop-with-a-link
 * @param prompt - Prompt text to prefill
 * @returns {string} Claude Code deeplink URL
 */
export const buildClaudeCodeOpenUrl = (prompt: string): string => {
  try {
    const url = new URL("claude://code/new");
    url.searchParams.set("q", prompt);
    return url.toString();
  } catch (error) {
    console.error("buildClaudeCodeOpenUrl failed", error);
    return "claude://code/new";
  }
};

/**
 * Builds a Windsurf Cascade deeplink with a prefilled prompt.
 * @param prompt - Prompt text to prefill
 * @returns {string} Windsurf deeplink URL
 */
export const buildWindsurfOpenUrl = (prompt: string): string => {
  try {
    const url = new URL("windsurf://cascade/newChat");
    url.searchParams.set("prompt", prompt);
    return url.toString();
  } catch (error) {
    console.error("buildWindsurfOpenUrl failed", error);
    return "windsurf://cascade/newChat";
  }
};

/**
 * Builds a Windsurf MCP registry deeplink for one-click MCP install.
 * @returns {string} Windsurf MCP registry deeplink URL
 */
export const buildWindsurfMcpRegistryUrl = (): string => {
  try {
    const url = new URL("windsurf://windsurf-mcp-registry");
    url.searchParams.set("serverName", "velt");
    return url.toString();
  } catch (error) {
    console.error("buildWindsurfMcpRegistryUrl failed", error);
    return "windsurf://windsurf-mcp-registry";
  }
};

/**
 * Builds the VS Code Copilot Chat deeplink used to open Copilot in the editor.
 * @returns {string} VS Code Copilot deeplink URL
 */
export const buildCopilotOpenUrl = (): string => {
  return "vscode://vscode.github.copilot-chat";
};

/**
 * Resolves the best open-in-editor href for a given editor and prompt.
 * @param editorKey - Target editor identifier
 * @param prompt - Prompt or command to pass into the deeplink
 * @param context - Whether this is the MCP path or a manual setup step
 * @returns {string | null} Deeplink href, or null when the editor has no scheme
 */
export const buildEditorOpenUrl = (
  editorKey: McpEditorKey,
  prompt: string,
  context: EditorOpenContext = "mcp",
): string | null => {
  try {
    switch (editorKey) {
      case "cursor":
        return buildCursorOpenUrl(prompt);
      case "claude":
        return buildClaudeCodeOpenUrl(prompt);
      case "windsurf":
        return context === "mcp"
          ? buildWindsurfMcpRegistryUrl()
          : buildWindsurfOpenUrl(prompt);
      case "copilot":
        return buildCopilotOpenUrl();
      case "zed":
        return null;
      default:
        return null;
    }
  } catch (error) {
    console.error("buildEditorOpenUrl failed", error);
    return null;
  }
};

/**
 * Formats the terminal line shown in the MCP demo for an editor.
 * @param editorKey - Target editor identifier
 * @returns {string} Full terminal line text
 */
export const formatTerminalLine = (editorKey: McpEditorKey): string => {
  try {
    const editor = MCP_EDITORS[editorKey];
    return `${editor.terminal.prompt} ${editor.terminal.cmd}`.trim();
  } catch (error) {
    console.error("formatTerminalLine failed", error);
    return "";
  }
};
