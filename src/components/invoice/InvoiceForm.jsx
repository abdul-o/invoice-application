export default function InvoiceForm({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">

      {/* Overlay */}
      <div
        onClick={onClose}
        className="flex-1 bg-black/50"
      />

      {/* Drawer */}
      <div className="w-full max-w-xl bg-white dark:bg-[#141625] p-6 overflow-y-auto">

        <h2 className="text-xl font-bold mb-6 dark:text-white">
          New Invoice
        </h2>

        {/* Simple form (we expand later) */}
        <input
          placeholder="Client Name"
          className="w-full p-3 mb-4 border rounded"
        />

        <input
          placeholder="Amount"
          className="w-full p-3 mb-4 border rounded"
        />

        <div className="flex justify-between mt-6">
          <button onClick={onClose}>Discard</button>

          <div className="flex gap-3">
            <button className="bg-gray-300 px-4 py-2 rounded">
              Save as Draft
            </button>
            <button className="bg-purple-500 text-white px-4 py-2 rounded">
              Save & Send
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}