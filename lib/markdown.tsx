import { Fragment, type ReactNode } from "react";

// A tiny, purpose-built renderer for the small markdown subset used in lib/curriculum.ts
// lesson content (paragraphs, **bold**, `inline code`, - lists, and ```fenced code```).
// Not a general-purpose markdown parser — swap for a real one if lesson content grows.

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
  return parts.map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={key} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={key} className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[0.85em] text-cyan">
          {part.slice(1, -1)}
        </code>
      );
    }
    return <Fragment key={key}>{part}</Fragment>;
  });
}

export function LessonMarkdown({ content }: { content: string }) {
  const lines = content.trim().split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let listBuffer: string[] = [];

  const flushList = () => {
    if (listBuffer.length === 0) return;
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="my-4 flex flex-col gap-2">
        {listBuffer.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-foreground/85">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>{renderInline(item, `li-${blocks.length}-${idx}`)}</span>
          </li>
        ))}
      </ul>,
    );
    listBuffer = [];
  };

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim().startsWith("```")) {
      const lang = line.trim().slice(3);
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing fence
      flushList();
      blocks.push(
        <pre
          key={`code-${blocks.length}`}
          className="my-4 overflow-x-auto rounded-lg border border-border bg-secondary/50 p-4 font-mono text-[0.8rem] leading-relaxed text-foreground/90"
        >
          <code>{codeLines.join("\n")}</code>
        </pre>,
      );
      if (lang) void lang; // reserved for future syntax highlighting
      continue;
    }

    if (line.trim().startsWith("- ")) {
      listBuffer.push(line.trim().slice(2));
      i++;
      continue;
    }

    flushList();

    if (line.trim() === "") {
      i++;
      continue;
    }

    blocks.push(
      <p key={`p-${blocks.length}`} className="my-4 text-sm leading-relaxed text-foreground/85">
        {renderInline(line, `p-${blocks.length}`)}
      </p>,
    );
    i++;
  }
  flushList();

  return <div>{blocks}</div>;
}
