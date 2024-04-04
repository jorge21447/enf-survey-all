const RatingInput = ({
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
      <div className="flex flex-col mx-auto col-auto md:w-3/4 space-y-4 text-black">
        <div className="flex w-full items-center justify-between ">
          {options.map((label, index) => (
            <div
              key={index}
              className="flex flex-col w-1/5 items-center justify-center"
            >
              <span className="text-xs  font-extralight md:font-normal md:text-sm text-center text-gray-500">
                {label}
              </span>
            </div>
          ))}
        </div>
        <div className="flex  items-center  justify-around">
          {options.map((label, index) => (
            <div
              key={index}
              className="flex flex-col  items-center justify-center group"

            >
              <input
                id={name+index}
                name={name}
                type="radio"
                value={label}
                onChange={setResponse}
                disabled={hasEditAccess}
                className="peer hidden"
                checked={label === value}
                //checked={index+1 === value}
              />
              <label
                className="flex items-center justify-center border border-gray-200  w-12 h-12 rounded-full bg-white  text-black cursor-pointer transition-colors  peer-checked:bg-teal-400 peer-checked:dark:bg-teal-600 peer-hover:bg-teal-200 peer-checked:text-white peer-hover:text-teal-800 peer-hover:border-teal-800 peer-hover:transition-colors peer-disabled:bg-white peer-disabled:text-black"
                htmlFor={name+index}
              >
                {index + 1}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RatingInput;
