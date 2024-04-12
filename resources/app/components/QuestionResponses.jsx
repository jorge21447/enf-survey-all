import Loader from "./Loader";

const QuestionResponses = ({ formData, questions, createSurvey }) => {
  const isLoading = false;

  return (
    <>
      {createSurvey === true ? (
        <div className="bg-gray-50 dark:bg-gray-900 p-4 md:p-0 w-full sm:py-2 antialiased">
          <div className="mx-auto md:w-5/6 w-full ">
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="flex-1 flex items-center space-x-2">
                  <h2 className="text-2xl font-semibold ">
                    <span className="text-gray-800 dark:text-gray-100">
                      Resultados de la encuesta
                    </span>
                  </h2>
                </div>
              </div>
              <div className="flex justify-center items-center h-[50vh] ">
                <div className=" max-w-md p-6 bg-white dark:bg-gray-700  shadow-md rounded-md">
                  <p className="text-3xl font-bold dark:text-white text-gray-800 mb-4">
                    No hay resultados
                  </p>
                  <p className="text-gray-600 dark:text-gray-200">
                    Lo sentimos, no se encontraron resultados.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : isLoading ? (
        <Loader />
      ) : (
        <div className="bg-gray-50 dark:bg-gray-900 p-4 md:p-0 w-full sm:py-2 antialiased">
          <div className="mx-auto md:w-5/6 w-full ">
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="space-y-6">
                {/* Encabezado de la encuesta */}
                <div className="rounded-md bg-white p-6 shadow-md dark:bg-gray-800">
                  <h4 className="text-xl font-semibold dark:text-white">
                    {formData.title}
                  </h4>
                  <p className="text-gray-500 dark:text-gray-300">
                    {formData.description}
                  </p>
                </div>

                {/* Preguntas */}
                {questions.map((question, i) => (
                  <div
                    key={i}
                    className="rounded-md bg-white p-6 shadow-md dark:bg-gray-800"
                  >
                    {/* Título y descripción de la pregunta */}
                    <div className="space-y-2">
                      <h4 className="text-xl font-semibold dark:text-white">
                        {question.questionTitle}
                      </h4>
                      <p className="text-gray-500 dark:text-gray-300">
                        {question.questionDescription}
                      </p>
                    </div>

                    {/* Lista de respondentes */}
                    <div className="ml-8 mt-3">
                      {question.respondents.map((respondent, j) => (
                        <div
                          key={j}
                          className="justify-between space-y-2 p-3 odd:bg-slate-50 lg:flex lg:space-y-0 lg:space-x-2 dark:bg-gray-700 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                          <div className="flex items-center space-x-2">
                            {/* Información del respondente */}
                            <div>
                              <h6 className="break-all text-sm dark:text-white">
                                {respondent.user_name}
                              </h6>
                            </div>
                          </div>
                          {/* Respuesta del respondente */}
                          <p className="dark:text-white">
                            {respondent.response}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Comentarios */}
            <div className="rounded-md bg-white p-6 shadow-md dark:bg-gray-800">
              {/* Title and description */}
              <div className="space-y-2">
                <h4 className="text-xl font-semibold dark:text-white">
                  Comentarios
                </h4>
              </div>
              <div className="ml-8 mt-3">
                {/* Improved condition and JSX structure */}
                {formData.comments.length < 1 ? (
                  <span>No hay comentarios</span>
                ) : (
                  formData.comments.map((comment, k) => (
                    <div
                      key={k}
                      className="justify-between space-y-2 p-3 odd:bg-slate-50 lg:flex lg:space-y-0 lg:space-x-2 dark:bg-gray-700 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      <div className="flex items-center space-x-2">
                        <h6 className="break-all text-sm dark:text-white">
                          {comment}
                        </h6>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuestionResponses;
