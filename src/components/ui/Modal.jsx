export default function Modal({ children, isOpen }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        {children}
      </div>
    </div>
  );
}