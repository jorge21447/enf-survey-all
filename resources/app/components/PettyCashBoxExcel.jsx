import ExcelJS from "exceljs";

const PettyCashBoxExcel = ({ data }) => {
  const generarExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("PettyCashBox");

    // Configurar las columnas
    worksheet.columns = [
      { header: "NRO", key: "numero" },
      { header: "FECHA", key: "fecha" },
      { header: "NRO FACTURA", key: "numeroFactura" },
      { header: "DESCRIPCIÓN", key: "descripcion" },
      { header: "INGRESO", key: "ingreso" },
      { header: "GASTO", key: "gasto" },
      { header: "SALDO", key: "saldo" },
    ];

    // Agregar datos
    data.forEach((item, index) => {
      worksheet.addRow({
        numero: index,
        fecha: item.fecha,
        numeroFactura: item.numeroFactura,
        descripcion: item.descripcion,
        ingreso: item.ingreso,
        gasto: item.gasto,
        saldo: item.saldo,
      });
    });

    // Calcular la última fila para el total de gastos
    const lastRowNumber = data.length + 2;
    worksheet.addRow({
      numero: "",
      fecha: "",
      numeroFactura: "",
      descripcion: "GASTO TOTAL",
      ingreso: "",
      gasto: "",
      saldo: "135 Bs.",
    });

    // Generar el archivo Excel
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "PettyCashBox.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
    });
  };

  return <button onClick={generarExcel}>Generar Excel</button>;
};

export default PettyCashBoxExcel;
