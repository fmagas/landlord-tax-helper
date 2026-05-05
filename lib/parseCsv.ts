import Papa from "papaparse";

export type TransactionType = "income" | "expense";

export type Transaction = {
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
};

const REQUIRED_HEADERS = ["date", "description", "amount", "type"];

export function parseCsv(csv: string): Transaction[] {
  const parsed = Papa.parse<string[]>(csv.trim(), {
    skipEmptyLines: true,
  });

  if (parsed.errors.length > 0) {
    throw new Error(parsed.errors[0].message);
  }

  const rows = parsed.data;

  if (rows.length === 0) {
    throw new Error("CSV file is empty.");
  }

  const firstRow = rows[0].map((value) => normalizeText(value));
  const hasHeader = REQUIRED_HEADERS.every((header) => firstRow.includes(header));
  const dataRows = hasHeader ? rows.slice(1) : rows;

  const transactions = dataRows.map((row, index) => {
    const source = hasHeader ? mapHeaderRow(firstRow, row) : mapPositionRow(row);
    return normalizeTransaction(source, index + (hasHeader ? 2 : 1));
  });

  if (transactions.length === 0) {
    throw new Error("CSV file does not contain any transactions.");
  }

  return transactions;
}

function mapHeaderRow(headers: string[], row: string[]) {
  return {
    date: row[headers.indexOf("date")],
    description: row[headers.indexOf("description")],
    amount: row[headers.indexOf("amount")],
    type: row[headers.indexOf("type")],
  };
}

function mapPositionRow(row: string[]) {
  return {
    date: row[0],
    description: row[1],
    amount: row[2],
    type: row[3],
  };
}

function normalizeTransaction(
  source: Record<"date" | "description" | "amount" | "type", string | undefined>,
  rowNumber: number,
): Transaction {
  const date = source.date?.trim();
  const description = source.description?.trim();
  const amount = Number(source.amount?.replace(/,/g, "").trim());
  const type = normalizeText(source.type);

  if (!date || !description || Number.isNaN(amount) || !isTransactionType(type)) {
    throw new Error(
      `Row ${rowNumber} must include date, description, numeric amount, and type income or expense.`,
    );
  }

  return {
    date,
    description,
    amount,
    type,
  };
}

function normalizeText(value: string | undefined) {
  return value?.trim().toLowerCase() ?? "";
}

function isTransactionType(value: string): value is TransactionType {
  return value === "income" || value === "expense";
}
