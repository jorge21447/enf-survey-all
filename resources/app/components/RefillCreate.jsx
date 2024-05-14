import { useEffect, useState } from "react";
import useSWR from "swr";
import useSurvey from "../hooks/useSurvey";
import { MdClose } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";
import Alerta from "./Alerta";
import clienteAxios from "../config/axios";
import Loader from "./Loader";
import { useNavigate, useParams } from "react-router-dom";

const RefillCreate = () => {
  const { id } = useParams();
  const { createRefill, roles, userSurvey } = useSurvey();
  const [errores, setErrores] = useState([]);

  const [amount, setAmount] = useState(0.0);
  const [description, setDescription] = useState("");
  const [source, setSource] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrores([]);

    const datos = {
      amount,
      description,
      source,
      id,
    };

    const resultado = await createRefill(datos, setErrores, id);
    if (resultado) {
      navigate(`/${roles[userSurvey.role.name]}/pettycash/${id}/record`);
    }
  };

  const handleReturn = (e) => {
    navigate(-1);
  };


  return (
    <>
      <div className="md:py-6">
        <div className=" overflow-y-auto overflow-x-hidden  right-0 left-0 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative p-4 w-full max-w-2xl max-h-full z-20">
            {/* Modal contenido */}
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              {/* Modal cabecera */}
              <div className="flex  items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <div className="flex-1 flex items-center space-x-2">
                  <button
                    type="button"
                    className="gap-1 flex items-center justify-center text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-violet-300 font-medium rounded-full text-sm px-2 py-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-violet-800 "
                    onClick={handleReturn}
                  >
                    <MdArrowBackIosNew />
                  </button>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {"Crear Reposición de Caja Chica"}
                  </h3>
                </div>
              </div>
              <form noValidate onSubmit={handleSubmit}>
                {errores
                  ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>)
                  : null}
                <div className="grid gap-4 mb-4 sm:grid-cols-2 pb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                  
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="amount"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Monto
                    </label>
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Descripción
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Descripción"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="source"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Fuente
                    </label>
                    <textarea
                      name="source"
                      id="source"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Descripción"
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                    />
                  </div>
                </div>
                <div className="items-center space-y-10 sm:flex sm:space-y-0 sm:space-x-4 ">
                  <button
                    type="submit"
                    className="w-full sm:w-auto justify-center text-white inline-flex bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                  >
                    {"Crear"}
                  </button>
                  <button
                    type="button"
                    className="w-full justify-center sm:w-auto text-gray-500 inline-flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    onClick={handleReturn}
                  >
                    <MdClose className="mr-1 -ml-1 w-5 h-5" />
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RefillCreate;
