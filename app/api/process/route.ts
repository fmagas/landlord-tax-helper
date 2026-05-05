import { NextResponse } from "next/server";
import { calculateSummary } from "@/lib/calculateSummary";
import { parseCsv } from "@/lib/parseCsv";

export const runtime = "nodejs";

const MAX_FILE_SIZE_BYTES = 1024 * 1024;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Please upload a CSV file." }, { status: 400 });
    }

    if (!file.name.toLowerCase().endsWith(".csv")) {
      return NextResponse.json({ error: "Only CSV files are supported." }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "CSV file must be 1MB or smaller for this demo." },
        { status: 400 },
      );
    }

    const csv = await file.text();
    const transactions = parseCsv(csv);
    const summary = calculateSummary(transactions);

    return NextResponse.json({
      ...summary,
      transactions,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to process CSV file.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
