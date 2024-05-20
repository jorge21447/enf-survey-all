import { FiClock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useSurvey from "../hooks/useSurvey";
import { FaCalendarAlt } from "react-icons/fa";

const CertificatesCard = ({ data }) => {
  const { userSurvey, roles } = useSurvey();
  const navigate = useNavigate();
  const { title, description, typeSurvey } = data.survey; // Desestructuracion
  return (
    <div className="w-[370px] p-4">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl overflow-hidden flex 
      flex-col justify-between h-[18rem]">
        <div className="p-4 border-b border-gray-200  dark:border-gray-600">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span
                className={`px-4 py-1 rounded-xl  font-medium text-sm bg-indigo-500 text-white `}
              >
                { new Date(data.created_at).toISOString().slice(0, 10)}
              </span>
              <span
                className={` text-indigo-800
                 pl-3`}
              >
                <FaCalendarAlt  />
              </span>
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
        </div>
        <div className="p-4 flex justify-center border-t border-gray-200  dark:border-gray-600">
          <button
            className="bg-white text-black dark:text-white w-full uppercase rounded-2xl hover:bg-pink-900 hover:text-white  font-medium py-2 px-4 shadow-sm dark:bg-gray-600 dark:hover:bg-pink-700"
            onClick={() => {
              navigate(
                `/${roles[userSurvey.role.name]}/certificates/${data.id}`
              );
            }}
            disabled={true}
          >
            Obtener en Dirección
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificatesCard;
