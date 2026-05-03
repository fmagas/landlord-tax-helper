import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-10 sm:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center">
        <div className="grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-leaf">
              CSV summary tool
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              Landlord Tax Helper
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-600">
              Upload your rental data. Get a simple tax summary.
            </p>
            <div className="mt-8">
              <Link
                href="/upload"
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-leaf px-6 text-base font-semibold text-white shadow-soft transition hover:bg-[#1f5f3f] focus:outline-none focus:ring-4 focus:ring-leaf/20"
              >
                Upload File
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-soft">
            <div className="mb-5 flex items-center justify-between border-b border-zinc-100 pb-4">
              <div>
                <p className="text-sm font-medium text-zinc-500">Demo summary</p>
                <p className="text-xl font-semibold text-ink">January rental data</p>
              </div>
              <div className="rounded-md bg-mist px-3 py-2 text-sm font-semibold text-leaf">
                CSV
              </div>
            </div>
            <div className="grid gap-3">
              {[
                ["Total Income", "£1,200"],
                ["Total Expenses", "£200"],
                ["Net Profit", "£1,000"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-md border border-zinc-100 bg-zinc-50 px-4 py-3"
                >
                  <span className="text-sm font-medium text-zinc-600">{label}</span>
                  <span className="text-lg font-semibold text-ink">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
