import { useState, useEffect } from "react";
import { useInvoices } from "../../context/InvoiceContext";

export default function InvoiceForm({ open, onClose, invoice }) {
  const { addInvoice, updateInvoice } = useInvoices();

  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    billFrom: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    billTo: {
      clientName: "",
      clientEmail: "",
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    invoiceDate: "",
    paymentTerms: "30",
    description: "",
    items: [{ name: "", qty: 1, price: 0 }],
  });

  // ✅ PREFILL (EDIT)
  useEffect(() => {
    if (invoice) {
      setForm(invoice);
    }
  }, [invoice]);

  if (!open) return null;

  // ✅ INPUT CHANGE
  function handleChange(e, section = null) {
    if (section) {
      setForm({
        ...form,
        [section]: {
          ...form[section],
          [e.target.name]: e.target.value,
        },
      });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  }

  // ✅ ITEM CHANGE
  function handleItemChange(index, field, value) {
    const newItems = [...form.items];
    newItems[index][field] =
      field === "name" ? value : Number(value);

    setForm({ ...form, items: newItems });
  }

  function addItem() {
    setForm({
      ...form,
      items: [...form.items, { name: "", qty: 1, price: 0 }],
    });
  }

  function removeItem(index) {
    if (form.items.length === 1) return;
    setForm({
      ...form,
      items: form.items.filter((_, i) => i !== index),
    });
  }

  function calculateTotal(item) {
    return item.qty * item.price;
  }

  function calculateGrandTotal() {
    return form.items.reduce(
      (sum, item) => sum + calculateTotal(item),
      0
    );
  }

function calculateDueDate() {
  if (!form.invoiceDate) return "";

  const date = new Date(form.invoiceDate);
  date.setDate(date.getDate() + Number(form.paymentTerms));

  return date.toISOString().split("T")[0]; // format YYYY-MM-DD
}






function handleSubmit(status) {
  const data = {
    id:
      invoice?.id ||
      Math.random().toString(36).substring(2, 7).toUpperCase(),

    ...form,

    dueDate: calculateDueDate(), // ✅ ADD THIS
    total: calculateGrandTotal(),
    status,
  };

  if (invoice) {
    updateInvoice(data);
  } else {
    addInvoice(data);
  }

  onClose();
}













  // function handleSubmit(status) {
  //   const data = {
  //     id:
  //       invoice?.id ||
  //       Math.random().toString(36).substring(2, 7).toUpperCase(),
  //     ...form,
  //     total: calculateGrandTotal(),
  //     status,
  //   };

  //   if (invoice) {
  //     updateInvoice(data);
  //   } else {
  //     addInvoice(data);
  //   }

  //   onClose();
  // }

  return (
    <div className="fixed inset-0 z-50 flex-row-reverse flex ml-24">

      {/* OVERLAY */}
      <div onClick={onClose} className="flex-1 bg-black/50" />

      {/* DRAWER */}
      <div className="w-full max-w-xl dark:bg-[#141625] p-6 overflow-y-auto rounded-br-xl relative">

        <h2 className="text-xl font-bold mb-6">
          {invoice ? "Edit Invoice" : "New Invoice"}
        </h2>

        {/* BILL FROM */}
        <p className="text-purple-500 mb-2">Bill From</p>

        <input
          name="street"
          placeholder="Street Address"
          value={form.billFrom.street}
          onChange={(e) => handleChange(e, "billFrom")}
          className="w-full p-3 mb-3 border rounded"
        />

        <div className="grid grid-cols-3 gap-3 mb-3">
          <input name="city" placeholder="City" value={form.billFrom.city} onChange={(e)=>handleChange(e,"billFrom")} className="p-3 border rounded"/>
          <input name="postCode" placeholder="Post Code" value={form.billFrom.postCode} onChange={(e)=>handleChange(e,"billFrom")} className="p-3 border rounded"/>
          <input name="country" placeholder="Country" value={form.billFrom.country} onChange={(e)=>handleChange(e,"billFrom")} className="p-3 border rounded"/>
        </div>

        {/* BILL TO */}
        <p className="text-purple-500 mt-6 mb-2">Bill To</p>

        <input name="clientName" placeholder="Client Name" value={form.billTo.clientName} onChange={(e)=>handleChange(e,"billTo")} className="w-full p-3 mb-3 border rounded"/>

        <input name="clientEmail" placeholder="Client Email" value={form.billTo.clientEmail} onChange={(e)=>handleChange(e,"billTo")} className="w-full p-3 mb-3 border rounded"/>

        <input name="street" placeholder="Street Address" value={form.billTo.street} onChange={(e)=>handleChange(e,"billTo")} className="w-full p-3 mb-3 border rounded"/>

        <div className="grid grid-cols-3 gap-3 mb-3">
          <input name="city" placeholder="City" value={form.billTo.city} onChange={(e)=>handleChange(e,"billTo")} className="p-3 border rounded"/>
          <input name="postCode" placeholder="Post Code" value={form.billTo.postCode} onChange={(e)=>handleChange(e,"billTo")} className="p-3 border rounded"/>
          <input name="country" placeholder="Country" value={form.billTo.country} onChange={(e)=>handleChange(e,"billTo")} className="p-3 border rounded"/>
        </div>

        {/* DATE */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <input type="date" name="invoiceDate" value={form.invoiceDate} onChange={handleChange} className="p-3 border rounded"/>
          <select name="paymentTerms" value={form.paymentTerms} onChange={handleChange} className="p-3 border rounded">
            <option value="1">Net 1 Day</option>
            <option value="7">Net 7 Days</option>
            <option value="30">Net 30 Days</option>
          </select>
        </div>

        {/* DESCRIPTION */}
        <input name="description" placeholder="Project Description" value={form.description} onChange={handleChange} className="w-full p-3 mb-4 border rounded"/>

        {/* ITEMS */}
        <h3 className="text-gray-500 mb-2">Item List</h3>

        {form.items.map((item, index) => (
          <div key={index} className="grid grid-cols-12 gap-2 mb-3 items-center">

            <input value={item.name} onChange={(e)=>handleItemChange(index,"name",e.target.value)} placeholder="Item Name" className="col-span-5 p-2 border rounded"/>

            <input type="number" value={item.qty} onChange={(e)=>handleItemChange(index,"qty",e.target.value)} className="col-span-2 p-2 border rounded"/>

            <input type="number" value={item.price} onChange={(e)=>handleItemChange(index,"price",e.target.value)} className="col-span-2 p-2 border rounded"/>

            <div className="col-span-2 text-center">
              £ {calculateTotal(item)}
            </div>

            <button onClick={()=>removeItem(index)} className="col-span-1 text-red-500">
              🗑
            </button>

          </div>
        ))}

        <button onClick={addItem} className="w-full bg-gray-200 py-2 rounded mt-3">
          + Add New Item
        </button>

        {/* ACTIONS */}
        <div className="flex justify-between mt-6">
          <button onClick={onClose}>Discard</button>

          <div className="flex gap-3">
            <button onClick={()=>handleSubmit("Draft")} className="bg-gray-300 px-4 py-2 rounded">
              Save as Draft
            </button>

            <button onClick={()=>handleSubmit("Pending")} className="bg-purple-500 text-white px-4 py-2 rounded">
              Save & Send
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}