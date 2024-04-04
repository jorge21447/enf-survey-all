import QuestionsTab from "../components/QuestionsTab";
import useSurvey from "../hooks/useSurvey";

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import clienteAxios from "../config/axios";
import useSWR from "swr";
import { FaSave } from "react-icons/fa";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { BsFillSendFill } from "react-icons/bs";
import { RiDeleteBin2Fill } from "react-icons/ri";
import useAuth from "../hooks/useAuth";

const SurveyFill = () => {
  const {
    questions,
    action,
    formData,
    onHeadFormInputChange,
    hasEditAccess,
    colorSS,
    colors,
    onDragEnd,
    submitSurvey,
    getSurveyFillID,
    editSurvey,
    submitSurveyResponses,
    userSurvey,
    roles
  } = useSurvey();

  const { user } = useAuth({ middleware: "auth" });

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const surveyID = async (id) => {
      const resultado = await getSurveyFillID(id);
      if (resultado) {
        setIsLoading(false);
      }
    };
    surveyID(id);
  }, [id]);

  const handleReturn = (e) => {
    e.preventDefault();

    navigate(`/${roles[userSurvey.role.name]}/surveys`);
  };

  const handleSubmitSurvey = async (e) => {
    e.preventDefault();

    const resultado = await submitSurveyResponses({
      ...formData,
      questions: [...questions],
    });
    if (resultado) {
      navigate(`/${roles[userSurvey.role.name]}/surveys`);
    }
  };

  console.log(formData)

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <QuestionsTab
            formData={formData}
            questions={questions}
            action={action}
            colors={colors}
            colorSS={colorSS}
            onHeadFormInputChange={onHeadFormInputChange}
            hasEditAccess={false}
            onDragEnd={onDragEnd}
            submitSurvey={submitSurvey}
            createSurvey={false}
            editSurvey={editSurvey}
            viewSurvey={true}
          />

          <div className="flex items-center justify-between flex-col md:flex-row   mx-auto w-full md:w-5/6 bg-slate-50  rounded-2xl dark:bg-gray-800">
            <div className="flex">
              <button
                className="flex rounded-xl items-center px-6 py-2  hover:bg-slate-400 hover:text-white hover:transition-all  bg-slate-200  text-black font-semibold my-5 "
                onClick={handleReturn}
              >
                <IoReturnUpBackOutline className="mr-2" /> Volver
              </button>
            </div>
            <div className="flex space-x-6 justify-end">
              <button
                className="flex rounded-xl items-center px-6 py-2  hover:bg-red-800 hover:text-white hover:transition-all  bg-red-700 text-white font-semibold my-5 "
                onClick={() => action.clearUserResponses(user?.id)}
              >
                <RiDeleteBin2Fill className="mr-2" /> Limpiar
              </button>
              <button
                className="flex rounded-xl items-center px-6 py-2 hover:bg-blue-800 hover:transition-all bg-blue-700 text-white font-semibold my-5 "
                onClick={handleSubmitSurvey}
              >
                <BsFillSendFill className="mr-2" /> Enviar
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SurveyFill;
