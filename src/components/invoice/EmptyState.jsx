export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-20 gap-6">

      <img
        src="/empty.svg"
        alt="No invoices"
        className="w-40"
      />

      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        There is nothing here
      </h2>

      <p className="text-gray-500 max-w-xs">
        Create an invoice by clicking the New button and get started
      </p>

    </div>
  );
}