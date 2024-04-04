export default function Alerta({ children }) {
  return (
    <div className="bg-gradient-to-r from-pink-500 to-red-600 rounded-xl text-center my-2  text-white font-medium p-3 uppercase text-sm">
      {children}
    </div>
  );
}
