import StatusBadge from "../ui/StatusBadge";

export default function InvoiceCard({ invoice }) {
  return (
    <div className="bg-white dark:bg-[#1E2139] rounded-lg p-5 flex justify-between items-center shadow hover:scale-[1.01] transition cursor-pointer">

      {/* LEFT */}
      <div className="flex justify-between gap-4">
        <h3 className="font-bold text-black dark:text-white">
          <span className="text-gray-400">#</span>
          {invoice.id}
        </h3>

        <p className="text-sm text-gray-500">
          Due {invoice.dueDate}
        </p>

        <p className="text-sm text-gray-500">
          {invoice.clientName}
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6">
        <p className="font-bold text-black dark:text-white">
          £ {invoice.amount}
        </p>

        <StatusBadge status={invoice.status} />

        <span className="text-gray-400 text-xl">›</span>
      </div>

    </div>
  );
}