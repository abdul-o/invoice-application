import { useState } from "react";



export default function Modal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      {/* Modal */}
      <div className="bg-white dark:bg-[#1E2139] p-6 rounded-lg w-[90%] max-w-md">

        <h2 className="text-lg font-bold mb-4 dark:text-white">
          Confirm Deletion
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          Are you sure you want to delete this invoice? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Cancel
          </button>


          <button
            onClick={() => setOpenModal(true)}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Delete
          </button>


        </div>

      </div>

<Modal
  isOpen={openModal}
  onClose={() => setOpenModal(false)}
  onConfirm={() => {
    alert("Invoice deleted"); // later → real delete
    setOpenModal(false);
  }}
/>

    </div>



  );



}