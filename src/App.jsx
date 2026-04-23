// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import InvoiceDetail from "./pages/InvoiceDetail";

export default function App() {
  return (

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/invoice/:id" element={<InvoiceDetail />} />
      </Routes>

  );
}