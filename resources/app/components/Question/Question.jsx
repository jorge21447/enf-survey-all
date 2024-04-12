import { useRef, useEffect, useState } from "react";
import MenuQuestion from "./MenuQuestion";
import TextInput from "./TextInput";
import { MdOutlineDragIndicator } from "react-icons/md";
import { FaEyeSlash, FaCopy, FaTrashAlt, FaEllipsisH } from "react-icons/fa";
import TextAreaInput from "./TextAreaInput";
import RadioInput from "./RadioInput";
import RatingInput from "./RatingInput";
import CheckboxInput from "./CheckboxInput";
import BooleanInput from "./BooleanInput";
import useSurvey from "../../hooks/useSurvey";

const Question = ({
  action,
  currentIndex,
  data,
  hasEditAccess,
  colors,
  colorSS,
  onChanges,
  expanded = false,
}) => {
  const { userSurvey } = useSurvey();

  const textareaRef = useRef(null);
  const { background, text, border } = colors[colorSS];
  const [isInputFocused, setIsInputFocused] = useState(false);

  const respondent = data.respondents.find(
    (el) => el.user_id === userSurvey.id
  );
  const responseValue = hasEditAccess ? "" : respondent?.response ?? "";

  useEffect(() => {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  }, [data.questionTitle]);

  useEffect(() => {
    const adjustHeight = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height =
          textareaRef.current.scrollHeight + "px";
      }
    };

    const handleResize = () => {
      adjustHeight();
    };

    window.addEventListener("resize", handleResize);
    adjustHeight(); // Ajustar la altura inicial
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`${
        isInputFocused ? "ring-teal-300 ring-4 " : ""
      } rounded-3xl border-l-[40px] bg-white  text-${text} px-6 pb-4 shadow ${border} shadow dark:bg-gray-500`}
    >
      {hasEditAccess ? (
        <div className="pt-2 flex justify-center text-black">
          <MdOutlineDragIndicator className="rotate-90 text-sm" />
        </div>
      ) : (
        ""
      )}

      <div className="flex items-start  pt-2 pb-4" onClick={onChanges}>
        {/* Titulo de las questions  */}
        <span className="text-black text-lg  font-mont py-3 font-semibold">
          {currentIndex + 1}.{" "}
        </span>
        <textarea
          className={`resize-none w-full h-auto disabled:hover:ring-0 hover:ring-1 font-semibold font-mont hover:ring-slate-300 py-3 text-lg outline-none  placeholder-slate-300 text-black dark:text-gray-300  focus:outline-none focus:ring-teal-300 focus:ring-2  rounded-lg p-2`}
          ref={textareaRef}
          disabled={!hasEditAccess}
          name="title"
          onChange={(e) =>
            action.onTitleQuestionChange(e.target.value, currentIndex)
          }
          placeholder="Título"
          value={data.questionTitle}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          rows={1}
        ></textarea>
        {!data.required && (
          <span className="top-0 left-1  text-red-500 text-lg  font-mont py-3 font-semibold">
            *
          </span>
        )}
      </div>

      {/*Aqui estan los tipos de inputs  */}
      {data.type === "text" && (
        <TextInput
          hasEditAccess={hasEditAccess}
          setResponse={(e) =>
            action.responseQuestion(currentIndex, e.target.value)
          }
          value={responseValue}
        />
      )}

      {data.type === "textarea" && (
        <TextAreaInput
          hasEditAccess={hasEditAccess}
          setResponse={(e) =>
            action.responseQuestion(currentIndex, e.target.value)
          }
          value={responseValue}
        />
      )}

      {data.type === "radio" && (
        <RadioInput
          addOption={() => action.addOption(currentIndex)}
          hasEditAccess={hasEditAccess}
          name={"radio" + currentIndex}
          options={data.options}
          removeOption={(optionIndex) =>
            action.removeOption(currentIndex, optionIndex)
          }
          setOptionName={(optionIndex, value) =>
            action.setOptionName(currentIndex, optionIndex, value)
          }
          setResponse={(e) =>
            action.responseQuestion(currentIndex, e.target.value)
          }
          value={responseValue}
        />
      )}

      {data.type === "rating" && (
        <RatingInput
          addOption={() => action.addOption(currentIndex)}
          hasEditAccess={hasEditAccess}
          name={"rating" + currentIndex}
          options={data.options}
          removeOption={(optionIndex) =>
            action.removeOption(currentIndex, optionIndex)
          }
          setOptionName={(optionIndex, value) =>
            action.setOptionName(currentIndex, optionIndex, value)
          }
          setResponse={(e) =>
            action.responseQuestion(currentIndex, e.target.value)
          }
          value={responseValue}
        />
      )}

      {data.type === "boolean" && (
        <BooleanInput
          addOption={() => action.addOption(currentIndex)}
          hasEditAccess={hasEditAccess}
          name={"boolean" + currentIndex}
          options={data.options}
          removeOption={(optionIndex) =>
            action.removeOption(currentIndex, optionIndex)
          }
          setOptionName={(optionIndex, value) =>
            action.setOptionName(currentIndex, optionIndex, value)
          }
          setResponse={(e) =>
            action.responseQuestion(currentIndex, e.target.value)
          }
          value={responseValue}
        />
      )}

      {data.type === "checkbox" && (
        <CheckboxInput
          addOption={() => action.addOption(currentIndex)}
          hasEditAccess={hasEditAccess}
          options={data.options}
          removeOption={(optionIndex) =>
            action.removeOption(currentIndex, optionIndex)
          }
          setOptionName={(optionIndex, value) =>
            action.setOptionName(currentIndex, optionIndex, value)
          }
          setResponse={(value) => action.responseQuestion(currentIndex, value)}
          value={responseValue.length ? responseValue.split(", ") : []}
        />
      )}

      {/* Para una linea antes de los iconos */}
      {/* <hr className=" border-gray-300" /> */}

      {hasEditAccess && (
        <div
          className="flex items-center text-black justify-end 
        pt-4 space-x-4 "
        >
          {expanded && (
            <>
              <button
                aria-label="View"
                onClick={() => {
                  action.showAsQuestion(currentIndex);
                }}
                className="rounded-full p-2 hover:bg-gray-200 focus:outline-none"
              >
                <FaEyeSlash />
              </button>
              <button
                aria-label="Copy"
                onClick={() => {
                  action.duplicateQuestion(currentIndex, currentIndex + 1);
                }}
                className="rounded-full p-2 hover:bg-gray-200 focus:outline-none"
              >
                <FaCopy />
              </button>
              <button
                aria-label="Delete"
                onClick={() => {
                  action.deleteQuestion(currentIndex);
                }}
                className="rounded-full p-2 hover:bg-gray-200 focus:outline-none"
              >
                <FaTrashAlt />
              </button>
              <MenuQuestion
                changeQuestionType={(inputType) =>
                  action.changeQuestionType(currentIndex, inputType)
                }
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Question;
