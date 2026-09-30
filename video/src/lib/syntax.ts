/**
 * Just enough highlighting for short, hand-written trailer snippets in
 * Python, JavaScript, CSS and HTML — not general tokenizers.
 */
export type TokenKind =
  | "keyword"
  | "builtin"
  | "function"
  | "string"
  | "interpolation"
  | "number"
  | "comment"
  | "punct"
  | "plain";

export type Token = { kind: TokenKind; text: string };

export type Language = "python" | "js" | "css" | "html";

const PY_KEYWORDS = new Set([
  "and", "as", "break", "class", "continue", "def", "elif", "else", "except",
  "False", "finally", "for", "from", "if", "import", "in", "is", "lambda",
  "None", "not", "or", "pass", "return", "True", "try", "while", "with",
]);

const PY_BUILTINS = new Set([
  "dict", "float", "input", "int", "len", "list", "open", "print", "range",
  "str", "sum",
]);

const JS_KEYWORDS = new Set([
  "const", "let", "var", "function", "return", "if", "else", "for", "while",
  "new", "true", "false", "null", "undefined", "class", "import", "export",
]);

const JS_BUILTINS = new Set(["document", "window", "console"]);

const CODE_TOKEN =
  /(#.*$|\/\/.*$)|([rfbu]?"(?:[^"\\]|\\.)*"|[rfbu]?'(?:[^'\\]|\\.)*'|`[^`]*`)|(\b\d+(?:\.\d+)?\b)|([\p{L}_$][\p{L}\p{N}_$]*)|(\s+)|(.)/gu;

/** Splits an f-string so the `{...}` holes read as code, not text. */
function splitFString(text: string): Token[] {
  return text
    .split(/(\{[^}]*\})/)
    .filter(Boolean)
    .map((part) => ({
      kind: part.startsWith("{") ? "interpolation" : "string",
      text: part,
    }));
}

/** Python and JavaScript share a shape: words, strings, numbers, comments. */
function tokenizeCode(line: string, lang: "python" | "js"): Token[] {
  const keywords = lang === "python" ? PY_KEYWORDS : JS_KEYWORDS;
  const builtins = lang === "python" ? PY_BUILTINS : JS_BUILTINS;
  const tokens: Token[] = [];

  for (const match of line.matchAll(CODE_TOKEN)) {
    const [text, comment, string, number, word] = match;
    // `#` is a comment only in Python; in JS it's punctuation (rare here).
    if (comment && (lang === "python" || comment.startsWith("//"))) {
      tokens.push({ kind: "comment", text });
    } else if (string) {
      if (lang === "python" && /^f/i.test(string)) tokens.push(...splitFString(string));
      else tokens.push({ kind: "string", text });
    } else if (number) tokens.push({ kind: "number", text });
    else if (word) {
      const next = line[(match.index ?? 0) + text.length];
      tokens.push({
        kind: keywords.has(word)
          ? "keyword"
          : builtins.has(word)
            ? "builtin"
            : next === "("
              ? "function"
              : "plain",
        text,
      });
    } else if (/^\s+$/.test(text)) tokens.push({ kind: "plain", text });
    else tokens.push({ kind: "punct", text });
  }
  return tokens;
}

/** `selector { property: value; }` on one line, or any part of it. */
function tokenizeCss(line: string): Token[] {
  const tokens: Token[] = [];
  const open = line.indexOf("{");
  const selector = open === -1 ? "" : line.slice(0, open);
  const body = open === -1 ? line : line.slice(open);

  if (selector) tokens.push({ kind: "keyword", text: selector });
  for (const match of body.matchAll(/([\w-]+)(\s*:\s*)([^;}]+)|([{};:])|(\s+)|(.)/g)) {
    const [text, prop, colon, value, punct] = match;
    if (prop) {
      tokens.push({ kind: "plain", text: prop });
      tokens.push({ kind: "punct", text: colon });
      tokens.push({ kind: "string", text: value });
    } else if (punct) tokens.push({ kind: "punct", text });
    else tokens.push({ kind: "plain", text });
  }
  return tokens;
}

/** Tags in brand, attribute values as strings, text content plain. */
function tokenizeHtml(line: string): Token[] {
  const tokens: Token[] = [];
  for (const match of line.matchAll(/(<\/?[\w-]+)|(\s[\w-]+=)("[^"]*")|(\/?>)|([^<>]+)/g)) {
    const [text, tag, attr, value, close] = match;
    if (tag) tokens.push({ kind: "keyword", text });
    else if (attr) {
      tokens.push({ kind: "builtin", text: attr });
      tokens.push({ kind: "string", text: value });
    } else if (close) tokens.push({ kind: "keyword", text });
    else tokens.push({ kind: "plain", text });
  }
  return tokens;
}

export function tokenizeLine(line: string, lang: Language = "python"): Token[] {
  if (lang === "css") return tokenizeCss(line);
  if (lang === "html") return tokenizeHtml(line);
  return tokenizeCode(line, lang);
}
