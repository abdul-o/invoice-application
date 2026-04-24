export default function Button({ children, variant = "primary", ...props }) {
  const base = "px-0 py-2 rounded-full text-sm font-semibold transition w-42";

  const variants = {
    primary: "bg-primary text-white hover:bg-primaryLight w-40",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button className={`${base} ${variants[variant]}`} {...props} >
      {children}
    </button>
  );
}