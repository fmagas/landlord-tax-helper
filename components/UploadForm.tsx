"use client";

import { FormEvent, useMemo, useState } from "react";
import SummaryCard from "@/components/SummaryCard";
import TransactionsTable from "@/components/TransactionsTable";
import type { ProcessResult } from "@/lib/calculateSummary";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ProcessResult | null>(null);

  const canSubmit = useMemo(() => Boolean(file) && !isLoading, [file, isLoading]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) {
      setError("Choose a CSV file first.");
      return;
    }

    setIsLoading(true);
    setError("");
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/process", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "The file could not be processed.");
      }

      setResult(data);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-soft">
        <h2 className="text-lg font-semibold text-ink">CSV upload</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          Use columns for date, description, amount, and type.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <label className="block">
            <span className="text-sm font-semibold text-zinc-700">CSV file</span>
            <input
              className="mt-2 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-800 file:mr-4 file:rounded-md file:border-0 file:bg-mist file:px-3 file:py-2 file:text-sm file:font-semibold file:text-leaf hover:file:bg-[#dfece5] focus:outline-none focus:ring-4 focus:ring-leaf/15"
              type="file"
              accept=".csv,text/csv"
              onChange={(event) => {
                setFile(event.target.files?.[0] ?? null);
                setError("");
              }}
            />
          </label>

          <button
            type="submit"
            disabled={!canSubmit}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-leaf px-4 text-sm font-semibold text-white transition hover:bg-[#1f5f3f] focus:outline-none focus:ring-4 focus:ring-leaf/20 disabled:cursor-not-allowed disabled:bg-zinc-300"
          >
            {isLoading ? "Processing..." : "Process File"}
          </button>
        </form>

        {error ? (
          <div className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        ) : null}
      </section>

      <section className="min-w-0">
        {result ? (
          <div className="space-y-6">
            <SummaryCard
              totalIncome={result.totalIncome}
              totalExpenses={result.totalExpenses}
              netProfit={result.netProfit}
            />
            <TransactionsTable transactions={result.transactions} />
          </div>
        ) : (
          <div className="flex min-h-[320px] items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-white p-8 text-center">
            <div>
              <h2 className="text-xl font-semibold text-ink">Results appear here</h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-zinc-600">
                Upload a CSV to see total income, total expenses, net profit, and each
                transaction row.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
