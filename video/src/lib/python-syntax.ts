/**
 * Just enough Python highlighting for short, hand-written trailer snippets —
 * not a general tokenizer.
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

const KEYWORDS = new Set([
  "and", "as", "break", "class", "continue", "def", "elif", "else", "except",
  "False", "finally", "for", "from", "if", "import", "in", "is", "lambda",
  "None", "not", "or", "pass", "return", "True", "try", "while", "with",
]);

const BUILTINS = new Set([
  "dict", "float", "input", "int", "len", "list", "open", "print", "range",
  "str", "sum",
]);

const TOKEN =
  /(#.*$)|([rfbu]?"(?:[^"\\]|\\.)*"|[rfbu]?'(?:[^'\\]|\\.)*')|(\b\d+(?:\.\d+)?\b)|([\p{L}_][\p{L}\p{N}_]*)|(\s+)|(.)/gu;

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

export function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  for (const match of line.matchAll(TOKEN)) {
    const [text, comment, string, number, word] = match;
    if (comment) tokens.push({ kind: "comment", text });
    else if (string) {
      if (/^f/i.test(string)) tokens.push(...splitFString(string));
      else tokens.push({ kind: "string", text });
    } else if (number) tokens.push({ kind: "number", text });
    else if (word) {
      const next = line[(match.index ?? 0) + text.length];
      tokens.push({
        kind: KEYWORDS.has(word)
          ? "keyword"
          : BUILTINS.has(word)
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
