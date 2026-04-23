import { useState, useEffect } from "react";

export default function Sidebar() {
  const [dark, setDark] = useState(false);

  // Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  function toggleTheme() {
    if (dark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    setDark(!dark);
  }

  return (
    <aside className="hidden md:flex flex-col justify-between items-center w-24 h-screen bg-[#1E2139] py-6">

      {/* LOGO */}
      <div className="w-12 h-12 bg-purple-500 rounded-xl"></div>

      {/* BOTTOM */}
      <div className="flex flex-col items-center gap-6">

        {/* THEME TOGGLE */}
        <button onClick={toggleTheme} className="text-white text-xl">
          {dark ? "☀️" : "🌙"}
        </button>

        {/* AVATAR */}
        <div className="w-10 h-10 bg-gray-400 rounded-full"></div>

      </div>
    </aside>
  );
}