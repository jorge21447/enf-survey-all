import { FiPlus } from "react-icons/fi";

const RadioInput = ({
  options,
  hasEditAccess,
  name,
  addOption,
  removeOption,
  setOptionName,
  setResponse,
  value,
}) => {
  return (
    <>
      {options.map((el, idx) => (
        <div
          key={idx}
          className="w-full group relative flex items-center space-x-3 pb-1"
        >
          <input
            checked={el === value}
            className="h-5 w-5"
            disabled={hasEditAccess}
            name={name}
            onChange={setResponse}
            type="radio"
            value={el}
          />
          <input
            className="w-11/12 disabled:hover:border-none 
          disabled:hover:ring-0 hover:ring-1  font-mont hover:ring-slate-300  outline-none  placeholder-slate-300 text-black   focus:outline-none focus:ring-teal-300 focus:ring-2 focus:border-none rounded-lg p-2 "
            disabled={!hasEditAccess}
            onChange={(e) => setOptionName(idx, e.target.value)}
            placeholder={`Opción ${idx + 1}`}
            value={el ? el : ""}
            name={name+'T'+idx}
          />
          {hasEditAccess && options.length > 1 && (
            <button
              className="text-3xl flex cursor-pointer items-center justify-end opacity-0 duration-300 group-hover:opacity-100 text-black group-hover:rounded-full group-hover:bg-gray-100"
              onClick={() => removeOption(idx)}
              type="button"
            >
              <FiPlus className=" rotate-45 transform" />
            </button>
          )}
        </div>
      ))}
      {hasEditAccess && (
        <div className="flex items-center space-x-3">
          <input className="h-5 w-5" disabled type="radio" name={name+'A'}/>
          <button
            className="border-b border-white bg-white py-2 text-gray-400 hover:border-gray-300 focus:border-b-2 focus:border-purple-700"
            onClick={addOption}
            type="button"
          >
            Agregar opciones
          </button>
        </div>
      )}
    </>
  );
};

export default RadioInput;
