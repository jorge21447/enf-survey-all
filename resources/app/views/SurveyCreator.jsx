import { useEffect, useState } from "react";
import QuestionsTab from "../components/QuestionsTab";
import useSurvey from "../hooks/useSurvey";
import { useNavigate } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import { IoReturnUpBackOutline } from "react-icons/io5";
import QuestionConfiguration from "../components/QuestionConfiguration";
import QuestionResponses from "../components/QuestionResponses";

const SurveyCreator = () => {
  const {
    questions,
    action,
    formData,
    onHeadFormInputChange,
    hasEditAccess,
    colorSS,
    colors,
    loadingFormData,
    onDragEnd,
    submitSurvey,
    editSurvey,
  } = useSurvey();

  const [activeTab, setActiveTab] = useState(0);
  const [createSurvey, setCreateSurvey] = useState(true);
  const [dateFinish, setDateFinish] = useState("");
  const [style_survey, setStyle_survey] = useState(colorSS || "default");
  const [typeSurvey, setTypeSurvey] = useState("open");
  const [usersAssignment, setUsersAssignment] = useState([]);
  const [has_certificate, setHas_certificate] = useState(0);

  
  const tabs = [
    { content: "Diseñador" },
    { content: "Configuración" },
    { content: "Respuestas" },
  ];

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const navigate = useNavigate();

  const handleReturn = (e) => {
    e.preventDefault();

    navigate("/admin/surveys/");
  };

  const handleSubmitSurvey = async (e) => {
    e.preventDefault();
    if (createSurvey) {
      const resultado = await submitSurvey({
        ...formData,
        questions: [...questions],
        typeSurvey: typeSurvey,
        style_survey: setStyle_survey,
        finish_date: dateFinish,
        has_certificate: has_certificate
      });
      if (resultado) {
        navigate("/admin/surveys");
      }
    } else {
      const resultado = await editSurvey({
        ...formData,
        questions: [...questions],
      });
      if (resultado) {
        navigate("/admin/surveys");
      }
    }
  };

  console.log(typeSurvey, style_survey, dateFinish, usersAssignment);

  return (
    <>
      <div className="flex items-center justify-between flex-col md:flex-row  h-full mx-auto w-full md:w-5/6 bg-slate-50 dark:bg-gray-800  rounded-2xl ">
        <ul className=" flex flex-col md:flex-row justify-between  bg-gray-200 dark:bg-gray-800 rounded-2xl shadow">
          {tabs.map((tab, index) => (
            <li
              key={index}
              className={` z-20 p-3 flex  items-center justify-center rounded-xl h-10 w-screen md:w-40 cursor-pointer ${
                index === activeTab ? "bg-teal-500 text-white" : "text-gray-500"
              }`}
              onClick={() => handleTabClick(index)}
            >
              {tab.content}
            </li>
          ))}
          <span
            className="indicator z-10 absolute  hidden md:block bg-teal-500 h-10 w-40 rounded-full transition-transform duration-200"
            style={{ transform: `translateX(${activeTab * 100}%)` }}
          ></span>
        </ul>
        <div className="flex justify-end">
          <div className="flex space-x-6">
            <button
              className="flex rounded-xl items-center px-6 py-2 border-2 hover:bg-slate-800 hover:text-white hover:transition-all border-slate-600 bg-white text-black font-semibold my-5 "
              onClick={handleReturn}
            >
              Regresar <IoReturnUpBackOutline className="ml-2" />
            </button>
            <button
              className="flex rounded-xl items-center px-6 py-2 hover:bg-blue-800 hover:transition-all bg-blue-700 text-white font-semibold my-5 "
              onClick={handleSubmitSurvey}
            >
              Guardar <FaSave className="ml-2" />
            </button>
          </div>
        </div>
      </div>
      <div className="">
        {activeTab === 0 && (
          <>
            <QuestionsTab
              formData={formData}
              questions={questions}
              action={action}
              colors={colors}
              colorSS={colorSS}
              onHeadFormInputChange={onHeadFormInputChange}
              hasEditAccess={hasEditAccess}
              onDragEnd={onDragEnd}
              submitSurvey={submitSurvey}
              viewSurvey={false}
              editSurvey={editSurvey}
            />
          </>
        )}
        {activeTab === 1 && (
          <>
            <QuestionConfiguration
              dateFinish={dateFinish}
              style_survey={style_survey}
              typeSurvey={typeSurvey}
              setDateFinish={setDateFinish}
              setStyle_survey={setStyle_survey}
              setTypeSurvey={setTypeSurvey}
              usersAssignment={usersAssignment}
              setUsersAssignment={setUsersAssignment}
              has_certificate={has_certificate}
              setHas_certificate={setHas_certificate}
            />
          </>
        )}
        {activeTab === 2 && (
          <>
            <QuestionResponses createSurvey={createSurvey}/>
          </>
        )}
      </div>
    </>
  );
};

export default SurveyCreator;
