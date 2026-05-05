import type { Transaction } from "@/lib/parseCsv";

export type ProcessResult = {
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  transactions: Transaction[];
};

export function calculateSummary(transactions: Transaction[]) {
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  return {
    totalIncome,
    totalExpenses,
    netProfit: totalIncome - totalExpenses,
  };
}
