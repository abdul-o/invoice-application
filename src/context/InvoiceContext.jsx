import { createContext, useContext, useState, useEffect } from "react";

const InvoiceContext = createContext();

export function InvoiceProvider({ children }) {
  const [invoices, setInvoices] = useState(() => {
    const data = localStorage.getItem("invoices");
    return data ? JSON.parse(data) : [];
  });

  // persist to localStorage
  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices));
  }, [invoices]);

  function addInvoice(invoice) {
    setInvoices((prev) => [...prev, invoice]);
  }

  function deleteInvoice(id) {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
  }

  function updateInvoice(updated) {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === updated.id ? updated : inv))
    );
  }

  return (
    <InvoiceContext.Provider
      value={{ invoices, addInvoice, deleteInvoice, updateInvoice }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}

export function useInvoices() {
  return useContext(InvoiceContext);
}