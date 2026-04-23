import Container from "../components/layout/Container";
import Header from "../components/layout/Header";
import InvoiceCard from "../components/invoice/InvoiceCard";
import { useState } from "react";

export default function Home() {
  const [filter, setFilter] = useState([]);
  const invoices = [
    {
      id: "RT3080",
      dueDate: "19 Aug 2021",
      clientName: "Jensen Huang",
      amount: "1,800.90",
      status: "Paid",
    },
    {
      id: "XM9141",
      dueDate: "20 Sep 2021",
      clientName: "Alex Grim",
      amount: "556.00",
      status: "Pending",
    },
    {
      id: "RG0314",
      dueDate: "01 Oct 2021",
      clientName: "John Morrison",
      amount: "14,002.33",
      status: "Paid",
    },
  ];

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