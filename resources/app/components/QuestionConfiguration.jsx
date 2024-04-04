import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios";
import useSWR from "swr";
import Loader from "./Loader";
import { FiSearch } from "react-icons/fi";
import { convertirFecha } from "../utils/util";

const QuestionConfiguration = ({
  dateFinish,
  style_survey,
  typeSurvey,
  setDateFinish,
  setStyle_survey,
  setTypeSurvey,
  usersAssignment,
  setUsersAssignment,
  has_certificate,
  setHas_certificate,
}) => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [userss, setUserss] = useState("");

  const token = localStorage.getItem("AUTH_TOKEN");
  const fetcher = () =>
    clienteAxios("/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => data.data);

  const { data, error, isLoading } = useSWR("/api/users", fetcher, {
    refreshInterval: 5000,
  });

  useEffect(() => {
    if (!isLoading) {
      setUserss(data.data);
    }
  }, [isLoading, data]);

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  const results = !search
    ? userss
    : userss.filter((dato) =>
        dato.name.toLowerCase().includes(search.toLocaleLowerCase())
      );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
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
                  <option value={"close"}>Cerrado</option>
                </select>
              </div>
              {typeSurvey === "close" ? (
                <>
                  <div className="border-t dark:border-gray-700 flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div className="flex-1 flex items-center space-x-2">
                      <h2 className="text-2xl font-semibold ">
                        <span className="text-gray-800 dark:text-gray-100">
                          Usuarios asignados a la encuesta
                        </span>
                      </h2>
                    </div>
                  </div>
                  <div className="flex  flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 border-t dark:border-gray-700">
                    <div className="w-full md:w-1/2">
                      <form className="flex items-center">
                        <label htmlFor="simple-search" className="sr-only">
                          Buscar
                        </label>
                        <div className="relative w-full">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <FiSearch />
                          </div>
                          <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Buscar"
                            value={search}
                            onChange={searcher}
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className=" text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            id
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Nombre
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Email
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Rol
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Operaciones
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {results?.length > 0 ? (
                          results.map((user) => (
                            <tr
                              className="border-b dark:border-gray-700"
                              key={user.id}
                            >
                              <th
                                scope="row"
                                className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                <div className="flex items-center mr-3">
                                  {user.id}
                                </div>
                              </th>
                              <td className="px-4 py-3 max-w-[12rem] truncate">
                                {user.name}
                              </td>
                              <td className="px-4 py-3">
                                <span className=" text-xs font-medium py-0.5 rounded">
                                  {user.email}
                                </span>
                              </td>
                              <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <div className="flex ">{user.role.name}</div>
                              </td>
                              <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <div className="flex items-center space-x-4">
                                  <button
                                    type="button"
                                    className={`gap-1 rounded-2xl  py-2 px-8 flex items-center text-sm font-medium text-center text-white focus:ring-4 focus:outline-none ${
                                      usersAssignment.includes(user.id)
                                        ? "bg-orange-600 hover:bg-orange-700 focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 disabled:cursor-not-allowed"
                                        : "bg-green-600 hover:bg-green-700 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                    }`}
                                    onClick={() => {
                                      if (usersAssignment.includes(user.id)) {
                                        const updatedUsersAssignment =
                                          usersAssignment.filter(
                                            (id) => id !== user.id
                                          );
                                        setUsersAssignment(
                                          updatedUsersAssignment
                                        );
                                      } else {
                                        setUsersAssignment([
                                          ...usersAssignment,
                                          user.id,
                                        ]);
                                      }
                                    }}
                                  >
                                    {usersAssignment.includes(user.id)
                                      ? "Retirar"
                                      : "Asignar"}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="5"
                              className="px-4 py-6 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                            >
                              No hay usuarios.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                ""
              )}

              {/*  */}
              <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 border-t dark:border-gray-700">
                <div className="w-full md:w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuestionConfiguration;
