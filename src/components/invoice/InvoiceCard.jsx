import StatusBadge from "../ui/StatusBadge";
import { useNavigate } from "react-router-dom";
export default function InvoiceCard({ invoice, active }) {
  const navigate = useNavigate();
  return (
     <div onClick={() => {
        navigate(`/invoice/${invoice.id}`);
      }}
      className={`
  bg-white dark:bg-[#1E2139]
  rounded-lg p-5 flex justify-between items-center
  border border-transparent
  hover:border-purple-500
  transition
  cursor-pointer ${active ? "border-purple-600":"border-transparent hover:border-purple-500"}
  `}>
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