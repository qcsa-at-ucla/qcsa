"use client";

import { useCallback, useEffect, useState } from "react";

type ScheduleResponse = {
  rows?: string[][];
  startRow?: number;
  merges?: Array<{
    startRow: number;
    endRow: number;
    startColumn: number;
    endColumn: number;
  }>;
  error?: string;
  updatedAt?: string;
};

export default function QECMLSchedulePage() {
  const [rows, setRows] = useState<string[][]>([]);
  const [startRow, setStartRow] = useState(0);
  const [merges, setMerges] = useState<NonNullable<ScheduleResponse["merges"]>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  const loadSchedule = useCallback(async () => {
    try {
      const response = await fetch("/api/qecml/schedule", { cache: "no-store" });
      const data = (await response.json()) as ScheduleResponse;

      if (!response.ok) throw new Error(data.error || "Unable to load the schedule.");

      setRows(data.rows ?? []);
      setStartRow(data.startRow ?? 0);
      setMerges(data.merges ?? []);
      setUpdatedAt(data.updatedAt ?? null);
      setError(null);
    } catch (loadError) {
      setError(
        loadError instanceof Error ? loadError.message : "Unable to load the schedule.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadSchedule();
    const interval = window.setInterval(() => void loadSchedule(), 60_000);
    return () => window.clearInterval(interval);
  }, [loadSchedule]);

  const headers = rows[0] ?? ["START TIME", "DAY 1 (WED MAR 10)", "DAY 2 (THU MAR 11)", "DAY 3 (FRI MAR 12)"];
  const scheduleRows = rows.slice(1);
  const mergedStarts = new Map<string, number>();
  const mergedCoveredCells = new Set<string>();

  for (const merge of merges) {
    if (
      merge.endColumn - merge.startColumn !== 1 ||
      merge.startColumn < 1 ||
      merge.startColumn > 3 ||
      merge.startRow < startRow + 1 ||
      merge.endRow <= merge.startRow
    ) {
      continue;
    }

    const firstDataRow = merge.startRow - startRow - 1;
    const rowSpan = Math.min(merge.endRow - merge.startRow, scheduleRows.length - firstDataRow);
    if (rowSpan < 2) continue;

    mergedStarts.set(`${firstDataRow}:${merge.startColumn}`, rowSpan);
    for (let offset = 1; offset < rowSpan; offset += 1) {
      mergedCoveredCells.add(`${firstDataRow + offset}:${merge.startColumn}`);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-50 px-5 pb-16 pt-24 text-neutral-900 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#990000]">
          QECML 2027 · USC
        </p>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-5xl font-bold tracking-tight text-neutral-900 sm:text-7xl">Schedule</h1>
            <p className="mt-3 text-neutral-700">March 10–12, 2027</p>
          </div>
          {updatedAt && (
            <p className="text-xs text-neutral-600" aria-live="polite">
              Updated {new Date(updatedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
            </p>
          )}
        </div>

        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-[#790000]" role="status">
            {error}
          </div>
        ) : isLoading ? (
          <p className="py-8 text-neutral-700" role="status">Loading schedule…</p>
        ) : scheduleRows.length === 0 ? (
          <p className="py-8 text-neutral-700">Schedule details will be announced soon.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white p-2 shadow-sm">
            <table className="w-full min-w-[760px] border-separate border-spacing-x-2 border-spacing-y-2 text-left">
              <thead>
                <tr>
                  {headers.slice(0, 4).map((header, index) => (
                    <th
                      key={`${header}-${index}`}
                      scope="col"
                      className={`rounded-lg bg-[#990000] px-4 py-4 text-xs font-bold uppercase tracking-[0.12em] text-white sm:px-5 ${index === 0 ? "w-36" : "min-w-48"}`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {scheduleRows.map((row, rowIndex) => (
                  <tr key={`${row[0] ?? "time"}-${rowIndex}`} className="align-top">
                    {headers.slice(0, 4).map((_, columnIndex) => (
                      mergedCoveredCells.has(`${rowIndex}:${columnIndex}`) ? null : (
                        <td
                          key={columnIndex}
                          rowSpan={mergedStarts.get(`${rowIndex}:${columnIndex}`)}
                          className={`align-top px-4 py-4 text-sm leading-6 sm:px-5 ${columnIndex === 0 ? "whitespace-nowrap font-bold text-[#990000]" : row[columnIndex]?.trim() ? "whitespace-pre-line rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-800" : "whitespace-pre-line text-neutral-500"}`}
                        >
                          {row[columnIndex]?.trim() || ""}
                        </td>
                      )
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-5 text-xs text-neutral-500">This schedule refreshes automatically every minute.</p>
      </div>
    </main>
  );
}
