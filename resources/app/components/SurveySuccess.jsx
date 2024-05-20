import React from "react";
import { Link } from "react-router-dom";
import useSurvey from "../hooks/useSurvey";
import { FaCircleCheck } from "react-icons/fa6";
const SurveySuccess = () => {
  const { userSurvey, roles } = useSurvey();
  return (
    <div className="bg-white rounded-xl dark:bg-slate-800 text-gray-800 dark:text-white flex flex-col items-center justify-center min-h-screen">
      <div className=" text-green-600 ">
        <FaCircleCheck size={120}/>
      </div>
      <div className="text-3xl font-bold mt-8 text-center">
        ¡Gracias por responder la encuesta!
      </div>
      <div className="mt-4 text-lg text-center">Tu respuesta ha sido registrada.</div>
      <Link
        className=" transition duration-300  ease-in-out transform hover:scale-105  p-3 px-6  bg-white text-gray-700 hover:bg-gray-800 hover:text-white dark:bg-transparent dark:border-gray-200 border-2 dark:text-gray-200 dark:hover:bg-gray-50 rounded-full  focus:outline-none focus:ring-2 dark:hover:text-gray-800 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 
                        md:mt-4 mt-6"
        to={`/${roles[userSurvey.role.name]}/surveysList`}
      >
        Volver al Inicio
      </Link>
    </div>
  );
};

export default SurveySuccess;
