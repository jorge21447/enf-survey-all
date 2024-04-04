
const TextInput = ({ hasEditAccess, value, setResponse }) => {
  return (
    <>
      <input
        className="disabled:hover:border-none w-full
          disabled:hover:ring-0 hover:ring-1  font-mont hover:ring-slate-300 py-3 outline-none  placeholder-slate-300 text-black   focus:outline-none focus:ring-teal-300 focus:ring-2 focus:border-none rounded-lg p-2"
        disabled={hasEditAccess}
        onChange={setResponse}
        placeholder="Texto de respuesta corta"
        value={value}
      />
    </>
  );
};

export default TextInput;
