import StatusBadge from "../ui/StatusBadge";
import { useNavigate } from "react-router-dom";

export default function InvoiceCard({ invoice, active }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/invoice/${invoice.id}`)}
      className={`
        bg-white dark:bg-[#1E2139]
        rounded-lg p-4 md:p-5
        flex flex-col md:grid md:grid-cols-5
        gap-3 md:gap-0
        items-start md:items-center
        border border-transparent
        hover:border-purple-500 hover:shadow-md
        transition cursor-pointer
        ${active ? "border-purple-600" : ""}
      `}
    >
      {/* TOP ROW (MOBILE) */}
      <div className="flex justify-between w-full md:contents">

        {/* ID */}
        <h3 className="font-bold text-black dark:text-white text-sm md:text-base">
          <span className="text-gray-400">#</span>
          {invoice.id}
        </h3>

        {/* STATUS (mobile only) */}
        <div className="md:hidden">
          <StatusBadge status={invoice.status} />
        </div>
      </div>

      {/* DATE */}
      <p className="text-sm text-gray-500">
        Due {invoice.dueDate || "—"}

      </p>

      {/* CLIENT */}
      <p className="text-sm text-gray-500">
        {invoice.clientName}
      </p>

      {/* TOTAL */}
      <p className="font-bold text-black dark:text-white md:text-right">
        £ {invoice.total || 0}
      </p>

      {/* RIGHT SIDE (DESKTOP ONLY) */}
      <div className="hidden md:flex items-center justify-end gap-6">
        <StatusBadge status={invoice.status} />
        <span className="text-gray-400 text-xl">›</span>
      </div>
    </div>
  );
}