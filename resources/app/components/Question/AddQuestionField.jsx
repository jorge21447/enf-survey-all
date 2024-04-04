import { useState, useRef, useEffect } from "react";
import {
  MdOutlineCheckBox,
  MdRadioButtonChecked,
  MdOutlineShortText,
} from "react-icons/md";
import { BsTextParagraph } from "react-icons/bs";
import { TbSquareRoundedNumber5 } from "react-icons/tb";
import { RxComponentBoolean } from "react-icons/rx";

const AddQuestionField = ({ addInputType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const trigger = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !trigger.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscapePress = (event) => {
      if (event.keyCode === 27) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapePress);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapePress);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const menuActions = [
    {
      icon: <MdOutlineShortText />,
      text: "Respuesta Corta",
      onClick: () => addInputType("text"),
    },
    {
      icon: <BsTextParagraph />,
      text: "Respuesta Larga",
      onClick: () => addInputType("textarea"),
    },
    {
      icon: <MdRadioButtonChecked />,
      text: "Opción multiple",
      onClick: () => addInputType("radio"),
    },
    {
      icon: <MdOutlineCheckBox />,
      text: "Selección",
      onClick: () => addInputType("checkbox"),
    },
    {
      icon: <TbSquareRoundedNumber5 />,
      text: "Escala",
      onClick: () => addInputType("rating"),
    },
    {
      icon: <RxComponentBoolean />,
      text: "Boolean Si/No",
      onClick: () => addInputType("boolean"),
    },
  ];

  return (
    <div className="relative inline-block text-left">
      <button
        id="dropdownMenuIconHorizontalButton"
        ref={trigger}
        onClick={toggleDropdown}
        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        type="button"
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 3"
        >
          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
        </svg>
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 bottom-full z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {menuActions.map((actionM, index) => (
              <li key={index}>
                <button
                  className=" w-full px-4 py-2 text-left flex items-center hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white focus:outline-none"
                  onClick={actionM.onClick}
                >
                  <span className="mr-2">{actionM.icon}</span>
                  {actionM.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddQuestionField;
