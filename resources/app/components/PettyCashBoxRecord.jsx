import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { MdAdd, MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios";
import Loader from "./Loader";
import useSurvey from "../hooks/useSurvey";
import { SiMicrosoftexcel } from "react-icons/si";
import { FiSearch } from "react-icons/fi";
import { convertirFecha } from "../utils/util";
import LogoEnf from "../assets/logo-enf.png";
import LogoUmsa from "../assets/logo-UMSA.png";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const PettyCashBoxRecord = () => {
  const { userSurvey, roles } = useSurvey();
  const { id } = useParams();
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const token = localStorage.getItem("AUTH_TOKEN");

  const [expensesTotal, setExpensesTotal] = useState(0.0);
  const [incomeTotal, setIncomeTotal] = useState(0.0);
  const [totalBalance, setTotalBalance] = useState(0.0);

  // Obtener la fecha actual
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const januaryFirst = `${currentYear}-01-01`;

  // Estados para las fechas
  const [date1, setDate1] = useState(januaryFirst);
  const [date2, setDate2] = useState(currentDate.toISOString().split("T")[0]);

  const [imageData, setImageData] = useState(null);
  const [imageData2, setImageData2] = useState(null);

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  const handleFilter = () => {
    let filteredData = expenses;

    if (!showAll) {
      const startDate = new Date(date1);
      const endDate = new Date(date2);
      filteredData = filteredData.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= startDate && expenseDate <= endDate;
      });
    }

    if (search.trim() !== "") {
      filteredData = filteredData.filter((expense) =>
        expense.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    const totalExpenses = filteredData.reduce((acc, expense) => {
      if (expense.type === "Expense") {
        return acc + parseFloat(expense.amount);
      } else {
        return acc;
      }
    }, 0);

    const totalIncome = data?.history.reduce((acc, expense) => {
      if (expense.type === "Expense") {
        return acc;
      } else {
        return acc + parseFloat(expense.amount);
      }
    }, 0);

    let remainingBalance = totalBalance;
    filteredData = filteredData.map((expense) => {
      let remainingAmount;
      if (expense.type === "Expense") {
        remainingAmount = remainingBalance - parseFloat(expense.amount);
        remainingBalance = remainingAmount;
      } else {
        remainingAmount = remainingBalance + parseFloat(expense.amount);
        remainingBalance = remainingAmount;
      }
      return { ...expense, remainingBalance };
    });

    setIncomeTotal(totalIncome);
    // Actualizar los estados con los resultados calculados
    setFilteredExpenses(filteredData);
    setExpensesTotal(totalExpenses);
  };

  const exportarDatosExcel = (data) => {
    // Convertir imagen a buffer (asegúrate de manejar el error si la conversión falla)
    

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Hoja 1");

    // Agregar la imagen (solo si imageData está disponible)
    if (imageData) {
      const imageId = workbook.addImage({
        buffer: imageData,
        extension: "png", // Ajusta la extensión si es diferente
      });

      worksheet.addImage(imageId, {
        tl: { col: 7, row: 0 },
        ext: { width: 75, height: 100 },
      });
    }

    if (imageData2) {
      const imageId2 = workbook.addImage({
        buffer: imageData2,
        extension: "png", // Ajusta la extensión si es diferente
      });

      worksheet.addImage(imageId2, {
        tl: { col: 0, row: 0 },
        ext: { width: 60, height: 100 },
      });
    }

    // Título centrado en B2:G5 con saltos de línea
    worksheet.mergeCells("A1:H5");
    const titleCell2 = worksheet.getCell("B2");
    titleCell2.value =
      "UNIVERSIDAD MAYOR DE SAN ANDRÉS\nFACULTAD DE MEDICINA, ENFERMERÍA, NUTRICIÓN Y TECNOLOGÍA MÉDICA\nCARRERA DE ENFERMERÍA\nDETALLE DE GASTOS DE CAJA CHICA CARRERA DE ENFERMERÍA";
    titleCell2.alignment = {
      vertical: "middle", // Alineación vertical al medio
      horizontal: "center", // Alineación horizontal al centro
      wrapText: true, // Habilitar saltos de línea
    };
    titleCell2.font = { bold: true, size: 12 };

    // Configurar el título
    worksheet.mergeCells("A6:H6");
    const titleCell = worksheet.getCell("B6");
    titleCell.value =
      "PERIODO: " +
      "Del:" +
      convertirFecha(date1) +
      " Al: " +
      convertirFecha(date2);
    titleCell.alignment = { vertical: "middle", horizontal: "left" };
    titleCell.font = { bold: true, size: 11 };
    

    const row2 = worksheet.getRow(6);
    row2.height = 30;

    

    // Encabezados de columna (ahora en la fila 7)
    const headerRow = worksheet.getRow(7);
    headerRow.values = [
      "NRO",
      "FECHA",
      "BENEFICIARIO",
      "NRO FACTURA",
      "DETALLE",
      "INGRESO",
      "GASTO",
      "SALDO",
    ];

    // Aplicar estilo a los encabezados
    headerRow.eachCell((cell) => {
      cell.font = { bold: true }; // Texto en negrita
      cell.border = {
        // Borde grueso
        top: { style: "medium" },
        left: { style: "medium" },
        bottom: { style: "medium" },
        right: { style: "medium" },
      };
      cell.alignment = { vertical: "middle", horizontal: "center" }; // Centrar texto vertical y horizontalmente
    });

    // Configurar el ancho de las columnas
    worksheet.columns = [
      { key: "numero", width: 8 },
      { key: "fecha", width: 16 },
      { key: "beneficiario", width: 40 },
      { key: "numeroFactura", width: 16 },
      { key: "detalle", width: 64 },
      { key: "ingreso", width: 12 },
      { key: "gasto", width: 12 },
      { key: "saldo", width: 12 },
    ];

    // Agregar datos
    data.forEach((item, index) => {
      const row = worksheet.addRow({
        numero: item.number,
        fecha: item.date,
        beneficiario: item.type === "Expense" ? item.interested : "REPOSICIÓN DE CAJA CHICA",
        numeroFactura:
          item.type === "Expense"
            ? item.invoiceNumber
              ? item.invoiceNumber
              : "Sin factura"
            : "",
        detalle: item.type === "Expense" ? item.description : "",
        ingreso: item.type === "Refill" ? item.amount + ' Bs.' : '' , 
        gasto: item.type === "Expense" ? item.amount + ' Bs.': '',
        saldo: item.remainingBalance +  ' Bs.',
      });

      // Aplicar borde a todas las celdas de la fila
      row.eachCell({ includeEmpty: true }, (cell) => {
        cell.border = {
          top: { style: "medium" },
          left: { style: "medium" },
          bottom: { style: "medium" },
          right: { style: "medium" },
        };
        cell.alignment = { vertical: "middle", horizontal: "left" };
      });
    });

    const row3 = worksheet.addRow({
      numero:  "",
      fecha: "",
      beneficiario: "",
      numeroFactura:"",
      detalle: "TOTAL:",
      ingreso: incomeTotal + ' Bs.', 
      gasto: expensesTotal + ' Bs.',
      saldo: (totalBalance - expensesTotal + incomeTotal ) + ' Bs.',
    });

    row3.eachCell({ includeEmpty: true }, (cell) => {
      cell.border = {
        top: { style: "medium" },
        left: { style: "medium" },
        bottom: { style: "medium" },
        right: { style: "medium" },
      };
      cell.alignment = { vertical: "middle", horizontal: "left" };
    });


    // Generar el archivo Excel
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "caja_chica.xlsx");
    });
  };


  useEffect(() => {
    handleFilter();
  }, [showAll, search]);

  const handleToggleShowAll = () => {
    setShowAll((prevState) => !prevState);
  };

  const fetcher = () =>
    clienteAxios(`/api/pettycashbox/record/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => data.data);

  const { data, error, isLoading, mutate } = useSWR(
    `/api/pettycashbox/record/${id}`,
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

  useEffect(() => {
    if (id && !isLoading) {
      setExpenses(data.history);
      setTotalBalance(data.totalBalance);
      let remainingBalance = data?.totalBalance;
      const filteredData = data?.history.map((expense) => {
        let remainingAmount;
        if (expense.type === "Expense") {
          remainingAmount = remainingBalance - parseFloat(expense.amount);
          remainingBalance = remainingAmount;
        } else {
          remainingAmount = remainingBalance + parseFloat(expense.amount);
          remainingBalance = remainingAmount;
        }
        return { ...expense, remainingBalance };
      });

      const totalExpenses = data?.history.reduce((acc, expense) => {
        if (expense.type === "Expense") {
          return acc + parseFloat(expense.amount);
        } else {
          return acc;
        }
      }, 0);

      const totalIncome = data?.history.reduce((acc, expense) => {
        if (expense.type === "Expense") {
          return acc;
        } else {
          return acc + parseFloat(expense.amount);
        }
      }, 0);
      setIncomeTotal(totalIncome);
      setExpensesTotal(totalExpenses);
      setFilteredExpenses(filteredData);
    }
  }, [isLoading, data, id]);

  useEffect(() => {
    fetch(LogoEnf)
      .then((response) => response.arrayBuffer())
      .then((buffer) => setImageData(buffer));

    fetch(LogoUmsa)
      .then((response2) => response2.arrayBuffer())
      .then((buffer2) => setImageData2(buffer2));
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
                      Historial de Caja Chica
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
                    className="gap-1 flex items-center justify-center text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 font-medium rounded-xl text-sm px-4 py-2 dark:bg-cyan-600 dark:hover:bg-cyan-700 focus:outline-none dark:focus:ring-cyan-800"
                    onClick={() => {
                      exportarDatosExcel(filteredExpenses);
                    }}
                  >
                    <SiMicrosoftexcel size={18} />
                    Exportar
                  </button>
                  <button
                    type="button"
                    className="gap-1 flex items-center justify-center text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-xl text-sm px-4 py-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
                    onClick={() => {
                      navigate(`/administrativo/pettycash/${id}/record/create`);
                    }}
                  >
                    <MdAdd size={18} />
                    Crear Reposición 
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
                        NRO FACTURA
                      </th>
                      <th scope="col" className="px-4 py-3">
                        DESCRIPCIÓN
                      </th>
                      <th scope="col" className="px-4 py-3">
                        INGRESO
                      </th>
                      <th scope="col" className="px-4 py-3">
                        GASTO
                      </th>
                      <th scope="col" className="px-4 py-3">
                        SALDO
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-cyan-900 dark:bg-gray-500 border-y  text-white p-2">
                      <th
                        scope="row"
                        className="font-bold px-4 py-3"
                        colSpan={5}
                      ></th>
                      <th
                        scope="row"
                        className="font-bold px-4 py-3"
                        colSpan={1}
                      >
                        {0} Bs.
                      </th>
                      <th
                        scope="row"
                        className=" font-bold px-4 py-3"
                        colSpan={1}
                      >
                        {totalBalance} Bs.
                      </th>
                    </tr>
                    {filteredExpenses?.length > 0 ? (
                      filteredExpenses.map((expense) =>
                        expense.type === "Expense" ? (
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
                            <td className="px-4 py-3  truncate">
                              <div className="flex items-center">
                                {expense.date}
                              </div>
                            </td>
                            <td className="px-4 py-3  truncate">
                              <div className="flex items-center">
                                {expense.invoiceNumber
                                  ? expense.invoiceNumber
                                  : "Sin factura"}
                              </div>
                            </td>
                            <td className="px-4 py-3 max-w-[13rem] truncate">
                              <div className="flex items-center">
                                {expense.description}
                              </div>
                            </td>
                            <td className="px-4 py-3 ">
                              <div className="flex items-center ">-</div>
                            </td>

                            <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                              <div className="flex items-center">
                                {expense.amount} Bs.
                              </div>
                            </td>
                            <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                              <div className="flex items-center mr-3">
                                {expense.remainingBalance} Bs.
                              </div>
                            </td>
                          </tr>
                        ) : (
                          <tr
                            className="bg-blue-900 dark:bg-gray-600 border-y  text-white p-2"
                            key={expense.id + "o"}
                          >
                            <td className="font-bold px-4 py-3" colSpan={2}>
                              Desembolso Caja Chica
                            </td>
                            <td className="font-bold px-4 py-3" colSpan={2}>
                              Fecha desembolso: {convertirFecha(expense.date)}
                            </td>
                            <td
                              scope="row"
                              className="font-bold px-4 py-3"
                              colSpan={1}
                            >
                              {expense.amount} Bs.
                            </td>
                            <td
                              className="font-bold px-4 py-3"
                              colSpan={1}
                            ></td>
                            <td className="font-bold px-4 py-3" colSpan={1}>
                              {expense.remainingBalance} Bs.
                            </td>
                          </tr>
                        )
                      )
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
                    <tr className="bg-teal-900 dark:bg-teal-900   text-white p-2">
                      <th
                        scope="row"
                        className="font-bold px-4 py-3"
                        colSpan={4}
                      >
                        GASTO TOTAL
                      </th>
                      <th
                        scope="row"
                        className="font-bold px-4 py-3"
                        colSpan={1}
                      >
                        {incomeTotal} Bs.
                      </th>
                      <th
                        scope="row"
                        className="font-bold px-4 py-3"
                        colSpan={1}
                      >
                        {expensesTotal} Bs.
                      </th>
                      <th
                        scope="row"
                        className="font-bold px-4 py-3"
                        colSpan={1}
                      >
                        {totalBalance - expensesTotal + incomeTotal} Bs.
                      </th>
                    </tr>
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

export default PettyCashBoxRecord;
