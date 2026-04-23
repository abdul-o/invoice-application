import { useParams } from "react-router-dom";
import Container from "../components/layout/Container";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import InvoiceForm from "../components/invoice/InvoiceForm";
import Modal from "../components/ui/Modal"

export default function InvoiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openForm, setOpenForm] = useState(false);
  const [openModal, setOpenModal] = useState(false);
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
      <div className="
    bg-white dark:bg-[#1E2139]
    rounded-lg p-5 flex justify-between items-center
    border border-transparent
    hover:border-purple-500
    transition cursor-pointer
    relative z-10
  "
      >
        <div className="flex items-center gap-4">
          <span className="text-gray-500">Status</span>
          <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
            ● Pending
          </span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setOpenForm(true)}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Edit
          </button>
          {/* <button className="px-4 py-2 bg-gray-200 rounded">Edit</button> */}
          {/* <button className="px-4 py-2 bg-red-500 text-white rounded">Delete</button> */}
          <button
            onClick={() => setOpenModal(true)}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Delete
          </button>

          <button className="px-4 py-2 bg-purple-500 text-white rounded">
            Mark as Paid
          </button>
        </div>

      </div>

      {/* INVOICE CARD */}
      <div className="bg-white dark:bg-[#1E2139] p-6 rounded-lg">

        <h2 className="font-bold text-lg mb-4"># {id}</h2>

        <div className="grid grid-cols-2 gap-6 text-sm text-gray-500 mb-6">
          <div>
            <p>Invoice Date</p>
            <p className="text-black dark:text-white font-bold">21 Aug 2021</p>
          </div>

          <div>
            <p>Payment Due</p>
            <p className="text-black dark:text-white font-bold">20 Sep 2021</p>
          </div>

          <div>
            <p>Bill To</p>
            <p className="text-black dark:text-white">Alex Grim</p>
          </div>

          <div>
            <p>Sent to</p>
            <p className="text-black dark:text-white">alex@email.com</p>
          </div>
        </div>

        {/* ITEMS */}
        <div className="bg-gray-100 dark:bg-[#252945] rounded-lg p-4">

          <div className="flex justify-between mb-2 text-sm">
            <span>Banner Design</span>
            <span>£156.00</span>
          </div>

          <div className="flex justify-between mb-4 text-sm">
            <span>Email Design</span>
            <span>£400.00</span>
          </div>

          <div className="bg-[#1E2139] text-white p-4 rounded-lg flex justify-between">
            <span>Amount Due</span>
            <span>£556.00</span>
          </div>

        </div>

      </div>
      <InvoiceForm open={openForm} onClose={() => setOpenForm(false)} />
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={() => {
          alert("Invoice deleted");
          setOpenModal(false);
        }}
      />

    </Container>
  );
}

