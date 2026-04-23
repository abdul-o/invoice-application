import { useState, useEffect } from "react";
import { useInvoices } from "../../context/InvoiceContext";

export default function InvoiceForm({ open, onClose, invoice }) {
  const { addInvoice, updateInvoice } = useInvoices();

  // ✅ ALWAYS DECLARE HOOKS FIRST
  const [form, setForm] = useState({
    clientName: "",
    amount: "",
  });

  const [errors, setErrors] = useState({});

  // ✅ PREFILL WHEN EDITING
  useEffect(() => {
    if (invoice) {
      setForm({
        clientName: invoice.clientName || "",
        amount: invoice.amount || "",
      });
    } else {
      setForm({ clientName: "", amount: "" });
    }
  }, [invoice]);

  if (!open) return null;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    let newErrors = {};

    if (!form.clientName) {
      newErrors.clientName = "Client name required";
    }

    if (!form.amount || form.amount <= 0) {
      newErrors.amount = "Amount must be positive";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;

    if (invoice) {
      // UPDATE
      updateInvoice({
        ...invoice,
        ...form,
      });
    } else {
      // CREATE
      addInvoice({
        id: Math.random().toString(36).substring(2, 7).toUpperCase(),
        ...form,
        status: "Pending",
      });
    }

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div onClick={onClose} className="flex-1 bg-black/50" />

      {/* Drawer */}
      <div className="w-full max-w-xl bg-white dark:bg-[#141625] p-6 overflow-y-auto">

        <h2 className="text-xl font-bold mb-6 dark:text-white">
          {invoice ? "Edit Invoice" : "New Invoice"}
        </h2>

        {/* CLIENT NAME */}
        <input
          name="clientName"
          value={form.clientName}
          onChange={handleChange}
          placeholder="Client Name"
          className="w-full p-3 mb-2 border rounded"
        />
        {errors.clientName && (
          <p className="text-red-500 text-sm mb-3">{errors.clientName}</p>
        )}

        {/* AMOUNT */}
        <input
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="w-full p-3 mb-2 border rounded"
        />
        {errors.amount && (
          <p className="text-red-500 text-sm mb-3">{errors.amount}</p>
        )}

        {/* ACTIONS */}
        <div className="flex justify-between mt-6">
          <button onClick={onClose}>Discard</button>

          <div className="flex gap-3">
            <button className="bg-gray-300 px-4 py-2 rounded">
              Save as Draft
            </button>

            <button
              onClick={handleSubmit}
              className="bg-purple-500 text-white px-4 py-2 rounded"
            >
              Save & Send
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}