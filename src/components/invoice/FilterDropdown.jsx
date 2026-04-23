import { useState } from "react";

export default function FilterDropdown({ selected, setSelected }) {
  const [open, setOpen] = useState(false);

  const options = ["Draft", "Pending", "Paid"];

  function toggleOption(option) {
    if (selected.includes(option)) {
      setSelected(selected.filter((o) => o !== option));
    } else {
      setSelected([...selected, option]);
    }
  }

  return (
    <div className="relative">

      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="text-sm font-medium text-gray-700 dark:text-white"
      >
        Filter ▼
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 bg-white dark:bg-[#1E2139] shadow-lg rounded-lg p-4 w-40 z-10">

          {options.map((option) => (
            <label key={option} className="flex items-center gap-2 mb-2 cursor-pointer">

              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
              />

              <span className="text-sm dark:text-white">
                {option}
              </span>

            </label>
          ))}

        </div>
      )}
    </div>
  );
}