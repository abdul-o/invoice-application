import Container from '../components/layout/Container'
import Header from '../components/layout/Header'
import InvoiceCard from '../components/invoice/InvoiceCard'
import { useState } from 'react'
import { useInvoices } from '../context/InvoiceContext'

export default function Home () {
  const [filter, setFilter] = useState([])

  const { invoices } = useInvoices()
  const filteredInvoices =
    filter.length === 0
      ? invoices
      : invoices.filter(inv => filter.includes(inv.status))

 return (
  <Container>
    <Header filter={filter} setFilter={setFilter} />

    <div className="flex flex-col gap-4 mt-6">
      {filteredInvoices.map(inv => (
        <InvoiceCard key={inv.id} invoice={inv} />
      ))}
    </div>
  </Container>
)
}
