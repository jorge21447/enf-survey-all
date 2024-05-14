import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { MdAdd, MdArrowBackIosNew, MdDeleteForever } from "react-icons/md";
import { FiEdit, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios";
import Loader from "./Loader";
import { PiFilePdfFill } from "react-icons/pi";
import useSurvey from "../hooks/useSurvey";

const ExpensesTable = () => {
  const { deleteExpense, changeStateModalPettyCashExpense, setExpenseSelected } = useSurvey();
  const { userSurvey, roles } = useSurvey();
  const { id } = useParams();
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [manager, setManager] = useState(null);
  const token = localStorage.getItem("AUTH_TOKEN");

  // Obtener la fecha actual
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const januaryFirst = `${currentYear}-01-01`;

  // Estados para las fechas
  const [date1, setDate1] = useState(januaryFirst);
  const [date2, setDate2] = useState(currentDate.toISOString().split("T")[0]);

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  const handleFilter = () => {
    let filteredData = expenses;

    if (!showAll) {
      const startDate = new Date(date1);
      const endDate = new Date(date2);
      filteredData = filteredData.filter((expense) => {
        const expenseDate = new Date(expense.expenseDate);
        return expenseDate >= startDate && expenseDate <= endDate;
      });
    }

    if (search.trim() !== "") {
      filteredData = filteredData.filter((expense) =>
        expense.interested.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredExpenses(filteredData);
  };

  useEffect(() => {
    handleFilter();
  }, [showAll, search]);

  const handleToggleShowAll = () => {
    setShowAll((prevState) => !prevState);
  };

  const fetcher = () =>
    clienteAxios(`/api/pettycashbox/expenses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => data.data);

  const { data, error, isLoading, mutate } = useSWR(
    `/api/pettycashbox/expenses/${id}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  const handleReturn = (e) => {
    e.preventDefault();
    navigate(`/${roles[userSurvey.role.name]}/pettycash`);
  };

  const handleDelete = (id) => {
    deleteExpense(id, () => {
      mutate();
    });
  };

  useEffect(() => {
    if (id && !isLoading) {
      setExpenses(data?.expenses);
      setFilteredExpenses(data?.expenses);
      setManager(data?.manager)
    }
  }, [isLoading, data, id]);

  useEffect(() => {
    mutate();
  }, []);

  if (isLoading) {
    return <Loader />;
  }


  return (
    <>
      <div className="md:py-6">
        <div className="bg-gray-50  dark:bg-gray-900  sm:p-2 antialiased">
          <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="flex-1 flex items-center space-x-2">
                  <button
                    type="button"
                    className="gap-1 flex items-center justify-center text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-violet-300 font-medium rounded-full text-sm px-2 py-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-violet-800 "
                    onClick={handleReturn}
                  >
                    <MdArrowBackIosNew />
                  </button>
                  <h2 className="text-2xl font-semibold ">
                    <span className="text-gray-800 dark:text-gray-100">
                      Lista de Gastos
                    </span>
                  </h2>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 border-t dark:border-gray-700">
                <div className="w-full gap-4 md:w-1/2 md:flex block ">
                  <div className=" flex text-sm items-center gap-4  pb-4 md:pb-0">
                    <label
                      className="font-medium text-sm text-gray-900 whitespace-nowrap dark:text-gray-100"
                      htmlFor="date1"
                    >
                      Fecha Inicio:
                    </label>
                    <input
                      type="date"
                      name="date1"
                      id="date1"
                      className="font-medium bg-gray-100  text-black rounded-lg p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                      value={date1}
                      onChange={(e) => setDate1(e.target.value)}
                    />
                  </div>
                  <div className="  flex text-sm items-center gap-4  pb-4 md:pb-0">
                    <label
                      className="font-medium text-sm text-gray-900 whitespace-nowrap dark:text-gray-100"
                      htmlFor="date2"
                    >
                      Fecha Fin:{" "}
                    </label>
                    <input
                      type="date"
                      name="date2"
                      id="date2"
                      className="font-medium bg-gray-100  text-black rounded-lg p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                      value={date2}
                      onChange={(e) => setDate2(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  <button
                    type="button"
                    className={`gap-1 flex items-center justify-center text-white ${
                      showAll
                        ? "bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300"
                        : "bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:ring-violet-300"
                    } font-medium rounded-xl text-sm px-4 py-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-violet-800`}
                    onClick={handleToggleShowAll}
                  >
                    {showAll ? "Mostrar por Fecha" : "Mostrar Todo"}
                  </button>
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
                    className="gap-1 flex items-center justify-center text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-xl text-sm px-4 py-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
                    onClick={() => {
                      navigate(`/admin/pettycash/${id}/expenses/create`);
                    }}
                  >
                    <MdAdd size={18} />
                    Crear Gasto
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className=" text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-4 py-4">
                        NRO
                      </th>
                      <th scope="col" className="px-4 py-3">
                        FECHA
                      </th>
                      <th scope="col" className="px-4 py-3">
                        GASTO
                      </th>
                      <th scope="col" className="px-4 py-3">
                        CUSTODIO
                      </th>
                      <th scope="col" className="px-4 py-3">
                        NRO FACTURA
                      </th>
                      <th scope="col" className="px-4 py-3">
                        DESCRIPCIÓN
                      </th>
                      <th scope="col" className="px-4 py-3">
                        OPERACIONES
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExpenses?.length > 0 ? (
                      filteredExpenses.map((expense) => (
                        <tr
                          className="border-b dark:border-gray-700"
                          key={expense.id}
                        >
                          <th
                            scope="row"
                            className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white dark:bg-slate-700 bg-slate-100"
                          >
                            <div className="flex items-center mr-3">
                              {expense.number}
                            </div>
                          </th>
                          <td className="px-4 py-3 max-w-[12rem] truncate">
                            <div className="flex items-center">
                              {expense.expenseDate}
                            </div>
                          </td>
                          <td className=" py-3">
                            <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                              {expense.amount} Bs.
                            </span>
                          </td>
                          <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                            <div className="flex items-center">
                              {expense.interested}
                            </div>
                          </td>
                          <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                            <div className="flex items-center mr-3">
                              {expense.invoiceNumber ? expense.invoiceNumber : "Sin factura"}
                            </div>
                          </td>
                          <td className="px-4 py-3 max-w-[13rem] truncate">
                            <div className="flex items-center">
                              {expense.description}
                            </div>
                          </td>
                          <td className="px-4 py-3  font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <div className="flex items-center space-x-4">
                              <button
                                type="button"
                                className="gap-1 py-2 px-3 flex items-center text-sm font-medium text-center text-white  bg-teal-700 rounded-lg hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                                onClick={() => {
                                  changeStateModalPettyCashExpense();
                                  setExpenseSelected({...expense, manager});
                                }}
                              >
                                <PiFilePdfFill size={20} />
                              </button>
                              <button
                                type="button"
                                className="gap-1 py-2 px-3 flex items-center text-sm font-medium text-center text-white  bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                                onClick={() =>
                                  navigate(
                                    `/admin/pettycash/${id}/expenses/edit/${expense.id}`
                                  )
                                }
                              >
                                <FiEdit size={20} />
                              </button>
                              <button
                                type="button"
                                className="gap-1 flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                onClick={() => handleDelete(expense.id)}
                              >
                                <MdDeleteForever size={20} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="7"
                          className="px-4 py-6 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                        >
                          No hay gastos.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpensesTable;
