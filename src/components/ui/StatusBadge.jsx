
export default function StatusBadge({ status }) {
  const styles = {
    Paid: "bg-green-100 text-green-600",
    Pending: "bg-orange-100 text-orange-600",
    Draft: "bg-gray-200 text-gray-600",
  };

  return (
    <span
      className={`
        flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium
        ${styles[status] || ""}
      `}
    >
      <span className="text-lg">•</span>
      {status}
    </span>
  );
}