import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Loader from "../components/Loader";
import { FaPlus } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import { IoReturnUpBackOutline } from "react-icons/io5";
import HeadForm from "./HeadForm";
import Question from "./Question/Question";
import AddQuestionField from "./Question/AddQuestionField";
import { useNavigate } from "react-router-dom";


const QuestionsTab = ({
  formData,
  questions,
  action,
  colors,
  colorSS,
  onHeadFormInputChange,
  hasEditAccess,
  onDragEnd,
  submitSurvey,
  viewSurvey,
  editSurvey,
}) => {

  

  const navigate = useNavigate();

  const handleReturn = (e) => {
    e.preventDefault();

    navigate("/admin/surveys/");
  };

  const handleSubmitSurvey = async (e) => {
    e.preventDefault();
    if (viewSurvey) {
      console.log(questions);
      // const resultado = await submitSurvey({
      //   ...formData,
      //   questions: [...questions],
      //   typeSurvey: "open",
      //   style_survey: colorSS,
      // });
      // if (resultado) {
      //   navigate("/admin/surveys");
      // }
    } else {
      console.log(questions);
      // const resultado = await editSurvey({
      //   ...formData,
      //   questions: [...questions],
      // });
      // if (resultado) {
      //   navigate("/admin/surveys");
      // }
    }
  };

  const questionsUI = () => {
    return questions.map((ques, i) =>
      viewSurvey ? (
        <div key={i}>
          <div className="mb-4">
            <div className="w-full flex justify-center m-5 mb-2 text-center"></div>
            <div className="mb-4">
              <Question
                action={action}
                currentIndex={i}
                data={ques}
                hasEditAccess={hasEditAccess}
                colors={colors}
                colorSS={colorSS}
                onChanges={() => {
                  action.handleExpand(i);
                }}
                expanded={questions[i].open}
              />
            </div>
          </div>
        </div>
      ) : (
        <Draggable key={i} draggableId={i + "id"} index={i}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <div>
                <div className="mb-4">
                  <div className="w-full flex justify-center m-5 mb-2 text-center"></div>
                  <div className="mb-4">
                    <Question
                      action={action}
                      currentIndex={i}
                      data={ques}
                      hasEditAccess={hasEditAccess}
                      colors={colors}
                      colorSS={colorSS}
                      onChanges={() => {
                        action.handleExpand(i);
                      }}
                      expanded={questions[i].open}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </Draggable>
      )
    );
  };

  return (
    <div className=" w-full dark:dark:bg-gray-900 bg-slate-50 ">
      <div className="mx-auto w-full md:w-5/6  dark:dark:bg-gray-800">
        <div className="w-full flex flex-col justify-center">
          <div className="">
            <HeadForm
              hasEditAccess={hasEditAccess}
              title={formData.title}
              description={formData.description}
              onInputChange={onHeadFormInputChange}
              colors={colors}
              colorSS={colorSS}
            />
          </div>

          <div className="pt-2">
            {viewSurvey ? (
              <div className="mb-10">{questionsUI()}</div>
            ) : (
              <>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="droppable">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="mb-10"
                      >
                        {questionsUI()}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
                <div className="w-full flex shadow-2xl justify-between items-center border bg-white border-slate-100 rounded-2xl mt-15 mb-7 pb-30 py-1">
                  <div className="w-11/12">
                    <button
                      className="flex rounded-2xl items-center justify-center w-full px-4 ml-1 py-3 bg-blue-white font-bold text-teal-500 text-xl transition-all duration-300 ease-in-out hover:bg-slate-200  focus:outline-none "
                      onClick={action.addMoreQuestionField}
                    >
                      <FaPlus className="mr-2" /> Añadir Pregunta
                    </button>
                  </div>
                  <div className="w-1/12 flex mx-auto justify-center">
                    <AddQuestionField
                      addInputType={(inputType) =>
                        action.addInputType(inputType)
                      }
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionsTab;
