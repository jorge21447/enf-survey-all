import QuestionsTab from "../components/QuestionsTab";
import useSurvey from "../hooks/useSurvey";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { BsFillSendFill } from "react-icons/bs";
import { RiDeleteBin2Fill } from "react-icons/ri";
import SurveyError from "../components/SurveyError";
import CommentInput from "../components/CommentInput";

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
    roles,
  } = useSurvey();

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const { background, text, border } = colors[colorSS];

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

    navigate(`/${roles[userSurvey.role.name]}/surveysList`);
  };
  const handleComment = (e) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const handleSubmitSurvey = async (e) => {
    e.preventDefault();

    const resultado = await submitSurveyResponses({
      ...formData,
      questions: [...questions],
      assigned_roles: formData.assigned_roles
        ? formData.assigned_roles[0]
        : null,
      comment: comment
    });
    if (resultado) {
      navigate(`/${roles[userSurvey.role.name]}/surveysList`);
    }
  };
  if (
    !isLoading &&
    formData.typeSurvey == "closed" &&
    formData.assigned_roles[0] != userSurvey.role_id
  ) {
    return <SurveyError />;
  }
  if (!isLoading && formData.finish_date != null) {
    const currentDate = new Date();
    const finishDate = new Date(formData.finish_date);
    if (currentDate > finishDate) {
      return <SurveyError />;
    }
  }

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

          <div className=" w-full dark:dark:bg-gray-900 bg-slate-50 ">
            <div className="mx-auto w-full md:w-5/6  dark:dark:bg-gray-800">
              <div className="w-full flex flex-col justify-center">
                <div className="mb-4">
                  <div
                    className={`
                      rounded-3xl border-l-[40px] bg-white  text- px-6 pb-4 shadow ${border} shadow dark:bg-gray-500`}
                  >
                    <div className="mb-2">
                      <h3 className="font-semibold font-mont p-2  pt-6 pb-4">
                        Escribe tu Comentario/Recomendación <span className="text-red-500">*</span>
                      </h3>
                      <CommentInput
                        handleComment={handleComment}
                        comment={comment}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                onClick={() => action.clearUserResponses(userSurvey.id)}
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
