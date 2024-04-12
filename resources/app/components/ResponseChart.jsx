import React, { useState } from "react";
import { Bar, Pie, Doughnut, PolarArea, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const ResponseChart = ({ formData, questions }) => {
  const [chartTypes, setChartTypes] = useState({}); // Estado para los tipos de gráfico por pregunta

  // Función para cambiar el tipo de gráfico de una pregunta
  const handleChangeChartType = (questionIndex, type) => {
    setChartTypes({
      ...chartTypes,
      [questionIndex]: type,
    });
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };
  const generateChartData = (question) => {
    const labels = question.options;
    const data = (question.respondents || []).reduce((acc, resp) => {
      const index = labels.indexOf(resp.response);
      acc[index] = (acc[index] || 0) + 1;
      return acc;
    }, []);

    return {
      labels,
      datasets: [
        {
          label: "Respuestas",
          data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
        },
      ],
    };
  };

  // Renderizar el gráfico según el tipo seleccionado para una pregunta
  const renderChart = (data, questionIndex) => {
    const chartType = chartTypes[questionIndex] || "bar"; // Obtener el tipo de gráfico para la pregunta

    switch (chartType) {
      case "pie":
        return <Pie data={data} />;
      case "doughnut":
        return <Doughnut data={data} />;
      case "polarArea":
        return <PolarArea data={data} />;
      case "line":
        return <Line data={data} />;
      default:
        return <Bar data={data} />;
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-4 md:p-0 w-full sm:py-2 antialiased">
      <div className="mx-auto md:w-5/6 w-full">
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

            {/* Preguntas y gráficos */}
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
                </div>

                {question.type == "text" || question.type == "textarea" ? (
                  <>
                    {/* Lista de respondentes */}
                    <div className="ml-8 mt-3">
                      {question.respondents.map((respondent, j) => (
                        <div
                          key={j}
                          className="justify-between space-y-2 p-3 odd:bg-slate-50 lg:flex lg:space-y-0 lg:space-x-2 dark:bg-gray-700 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                          <div className="flex items-center space-x-2">
                            <div>
                              <h6 className="break-all text-sm dark:text-white">
                                {respondent.response}
                              </h6>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-4">
                      <label
                        htmlFor={`chartType${i}`}
                        className="text-gray-700 dark:text-gray-300"
                      >
                        Tipo de Gráfico:
                      </label>
                      <select
                        id={`chartType${i}`}
                        className="p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded"
                        onChange={(e) =>
                          handleChangeChartType(i, e.target.value)
                        }
                        value={chartTypes[i] || "bar"}
                      >
                        <option value="bar">Barra</option>
                        <option value="pie">Pastel</option>
                        <option value="doughnut">Rosquilla</option>
                        <option value="polarArea">Área polar</option>
                        <option value="line">Línea</option>
                      </select>
                    </div>
                    {/* Renderizar el gráfico */}
                    <div className="flex relative md:w-1/2 h-1/2 md:h-1/2 mx-auto">
                      {renderChart(generateChartData(question, i), i)}
                    </div>
                  </>
                  // <div className=" flex relative  md:w-1/2 h-1/2 md:h-1/2  mx-auto ">
                  //   <Bar data={generateChartData(question) }  />
                  // </div>
                )}
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
  );
};

export default ResponseChart;
