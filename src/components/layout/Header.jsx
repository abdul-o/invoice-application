import Button from "../ui/Button";
import FilterDropdown from "../invoice/FilterDropdown";
import { useState } from "react";

export default function Header() {

  const [selected, setSelected] = useState([]);
  return (
    <div className="flex items-center justify-between mb-10">

      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Invoices
        </h1>
        <p className="text-sm text-gray-500">
          No invoices
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Filter */}
        <FilterDropdown selected={selected} setSelected={setSelected} />
        {/* <button className="text-sm font-medium text-gray-700 dark:text-white">
          Filter ▼
        </button> */}

        {/* New Invoice */}
        <Button>
          + New
        </Button>

      </div>

    </div>
  );
}


// export default function Header() {
//   return (
//     <div className="flex items-center justify-between mb-10">

//       <div>
//         <h1 className="text-2xl font-bold text-black">
//           Invoices
//         </h1>
//         <p className="text-sm text-gray-500">
//           No invoices
//         </p>
//       </div>

//       <div>
//         <button className="bg-blue-500 text-white px-4 py-2">
//           Test Button
//         </button>
//       </div>

//     </div>
//   );
// }