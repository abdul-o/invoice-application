import Sidebar from "./Sidebar";

export default function Container({ children }) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#141625] flex">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}

      <main className="flex-1 flex justify-center p-4 md:p-10 max-w-5xl mx-auto mt-16 md:mt-0">
        <div className="w-full max-w-5xl p-6 md:p-10">
          {children}
        </div>
      </main>

    </div>
  );
}