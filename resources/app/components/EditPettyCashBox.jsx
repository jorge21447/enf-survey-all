import { useEffect, useState } from "react";
import useSWR from "swr";
import useSurvey from "../hooks/useSurvey";
import { MdClose } from "react-icons/md";
import Alerta from "./Alerta";
import clienteAxios from "../config/axios";
import Loader from "./Loader";
import { useNavigate, useParams } from "react-router-dom";

const EditPettyCashBox = () => {
  const { id } = useParams();

  const { roles, userSurvey, editPettyCashBox } = useSurvey();
  const [errores, setErrores] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [balance, setBalance] = useState(0);
  const [userRes, setUserRes] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("AUTH_TOKEN");

  const fetcher = () =>
    clienteAxios(`/api/pettycashbox/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => data.data);

  const { data, error, isLoading } = useSWR(
    `/api/pettycashbox/${id}`,
    fetcher,
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    const getData = async () => {
      if (!isLoading) {
        setName(data.name);
        setDescription(data.description);
        setBalance(data.balance);
        setUserRes(data.user_id);
      }
    };
    getData();
  }, [isLoading, data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrores([]);

    const datos = {
      name,
      description,
      balance,
      user_id: userRes,
    };

    const resultado = await editPettyCashBox(datos, setErrores, id);
    if (resultado) {
      navigate(`/${roles[userSurvey.role.name]}/pettycash`);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="md:py-6">
        <div className=" overflow-y-auto overflow-x-hidden  right-0 left-0 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative p-4 w-full max-w-2xl max-h-full z-20">
            {/* Modal contenido */}
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              {/* Modal cabecera */}
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Nueva Caja Chica
                </h3>
              </div>
              <form noValidate onSubmit={handleSubmit}>
                {errores
                  ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>)
                  : null}
                <div className="grid gap-4 mb-4 sm:grid-cols-2 pb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Caja Chica 1"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Descripción
                    </label>
                    <input
                      type="text"
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
                      htmlFor="balance"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Balance
                    </label>
                    <input
                      type="number"
                      name="balance"
                      id="balance"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Descripción"
                      value={balance}
                      onChange={(e) => setBalance(e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="userR"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Usuario Responsable
                    </label>
                    <input
                      id="userR"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:border-gray-200 disabled:text-gray-500 disabled:dark:bg-gray-700 disabled:dark:border-gray-600 disabled:dark:text-gray-500 disabled:focus:ring-gray-600 disabled:focus:border-gray-600"  
                      value={userRes}
                      disabled={true}
                    />
                  </div>
                </div>
                <div className="items-center space-y-10 sm:flex sm:space-y-0 sm:space-x-4 ">
                  <button
                    type="submit"
                    className="w-full sm:w-auto justify-center text-white inline-flex bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                  >
                    Editar Caja Chica
                  </button>
                  <button
                    type="button"
                    className="w-full justify-center sm:w-auto text-gray-500 inline-flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    onClick={() => {
                      navigate(`/${roles[userSurvey.role.name]}/pettycash`);
                    }}
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

export default EditPettyCashBox;
