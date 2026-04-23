import Sidebar from "./Sidebar";

export default function Container({ children }) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#141625] flex">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex justify-center">
        <div className="w-full max-w-5xl p-6 md:p-10">
          {children}
        </div>
      </main>

    </div>
  );
}