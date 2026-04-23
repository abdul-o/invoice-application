import { useState, useEffect } from "react";
import { useInvoices } from "../../context/InvoiceContext";
import StatusBadge from "../ui/StatusBadge";
export default function InvoiceForm({ open, onClose, invoice }) {
  const { addInvoice, updateInvoice } = useInvoices();
  const [errors, setErrors] = useState({});
  // ✅ ALWAYS DECLARE HOOKS FIRST
  const [form, setForm] = useState({
    clientName: "",
    amount: "",
    items: [
      { name: "", qty: 1, price: 0 }
    ],
  });



  // ✅ PREFILL WHEN EDITING
  useEffect(() => {
    if (invoice) {
      setForm({
        clientName: invoice.clientName || "",
        amount: invoice.amount || "",
        items: invoice.items || [
          { name: "", qty: 1, price: 0 }
        ],
      });
    }
  }, [invoice]);

  if (!open) return null;

  function validate() {
    let newErrors = {};

    // CLIENT NAME
    if (!form.clientName) {
      newErrors.clientName = "Client name required";
    }

    // ITEMS
    if (form.items.length === 0) {
      newErrors.items = "At least one item required";
    }

    form.items.forEach((item, index) => {
      if (!item.name) {
        newErrors[`itemName-${index}`] = "Item name required";
      }

      if (item.qty <= 0) {
        newErrors[`itemQty-${index}`] = "Qty must be > 0";
      }

      if (item.price <= 0) {
        newErrors[`itemPrice-${index}`] = "Price must be > 0";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }




  // function validate() {
  //   let newErrors = {};

  //   if (!form.clientName) {
  //     newErrors.clientName = "Client name required";
  //   }

  //   if (form.items.length === 0) {
  //     newErrors.items = "At least one item required";
  //   }


  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // }

  // Items changes function
  function handleItemChange(index, field, value) {
    const newItems = [...form.items];
    newItems[index][field] = field === "name" ? value : Number(value);

    setForm({ ...form, items: newItems });
  }

  // Add or remove items function

  function addItem() {
    setForm({
      ...form,
      items: [...form.items, { name: "", qty: 1, price: 0 }],
    });
  }

  function removeItem(index) {
    const newItems = form.items.filter((_, i) => i !== index);
    setForm({ ...form, items: newItems });
    if (form.items.length === 1) return;
  }



  // Caculation function


  function calculateTotal(item) {
    return item.qty * item.price;
  }

  function calculateGrandTotal() {
    return form.items.reduce((sum, item) => {
      return sum + calculateTotal(item);
    }, 0);
  }

  function handleSubmit(status) {
    if (!validate()) return;

    const invoiceData = {
      id: invoice?.id || Math.random().toString(36).substring(2, 7).toUpperCase(),
      ...form,
      total: calculateGrandTotal(),
      status,
    };

    if (invoice) {
      // UPDATE
      updateInvoice(invoiceData);
    } else {
      // CREATE
       addInvoice({
  id: Math.random().toString(36).substring(2, 7).toUpperCase(),
  ...form,
  dueDate: form.dueDate || "21 Aug 2021", // TEMP default
  total: calculateGrandTotal(),
  status: "Pending",
});

    }

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-row-reverse ">
      {/* Overlay */}
      <div onClick={onClose} className="flex-1 bg-black/50" />

      {/* Drawer */}
      <div className="w-full max-w-xl bg-white dark:bg-[#141625] p-6 overflow-y-auto ml-20 ">

        <h2 className="text-xl font-bold mb-6 dark:text-white">
          {invoice ? "Edit Invoice" : "New Invoice"}
        </h2>

        {/* CLIENT NAME */}

        {/* BILL FROM */}
        <p className="text-purple-500 mb-2">Bill From</p>







        <input className="w-full p-3 mb-3 border rounded" placeholder="Street Address" />

        <div className="grid grid-cols-3 gap-3 mb-3">
          <input className="p-3 border rounded" placeholder="City" />
          <input className="p-3 border rounded" placeholder="Post Code" />
          <input className="p-3 border rounded" placeholder="Country" />
        </div>

        {/* BILL TO */}
        <p className="text-purple-500 mt-6 mb-2">Bill To</p>
        <input
          name="clientName"
          value={form.clientName}
          onChange={handleChange}
          placeholder="Client Name"
          className="w-full p-3 mb-4 border rounded"
        />
        {/* <input className="w-full p-3 mb-3 border rounded" placeholder="Client Name" /> */}
        <input className="w-full p-3 mb-3 border rounded" placeholder="Client Email" />
        <input className="w-full p-3 mb-3 border rounded" placeholder="Street Address" />

        <div className="grid grid-cols-3 gap-3 mb-3">
          <input className="p-3 border rounded" placeholder="City" />
          <input className="p-3 border rounded" placeholder="Post Code" />
          <input className="p-3 border rounded" placeholder="Country" />
        </div>

        {/* DATES */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <input type="date" className="p-3 border rounded" />
          <select className="p-3 border rounded">
            <option>Net 30 Days</option>
            <option>Net 7 Days</option>
            <option>Net 1 Day</option>
          </select>
        </div>

        {/* DESCRIPTION */}
        <input
          className="w-full p-3 mb-4 border rounded"
          placeholder="Project Description"
        />

        <h3 className="mt-6 mb-2 text-gray-500">Item List</h3>

        {form.items?.map((item, index) => (

          <div className="grid grid-cols-5 items-center w-full">

  <p className="font-bold"># {invoice.id}</p>

  <p className="text-gray-500">Due {invoice.date}</p>

  <p className="text-gray-500">{invoice.clientName}</p>

  <p className="font-bold text-right">£ {invoice.total}</p>

  <div className="flex justify-end">
    <StatusBadge status={invoice.status} />
  </div>

</div>








          // <div key={index} className="grid grid-cols-12 gap-2 mb-3 items-center">

          //   {/* NAME */}
          //   <input
          //     value={item.name}
          //     onChange={(e) => handleItemChange(index, "name", e.target.value)}
          //     placeholder="Item Name"
          //     className="col-span-5 p-2 border rounded"
          //   /> {errors[`itemName-${index}`] && (
          //     <p className="text-red-500 text-xs">
          //       {errors[`itemName-${index}`]}
          //     </p>
          //   )}

          //   {/* QTY */}
          //   <input
          //     type="number"
          //     value={item.qty}
          //     onChange={(e) => handleItemChange(index, "qty", e.target.value)}
          //     className="col-span-2 p-2 border rounded"
          //   /> {errors[`itemQty-${index}`] && (
          //     <p className="text-red-500 text-xs">
          //       {errors[`itemQty-${index}`]}
          //     </p>
          //   )}

          //   {/* PRICE */}
          //   <input
          //     type="number"
          //     value={item.price}
          //     onChange={(e) => handleItemChange(index, "price", e.target.value)}
          //     className="col-span-2 p-2 border rounded"
          //   />  {errors[`itemPrice-${index}`] && (
          //     <p className="text-red-500 text-xs">
          //       {errors[`itemPrice-${index}`]}
          //     </p>
          //   )}

          //   {/* TOTAL */}
          //   {/* <div className="col-span-2 text-center">
          //     £ {calculateTotal(item)}
          //   </div> */}
          //   <p className="font-bold text-black dark:text-white">
          //     £ {invoice.total}
          //   </p>

          //   {/* DELETE */}
          //   <button
          //     onClick={() => removeItem(index)}
          //     className="col-span-1 text-red-500"
          //   >
          //     🗑
          //   </button>

          // </div>
        ))}

        <button
          onClick={addItem}
          className="w-full bg-gray-200 py-2 rounded mt-3"
        >
          + Add New Item
        </button>


        {errors.clientName && (
          <p className="text-red-500 text-sm mb-3">{errors.clientName}</p>
        )}

        {/* AMOUNT */}
        {/* <input
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="w-full p-3 mb-2 border rounded"
        /> */}
        {errors.amount && (
          <p className="text-red-500 text-sm mb-3">{errors.amount}</p>
        )}

        {/* ACTIONS */}
        <div className="flex justify-between mt-6">
          <button onClick={onClose}>Discard</button>

          <div className="flex gap-3">


            <button
              onClick={() => handleSubmit("Draft")}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Save as Draft
            </button>

            <button
              onClick={() => handleSubmit("Pending")}
              className="bg-purple-500 text-white px-4 py-2 rounded"
            >
              Save & Send
            </button>

            {/* <button className="bg-gray-300 px-4 py-2 rounded">
              Save as Draft
            </button> */}

            {/* <button
              onClick={handleSubmit}
              className="bg-purple-500 text-white px-4 py-2 rounded"
            >
              Save & Send
            </button> */}
          </div>
        </div>

      </div>
    </div>
  );
}