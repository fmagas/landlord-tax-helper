type SummaryCardProps = {
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
};

const formatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

export default function SummaryCard({
  totalIncome,
  totalExpenses,
  netProfit,
}: SummaryCardProps) {
  const items = [
    { label: "Total Income", value: totalIncome },
    { label: "Total Expenses", value: totalExpenses },
    { label: "Net Profit", value: netProfit },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.label}
          className="rounded-lg border border-zinc-200 bg-white p-5 shadow-soft"
        >
          <p className="text-sm font-medium text-zinc-500">{item.label}</p>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-ink">
            {formatter.format(item.value)}
          </p>
        </article>
      ))}
    </div>
  );
}
