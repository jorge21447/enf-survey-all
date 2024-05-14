export const convertirFecha = (fechaOriginal) => {
    const opciones = { timeZone: 'America/La_Paz', day: 'numeric', month: 'long', year: 'numeric'};
    return new Date(fechaOriginal).toLocaleString('es-BO', opciones);
}



export function convertirNumeroALetras(numero) {
    const palabras = ["", "Uno", "Dos", "Tres", "Cuatro", "Cinco", "Seis", "Siete", "Ocho", "Nueve", "Diez", "Once", "Doce", "Trece", "Catorce", "Quince", "Dieciséis", "Diecisiete", "Dieciocho", "Diecinueve", "Veinte", "Treinta", "Cuarenta", "Cincuenta", "Sesenta", "Setenta", "Ochenta", "Noventa", "Cien"];
    const centenas = ["", "Ciento", "Doscientos", "Trescientos", "Cuatrocientos", "Quinientos", "Seiscientos", "Setecientos", "Ochocientos", "Novecientos"];

    let parteEntera = Math.floor(numero);
    let parteDecimal = Math.round((numero - parteEntera) * 100);

    function convertirParteEntera(num) {
        if (num <= 20) {
            return palabras[num];
        } else if (num < 100) {
            const decena = Math.floor(num / 10);
            const unidad = num % 10;
            return palabras[decena + 18] + (unidad !== 0 ? " y " + palabras[unidad] : "");
        } else if (num === 100) {
            return "Cien";
        } else if (num < 1000) {
            const centena = Math.floor(num / 100);
            const resto = num % 100;
            return centenas[centena] + (resto !== 0 ? " " + convertirParteEntera(resto) : "");
        } else {
            return "Número fuera de rango";
        }
    }

    let resultado = convertirParteEntera(parteEntera);

    return resultado + ` ${parteDecimal.toString().padStart(2, '0')}/100 Bs.`;
}
