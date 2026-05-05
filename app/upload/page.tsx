import Link from "next/link";
import UploadForm from "@/components/UploadForm";

export default function UploadPage() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href="/" className="text-sm font-semibold text-leaf hover:text-[#1f5f3f]">
              Landlord Tax Helper
            </Link>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink">
              Upload rental CSV
            </h1>
            <p className="mt-2 max-w-2xl text-base leading-7 text-zinc-600">
              Process income and expense rows into a simple rental summary.
            </p>
          </div>
        </header>

        <UploadForm />
      </div>
    </main>
  );
}
