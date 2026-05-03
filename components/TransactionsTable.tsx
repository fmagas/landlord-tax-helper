import type { Transaction } from "@/lib/parseCsv";

type TransactionsTableProps = {
  transactions: Transaction[];
};

const formatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

export default function TransactionsTable({ transactions }: TransactionsTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-soft">
      <div className="border-b border-zinc-200 px-5 py-4">
        <h2 className="text-lg font-semibold text-ink">Transactions</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-200 text-left text-sm">
          <thead className="bg-zinc-50">
            <tr>
              <th className="whitespace-nowrap px-5 py-3 font-semibold text-zinc-600">Date</th>
              <th className="min-w-56 px-5 py-3 font-semibold text-zinc-600">Description</th>
              <th className="whitespace-nowrap px-5 py-3 font-semibold text-zinc-600">Type</th>
              <th className="whitespace-nowrap px-5 py-3 text-right font-semibold text-zinc-600">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 bg-white">
            {transactions.map((transaction, index) => (
              <tr key={`${transaction.date}-${transaction.description}-${index}`}>
                <td className="whitespace-nowrap px-5 py-4 text-zinc-700">{transaction.date}</td>
                <td className="px-5 py-4 text-zinc-800">{transaction.description}</td>
                <td className="whitespace-nowrap px-5 py-4">
                  <span
                    className={
                      transaction.type === "income"
                        ? "rounded-md bg-green-50 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-green-700"
                        : "rounded-md bg-amber-50 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-amber-700"
                    }
                  >
                    {transaction.type}
                  </span>
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-right font-medium text-zinc-900">
                  {formatter.format(transaction.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
