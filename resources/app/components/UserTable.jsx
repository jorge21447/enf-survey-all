import { useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import { RiFilterFill } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { MdOutlineFileDownload } from "react-icons/md";
import UserDefault from "../assets/userDefault.png";
import useSurvey from "../hooks/useSurvey";
import { useNavigate } from "react-router-dom";

const UserTable = ({ users, handleDelete }) => {
  const navigate = useNavigate();

  const { changeStateModalUser } = useSurvey();

  const [search, setSearch] = useState("");

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  const results = !search
    ? users
    : users.filter((dato) =>
        dato.name.toLowerCase().includes(search.toLocaleLowerCase())
      );

  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-900  sm:p-2 antialiased">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="flex-1 flex items-center space-x-2">
                <h2 className="text-2xl font-semibold ">
                  <span className="text-gray-800 dark:text-gray-100">
                    Lista de Usuarios
                  </span>
                </h2>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 border-t dark:border-gray-700">
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
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <button
                  type="button"
                  className="gap-1 flex items-center justify-center text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:ring-violet-300 font-medium rounded-xl text-sm px-4 py-2 dark:bg-violet-600 dark:hover:bg-violet-700 focus:outline-none dark:focus:ring-violet-800"
                  onClick={changeStateModalUser}
                >
                  <MdAdd size={18} />
                  Añadir Usuario
                </button>
                <button
                  type="button"
                  className="gap-1 flex items-center justify-center text-gray-700 hover:text-white border border-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-xl text-sm px-3 py-2 text-center dark:border-gray-500 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  <MdOutlineFileDownload /> Descargar CSV
                </button>
                <div className="flex items-center space-x-3 w-full md:w-auto">
                  <button
                    className="gap-1 w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    type="button"
                  >
                    <RiFilterFill />
                    Filtrar
                    <IoIosArrowDown />
                  </button>
                  <div
                    id="filterDropdown"
                    className="z-10 hidden w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
                  >
                    <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                      Categoria
                    </h6>
                    <ul
                      className="space-y-2 text-sm"
                      aria-labelledby="filterDropdownButton"
                    >
                      <li className="flex items-center">
                        <input
                          id="name"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="name"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          Nombre
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className=" text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Nombre
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Rol
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Estado
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
                            <img
                              src={
                                user?.photo_profile
                                  ? user.photo_profile
                                  : UserDefault
                              }
                              alt="profile photo"
                              className="h-8 w-auto mr-3"
                            />
                            {user.name}
                          </div>
                        </th>
                        <td className="px-4 py-3 max-w-[12rem] truncate">
                          {user.email}
                        </td>
                        <td className="px-4 py-3">
                          <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                            {user.role.name}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <div className="flex items-center align-items-center">
                            <div
                              className={`${
                                user.is_active ? "bg-green-400" : "bg-red-400"
                              } h-4 w-4 rounded-full inline-block mr-2 `}
                            ></div>
                            {user.is_active ? "Activo" : "No Activo"}
                          </div>
                        </td>
                        <td className="px-4 py-3  font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <div className="flex items-center space-x-4">
                            <button
                              type="button"
                              className="gap-1 py-2 px-3 flex items-center text-sm font-medium text-center text-white 
                          bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                              onClick={() => {
                                navigate(`/admin/users/edit/${user.id}`);
                              }}
                            >
                              <FiEdit />
                              Editar
                            </button>
                            <button
                              type="button"
                              className="gap-1 flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                              onClick={() => handleDelete(user.name, user.id)}
                            >
                              <RiDeleteBin6Fill />
                              Eliminar
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
          </div>
        </div>
      </div>
    </>
  );
};

export default UserTable;
