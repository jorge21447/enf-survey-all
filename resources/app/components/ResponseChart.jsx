import { useState, useEffect, useRef } from "react";
import { Bar, Pie, Doughnut, PolarArea, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ResponseChart = ({ formData, questions }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const [chartTypes, setChartTypes] = useState({}); // Estado para los tipos de gráfico por pregunta
  const [visibleResponses, setVisibleResponses] = useState({});
  const [questionsWithStats, setQuestionsWithStats] = useState([]);
  const componentRef = useRef();

  const toggleResponses = (questionId) => {
    setVisibleResponses((prevState) => ({
      ...prevState,
      [questionId]: !prevState[questionId],
    }));
  };

  // Función para cambiar el tipo de gráfico de una pregunta
  const handleChangeChartType = (questionIndex, type) => {
    setChartTypes({
      ...chartTypes,
      [questionIndex]: type,
    });
  };

  const handleReturn = () => {
    navigate(-1);
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? "#ffffff" : "#000000", // Text color
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDarkMode ? "#ffffff" : "#000000", // X-axis text color
        },
        grid: {
          color: isDarkMode ? "#444444" : "#dddddd", // X-axis grid color
        },
      },
      y: {
        ticks: {
          color: isDarkMode ? "#ffffff" : "#000000", // Y-axis text color
        },
        grid: {
          color: isDarkMode ? "#444444" : "#dddddd", // Y-axis grid color
        },
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
            "rgba(255, 99, 132, 0.4)",
            "rgba(54, 162, 235, 0.4)",
            "rgba(255, 206, 86, 0.4)",
            "rgba(75, 192, 192, 0.4)",
            "rgba(135, 102, 255, 0.4)",
            "rgba(98, 255, 40, 0.4)",
            "rgba(12, 255, 255, 0.4)",
            "rgba(255, 102, 255, 0.4)",
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
        return <Pie data={data} options={chartOptions} />;
      case "doughnut":
        return <Doughnut data={data} options={chartOptions} />;
      case "polarArea":
        return <PolarArea data={data} options={chartOptions} />;
      case "line":
        return <Line data={data} options={chartOptions} />;
      default:
        return <Bar data={data} options={chartOptions} />;
    }
  };

  const transformJsonToCsvData = (surveyData) => {
    const headers = surveyData.questions.map(
      (question) => question.questionTitle
    );
    headers.push("Comentarios"); // Añadir el encabezado de comentarios
    const csvData = [];

    surveyData.questions.forEach((question, questionIndex) => {
      question.respondents.forEach((respondent, respondentIndex) => {
        if (!csvData[respondentIndex]) {
          csvData[respondentIndex] = {};
        }
        csvData[respondentIndex][headers[questionIndex]] = respondent.response;
      });
    });
    // Añadir los comentarios a la primera fila del CSV
    if (surveyData.comments) {
      surveyData.comments.forEach((comment, commentIndex) => {
        if (!csvData[commentIndex]) {
          csvData[commentIndex] = {};
        }
        csvData[commentIndex]["Comentarios"] = comment;
      });
    }
    return { csvData, headers };
  };

  const calculateStatisticsForQuestion = (question) => {
    if (["radio", "checkbox", "boolean"].includes(question.type)) {
      const frequencies = question.options.reduce((acc, option) => {
        acc[option] = 0;
        return acc;
      }, {});

      question.respondents.forEach((respondent) => {
        if (frequencies[respondent.response] !== undefined) {
          frequencies[respondent.response] += 1;
        }
      });

      const totalResponses = question.respondents.length;
      const percentages = Object.keys(frequencies).reduce((acc, option) => {
        acc[option] = ((frequencies[option] / totalResponses) * 100).toFixed(2);
        return acc;
      }, {});

      const mostPopular = Object.keys(frequencies).reduce((a, b) => {
        return frequencies[a] > frequencies[b] ? a : b;
      });

      return {
        frequencies,
        percentages,
        mostPopular,
      };
    }

    return null;
  };

  const handleDownloadPdf = async () => {
    const noPrintElements = document.querySelectorAll(".no-print");
    noPrintElements.forEach((el) => el.classList.add("hidden"));

    const divToPrint = componentRef.current;
    window.scrollTo(0, 0);

      const canvas = await html2canvas(divToPrint, {
        scale: 2,
        backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
      });
      canvas.willReadFrequently = true;
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.setFillColor(isDarkMode ? "#1f2937": "#ffffff");
        pdf.rect(0, 0, pdfWidth, pdfHeight, "F");
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save("download.pdf");

      noPrintElements.forEach((el) => el.classList.remove("hidden"));
  };

  useEffect(() => {
    const handleThemeChange = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    handleThemeChange(); // Set initial theme
    window.addEventListener("change", handleThemeChange);

    return () => {
      window.removeEventListener("change", handleThemeChange);
    };
  }, []);

  useEffect(() => {
    if (formData.questions) {
      const updatedQuestions = formData.questions.map((question) => ({
        ...question,
        statistics: calculateStatisticsForQuestion(question),
      }));
      setQuestionsWithStats(updatedQuestions);
    }
  }, [formData]);

  const { csvData, headers } = transformJsonToCsvData(formData);
  return (
    <div className="md:py-6">
      <div className="bg-gray-50 dark:bg-gray-900 p-4 md:p-0 w-full sm:py-2 antialiased">
        <div
          className="mx-auto md:w-5/6 w-full"
          ref={componentRef}
          id="divToPrint"
        >
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="space-y-6">
              <div className="flex-1 flex gap-4 items-center p-6 pb-4">
                <button
                  type="button"
                  className="no-print gap-1 flex items-center justify-center text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-violet-300 font-medium rounded-full text-sm px-2 py-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-violet-800 "
                  onClick={handleReturn}
                >
                  <MdArrowBackIosNew size={20} />
                </button>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {"RESPUESTAS DE LA ENCUESTA"}
                </h3>
              </div>
              {/* Encabezado de la encuesta */}
              <div className="rounded-md bg-white px-4 pb-2 shadow-md dark:bg-gray-800">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 border-t dark:border-gray-700">
                  <div className="w-full md:w-4/5">
                    <h4 className="text-xl font-semibold dark:text-white">
                      {formData.title}
                    </h4>
                    <p className="text-gray-500 dark:text-gray-300">
                      {formData.description}
                    </p>
                  </div>
                  <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 md:items-start justify-end md:space-x-3 flex-shrink-0 self-start">
                    <CSVLink
                      data={csvData}
                      headers={headers}
                      filename={`survey_${formData.id}.csv`}
                      separator=";"
                      className="no-print gap-1 flex items-center justify-center text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:ring-violet-300 font-medium rounded-xl text-sm px-4 py-2 dark:bg-violet-600 dark:hover:bg-violet-700 focus:outline-none dark:focus:ring-violet-800"
                    >
                      Exportar CSV
                    </CSVLink>
                    <button
                      onClick={handleDownloadPdf}
                      className="no-print gap-1 flex items-center justify-center text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-xl text-sm px-4 py-2 dark:bg-teal-600 dark:hover:bg-teal-700 focus:outline-none dark:focus:ring-teal-800"
                    >
                      PDF
                    </button>
                  </div>
                </div>
              </div>

              {/* Preguntas y gráficos */}
              {questionsWithStats.map((question, i) => (
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
                        {(visibleResponses[question.id]
                          ? question.respondents
                          : question.respondents.slice(0, 5)
                        ).map((respondent, j) => (
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
                      {/* Botón de Mostrar Más/Menos */}
                      {question.respondents.length > 5 && (
                        <div className="flex justify-center mt-4">
                          <button
                            onClick={() => toggleResponses(question.id)}
                            className="no-print text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                          >
                            {visibleResponses[question.id] ? (
                              <MdExpandLess size={24} />
                            ) : (
                              <MdExpandMore size={24} />
                            )}
                          </button>
                        </div>
                      )}
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
                      <div className="flex relative md:w-1/2 h-1/2 w-1/2 md:h-1/2 mx-auto my-8">
                        {renderChart(generateChartData(question, i), i)}
                      </div>
                      {question.statistics && (
                        <div className="flex flex-col md:flex-row justify-center md:space-x-6">
                          <div className="mb-4 md:mb-0">
                            <h5 className="text-base font-semibold text-gray-900 dark:text-gray-300 mb-2">
                              Frecuencia de respuestas:
                            </h5>
                            <ul>
                              {Object.entries(
                                question.statistics.frequencies
                              ).map(([option, count]) => (
                                <li
                                  key={option}
                                  className="text-sm text-gray-700 dark:text-gray-200"
                                >
                                  <span className="font-medium">{option}:</span>{" "}
                                  {count}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mb-4 md:mb-0">
                            <h5 className="text-base font-semibold text-gray-900 dark:text-gray-300 mb-2">
                              Porcentajes de respuestas:
                            </h5>
                            <ul>
                              {Object.entries(
                                question.statistics.percentages
                              ).map(([option, percentage]) => (
                                <li
                                  key={option}
                                  className="text-sm text-gray-700 dark:text-gray-200"
                                >
                                  <span className="font-medium">{option}:</span>{" "}
                                  {percentage}%
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h5 className="text-base font-semibold text-gray-900 dark:text-gray-300 mb-2">
                              Respuesta más popular:
                            </h5>
                            <p className="text-sm text-gray-700 dark:text-gray-200">
                              {question.statistics.mostPopular}
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}

              {/* Comentarios */}
              <div className="rounded-md bg-white p-6 shadow-md dark:bg-gray-800">
                {/* Título y descripción */}
                <div className="space-y-2">
                  <h4 className="text-xl font-semibold dark:text-white">
                    Comentarios
                  </h4>
                </div>
                <div className="ml-8 mt-3">
                  {/* Estructura mejorada de condición y JSX */}
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
    </div>
  );
};

export default ResponseChart;
