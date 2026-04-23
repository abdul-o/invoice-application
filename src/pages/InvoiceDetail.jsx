import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "../components/layout/Container";
import InvoiceForm from "../components/invoice/InvoiceForm";
import Modal from "../components/ui/Modal";
import { useInvoices } from "../context/InvoiceContext";

export default function InvoiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [openForm, setOpenForm] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // ✅ FIX: single hook call
  const { invoices, deleteInvoice, markAsPaid } = useInvoices();

  // ✅ get real invoice
  const invoice = invoices.find((inv) => inv.id === id);

  if (!invoice) {
    return <p className="text-center mt-10">Invoice not found</p>;
  }

  return (
    <Container>

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-purple-500"
      >
        ← Go back
      </button>

      {/* STATUS + ACTIONS */}
      <div className="bg-white dark:bg-[#1E2139] rounded-lg p-5 flex justify-between items-center mb-6">

        <div className="flex items-center gap-4">
          <span className="text-gray-500">Status</span>

          <span
            className={`px-3 py-1 rounded-full text-sm ${
              invoice.status === "Paid"
                ? "bg-green-100 text-green-600"
                : invoice.status === "Draft"
                ? "bg-gray-200 text-gray-600"
                : "bg-orange-100 text-orange-600"
            }`}
          >
            ● {invoice.status}
          </span>
        </div>

        <div className="flex gap-3">

          {/* EDIT */}
          <button
            onClick={() => setOpenForm(true)}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Edit
          </button>

          {/* DELETE */}
          <button
            onClick={() => setOpenModal(true)}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Delete
          </button>

          {/* MARK AS PAID */}
          <button
            disabled={invoice.status === "Paid"}
            onClick={() => markAsPaid(id)}
            className="px-4 py-2 bg-purple-500 text-white rounded disabled:opacity-50"
          >
            Mark as Paid
          </button>

        </div>
      </div>

      {/* INVOICE CARD */}
      <div className="bg-white dark:bg-[#1E2139] p-6 rounded-lg">

        <h2 className="font-bold text-lg mb-4">
          <span className="text-gray-400">#</span>
          {invoice.id}
        </h2>

        <div className="grid grid-cols-2 gap-6 text-sm text-gray-500 mb-6">

          <div>
            <p>Invoice Date</p>
            <p className="text-black dark:text-white font-bold">
              {invoice.createdAt || "—"}
            </p>
          </div>

          <div>
            <p>Payment Due</p>
            <p className="text-black dark:text-white font-bold">
              {invoice.dueDate || "—"}
            </p>
          </div>

          <div>
            <p>Bill To</p>
            <p className="text-black dark:text-white">
              {invoice.clientName || "—"}
            </p>
          </div>

          <div>
            <p>Sent to</p>
            <p className="text-black dark:text-white">
              {invoice.clientEmail || "—"}
            </p>
          </div>

        </div>

        {/* ITEMS */}
        <div className="bg-gray-100 dark:bg-[#252945] rounded-lg p-4">

          {/* If items exist */}
          {invoice.items && invoice.items.length > 0 ? (
            invoice.items.map((item, index) => (
              <div key={index} className="flex justify-between mb-2 text-sm">
                <span>{item.name}</span>
                <span>£ {item.qty * item.price}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No items</p>
          )}

          {/* TOTAL */}
          <div className="bg-[#1E2139] text-white p-4 rounded-lg flex justify-between mt-4">
            <span>Amount Due</span>
            <span>£ {invoice.total || 0}</span>
          </div>

        </div>

      </div>

      {/* EDIT FORM (REAL DATA NOW) */}
      <InvoiceForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        invoice={invoice}
      />

      {/* DELETE MODAL */}
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={() => {
          deleteInvoice(id);
          navigate("/");
        }}
      />

    </Container>
  );
}