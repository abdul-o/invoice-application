import { createContext, useContext, useEffect, useState } from 'react'

const InvoiceContext = createContext()

export function InvoiceProvider ({ children }) {
  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem('invoices')
    return saved ? JSON.parse(saved) : []
  })

  //  SAVE TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem('invoices', JSON.stringify(invoices))
  }, [invoices])

  //  ADD
  function addInvoice (invoice) {
    setInvoices(prev => [...prev, invoice])
  }

  //  UPDATE
  function updateInvoice (updated) {
    setInvoices(prev =>
      prev.map(inv => (inv.id === updated.id ? updated : inv))
    )
  }

  //  DELETE
  function deleteInvoice (id) {
    setInvoices(prev => prev.filter(inv => inv.id !== id))
  }

  //  MARK AS PAID FUNCTION
  function markAsPaid (id) {
    setInvoices(prev =>
      prev.map(inv => (inv.id === id ? { ...inv, status: 'Paid' } : inv))
    )
  }

  return (
    <InvoiceContext.Provider
      value={{
        invoices,
        addInvoice,
        updateInvoice,
        deleteInvoice,
        markAsPaid
      }}
    >
      {children}
    </InvoiceContext.Provider>
  )
}

export function useInvoices () {
  return useContext(InvoiceContext)
}
