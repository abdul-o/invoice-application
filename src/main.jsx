
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { InvoiceProvider } from "./context/InvoiceContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <InvoiceProvider>
        <App />
      </InvoiceProvider>
    </BrowserRouter>
  </React.StrictMode>
);







// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { InvoiceProvider } from "./context/InvoiceContext";


// createRoot(document.getElementById('root')).render(

//   <InvoiceProvider>
//   <App />
// </InvoiceProvider>
// )


// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );