"use client";

import { useCallback, useEffect, useState } from "react";

type FormattedRun = {
  text?: string;
  imageUrl?: string;
  altText?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  url?: string;
};

type WhitepaperBlock =
  | { type: "paragraph"; style: string; isListItem: boolean; runs: FormattedRun[] }
  | { type: "table"; rows: FormattedRun[][][] };

type WhitepaperResponse = {
  blocks?: WhitepaperBlock[];
  updatedAt?: string;
  error?: string;
};

function RichText({ runs }: { runs: FormattedRun[] }) {
  return (
    <>
      {runs.map((run, index) => {
        if (run.imageUrl) {
          return (
            <img
              key={index}
              src={run.imageUrl}
              alt={run.altText || "Whitepaper image"}
              className="my-3 inline-block h-auto max-w-full align-middle"
            />
          );
        }

        const contentClass = `${run.bold ? "font-bold" : ""} ${run.italic ? "italic" : ""} ${run.underline ? "underline" : ""}`;
        const safeUrl = run.url && /^(https?:|mailto:)/i.test(run.url) ? run.url : undefined;
        const content = <span className={contentClass}>{run.text}</span>;

        return safeUrl ? (
          <a
            key={index}
            href={safeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#790000] underline decoration-[#990000]/40 underline-offset-2 hover:decoration-[#990000]"
          >
            {content}
          </a>
        ) : (
          <span key={index}>{content}</span>
        );
      })}
    </>
  );
}

function ParagraphBlock({ block }: { block: Extract<WhitepaperBlock, { type: "paragraph" }> }) {
  const text = <RichText runs={block.runs} />;
  const style = block.style;

  if (style === "TITLE") {
    return <h2 className="mb-6 text-3xl font-bold leading-tight sm:text-4xl">{text}</h2>;
  }
  if (style === "SUBTITLE") {
    return <p className="mb-6 text-xl text-neutral-600">{text}</p>;
  }
  if (style === "HEADING_1") {
    return <h2 className="mb-4 mt-10 text-2xl font-bold text-[#790000] sm:text-3xl">{text}</h2>;
  }
  if (style === "HEADING_2") {
    return <h3 className="mb-3 mt-8 text-xl font-bold text-[#790000] sm:text-2xl">{text}</h3>;
  }
  if (style === "HEADING_3" || style === "HEADING_4") {
    return <h4 className="mb-2 mt-6 text-lg font-bold text-[#790000]">{text}</h4>;
  }

  if (block.isListItem) {
    return (
      <p className="mb-3 flex gap-3 pl-4 leading-7 text-neutral-800">
        <span aria-hidden="true" className="font-bold text-[#990000]">•</span>
        <span className="min-w-0">{text}</span>
      </p>
    );
  }

  return <p className="mb-5 whitespace-pre-wrap leading-7 text-neutral-800">{text}</p>;
}

export default function QECMLWhitepaperPage() {
  const [blocks, setBlocks] = useState<WhitepaperBlock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  const loadWhitepaper = useCallback(async () => {
    try {
      const response = await fetch("/api/qecml/whitepaper", { cache: "no-store" });
      const data = (await response.json()) as WhitepaperResponse;
      if (!response.ok) throw new Error(data.error || "Unable to load the Whitepaper.");

      setBlocks(data.blocks ?? []);
      setUpdatedAt(data.updatedAt ?? null);
      setError(null);
    } catch (loadError) {
      setError(
        loadError instanceof Error ? loadError.message : "Unable to load the Whitepaper.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadWhitepaper();
    const interval = window.setInterval(() => void loadWhitepaper(), 60_000);
    return () => window.clearInterval(interval);
  }, [loadWhitepaper]);

  return (
    <main className="min-h-screen bg-[#990000] px-5 pb-16 pt-24 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#FFCC00]">
              QECML 2027 · USC
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">Whitepaper</h1>
          </div>
          {updatedAt && (
            <p className="text-xs text-white/60" aria-live="polite">
              Updated {new Date(updatedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
            </p>
          )}
        </div>

        {error ? (
          <div className="rounded-lg border border-white/20 bg-black/10 p-6 text-white/85" role="status">
            {error}
          </div>
        ) : isLoading ? (
          <p className="py-8 text-white/75" role="status">Loading Whitepaper…</p>
        ) : (
          <article className="rounded-xl bg-[#fffdf8] px-6 py-8 text-neutral-900 shadow-xl sm:px-10 sm:py-12 lg:px-14">
            {blocks.length === 0 ? (
              <p className="text-neutral-700">The document is empty.</p>
            ) : (
              <div className="mx-auto max-w-3xl">
                {blocks.map((block, blockIndex) =>
                  block.type === "paragraph" ? (
                    <ParagraphBlock key={blockIndex} block={block} />
                  ) : (
                    <div key={blockIndex} className="my-7 overflow-x-auto">
                      <table className="w-full border-collapse text-left text-sm">
                        <tbody>
                          {block.rows.map((row, rowIndex) => (
                            <tr key={rowIndex} className="even:bg-neutral-50">
                              {row.map((cell, cellIndex) =>
                                rowIndex === 0 ? (
                                  <th key={cellIndex} className="border border-neutral-300 bg-neutral-100 px-3 py-2 font-semibold">
                                    <RichText runs={cell} />
                                  </th>
                                ) : (
                                  <td key={cellIndex} className="border border-neutral-300 px-3 py-2 align-top">
                                    <RichText runs={cell} />
                                  </td>
                                ),
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ),
                )}
              </div>
            )}
          </article>
        )}

        <p className="mt-5 text-xs text-white/55">This document refreshes automatically every minute.</p>
      </div>
    </main>
  );
}
