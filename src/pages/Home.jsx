import Container from "../components/layout/Container";
import Header from "../components/layout/Header";
import InvoiceCard from "../components/invoice/InvoiceCard";
import { useState } from "react";
import { useInvoices } from "../context/InvoiceContext";

export default function Home() {
  const [filter, setFilter] = useState([]);

const { invoices } = useInvoices();
  return (
    <Container>
      {/* <Header /> */}
     <Header filter={filter} setFilter={setFilter} />
      <div className="flex flex-col gap-4">

        {/* {invoices.map((inv) =>  */}


        {invoices
  .filter((inv) => {
    if (filter.length === 0) return true;
    return filter.includes(inv.status);
  })
  .map((inv) => (
          <InvoiceCard key={inv.id} invoice={inv} />
        ))}






      </div>

    </Container>
  );
}