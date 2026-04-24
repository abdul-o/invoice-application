import { useState, useEffect } from "react";
import logo from "../../assets/logo.png"
import image from "../../assets/image.png"
import darkmode from "../../assets/darkmode.png"

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
    <aside
      className="
        fixed top-0 left-0 z-50
        w-full h-16
        flex flex-row justify-between items-center px-6
        bg-[#1E2139]
        md:static md:w-24 md:h-screen md:flex-col md:py-6
      "
    >
      {/* LOGO */}
      <div className="m-0 w-20 flex justify-center h-16 bg-gradient-to-tr from-purple-500 to-purple-300 rounded-xl">
        <img className="w-4 " src={logo} alt="logo" />
      </div>

      {/* RIGHT SIDE (mobile) / BOTTOM (desktop) */}
      <div className="flex items-center gap-6 md:flex-col">

        {/* THEME TOGGLE */}
        <button onClick={toggleTheme} className="text-white text-xl">
          {dark ? "☀️" : <img src={darkmode} />     }
        </button>

        {/* AVATAR */}
        <div className="w-10 h-10 bg-gray-400 rounded-full">
          <img src={image} alt="" />
        </div>

      </div>
    </aside>
  );
}