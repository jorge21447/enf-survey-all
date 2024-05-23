import { FiClock } from "react-icons/fi";
import { IoBarChartSharp } from "react-icons/io5";
import { IoShareSocialSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useSurvey from "../hooks/useSurvey";

const SurveyCard = ({ data }) => {
  const { userSurvey, roles, changeStateModalShareSurvey, setSurveySelected } =
    useSurvey();
  const navigate = useNavigate();
  const { title, description, finish_date, typeSurvey } = data; // Desestructuracion

  return (
    <div className="w-[370px] p-4">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl overflow-hidden flex flex-col justify-between h-[23rem]">
        <div className="p-4 border-b border-gray-200  dark:border-gray-600">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span
                className={`px-4 py-1 rounded-xl  font-medium text-sm ${
                  typeSurvey === "open"
                    ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-white"
                    : "bg-red-100 text-red-700 dark:bg-red-700 dark:text-white"
                }`}
              >
                {typeSurvey === "open" ? "Abierto" : "Cerrado"}
              </span>
              <span
                className={`${
                  typeSurvey === "open" ? "text-green-500" : "text-red-500"
                } pl-3`}
              >
                <FiClock />
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="gap-1 py-2 px-3 flex items-center text-sm font-medium text-center text-white 
                          bg-cyan-800 rounded-lg hover:bg-cyan-900 focus:ring-2 focus:outline-none focus:ring-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                onClick={() => {
                  navigate(
                    `/${roles[userSurvey.role.name]}/reports/${data.id}`
                  );
                }}
              >
                <IoBarChartSharp />
              </button>
              <button
                type="button"
                className="gap-1 py-2 px-3 flex items-center text-sm font-medium text-center text-white 
                          bg-green-500 rounded-lg hover:bg-green-600 focus:ring-2 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-500 dark:focus:ring-green-600"
                onClick={() => {
                  setSurveySelected(data?.id);
                  changeStateModalShareSurvey();
                }}
              >
                <IoShareSocialSharp />
              </button>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold line-clamp-2 text-black dark:text-white overflow-hidden">
            {title}
          </h2>
          <p className="mt-2 text-gray-600 line-clamp-2 overflow-hidden  dark:text-white">
            {description}
          </p>

          <div className="mt-4 text-black dark:text-white">
            <p>Fecha Cierre: {finish_date ? finish_date : "No Establecido"}</p>
            <p>Número de Preguntas: {data.sections[0].questions.length}</p>
            <p>Respuestas: {data?.responses?.length > 0 ? data?.responses?.length/data?.sections[0]?.questions?.length :0}</p>
          </div>
        </div>
        <div className="p-4 flex justify-center border-t border-gray-200  dark:border-gray-600">
          <button
            className="bg-white text-black dark:text-white w-full uppercase rounded-2xl hover:bg-gray-950 hover:text-white  font-medium py-2 px-4 shadow-sm dark:bg-gray-600 dark:hover:bg-gray-700"
            onClick={() => {
              navigate(
                `/${roles[userSurvey.role.name]}/surveysList/fill/${data.id}`
              );
            }}
          >
            Responder
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyCard;
