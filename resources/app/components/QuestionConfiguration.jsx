import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import UserSurveyStatus from "./UserSurveyStatus";

const QuestionConfiguration = ({
  formData,
  dateFinish,
  style_survey,
  typeSurvey,
  setDateFinish,
  setStyle_survey,
  setTypeSurvey,
  has_certificate,
  setHas_certificate,
  assigned_roles,
  setAssigned_roles,
}) => {
  const navigate = useNavigate();
  const handleAssignedRolesChange = (event) => {
    setAssigned_roles(event.target.value); 
  };

  console.log(dateFinish, style_survey, typeSurvey, has_certificate, assigned_roles);

  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-900 p-4 md:p-0  w-full  sm:py-2 antialiased">
        <div className="mx-auto md:w-5/6 w-full ">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="flex-1 flex items-center space-x-2">
                <h2 className="text-2xl font-semibold ">
                  <span className="text-gray-800 dark:text-gray-100">
                    Configuración de la encuesta
                  </span>
                </h2>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2 flex items-center space-x-2">
                <h4 className="text-lg font-semibold ">
                  <span className="text-gray-800 dark:text-gray-100">
                    Fecha de finalización de la encuesta
                  </span>
                </h4>
              </div>
              <input
                type="date"
                name="dateFinish"
                id="dateFinish"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full md:w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={dateFinish}
                onChange={(e) => setDateFinish(e.target.value)}
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2 flex items-center space-x-2">
                <h4 className="text-lg font-semibold ">
                  <span className="text-gray-800 dark:text-gray-100">
                    Tipo de encuesta
                  </span>
                </h4>
              </div>
              <select
                id="has_certificate"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full md:w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={has_certificate}
                onChange={(e) => setHas_certificate(e.target.value)}
              >
                <option value={0}>Sin certificado</option>
                <option value={1}>Con certificado</option>
              </select>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2 flex items-center space-x-2">
                <h4 className="text-lg font-semibold ">
                  <span className="text-gray-800 dark:text-gray-100">
                    Estilos de la encuesta
                  </span>
                </h4>
              </div>
              <select
                id="style_survey"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full md:w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={style_survey}
                onChange={(e) => setStyle_survey(e.target.value)}
              >
                <option value={"default"}>Predeterminado</option>
                <option value={"c1"}>Naranja</option>
                <option value={"c2"}>Teal</option>
              </select>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2 flex items-center space-x-2">
                <h4 className="text-lg font-semibold ">
                  <span className="text-gray-800 dark:text-gray-100">
                    Tipo de encuesta
                  </span>
                </h4>
              </div>
              <select
                id="typeSurvey"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full md:w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={typeSurvey}
                onChange={(e) => setTypeSurvey(e.target.value)}
              >
                <option value={"open"}>Abiero</option>
                <option value={"closed"}>Cerrado</option>
              </select>
            </div>
            {typeSurvey === "closed" ? (
              <>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                  <div className="w-full md:w-1/2 flex items-center space-x-2">
                    <h4 className="text-lg font-semibold ">
                      <span className="text-gray-800 dark:text-gray-100">
                        Usuario Asignados
                      </span>
                    </h4>
                  </div>
                  <select
                    id="assigned_roles"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full md:w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={assigned_roles} 
                    onChange={handleAssignedRolesChange} 
                  >
                    <option value={""}>---Seleccionar---</option>
                    <option value={3}>Docentes Asistenciales</option>
                    <option value={4}>Estudiantes</option>
                    <option value={5}>Docentes</option>
                  </select>
                </div>
              </>
            ) : (
              ""
            )}
            {formData?.typeSurvey && formData?.assigned_roles && (
              <>
                {/* <UserSurveyStatus formData={formData}/> */}
                {/* FIX */}
              </>
            )}

            {/*  */}
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 border-t dark:border-gray-700">
              <div className="w-full md:w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionConfiguration;
