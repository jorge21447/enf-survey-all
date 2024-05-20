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


// Calcula la media (promedio) de un array de números
export function calculateMean(numbers) {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, val) => acc + val, 0);
    return sum / numbers.length;
  }
  
  // Calcula la mediana de un array de números (el valor central)
  export function calculateMedian(numbers) {
    const sorted = numbers.slice().sort((a, b) => a - b); // Copia y ordena
    const middle = Math.floor(sorted.length / 2);
  
    if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2;
    }
  
    return sorted[middle];
  }
  
  // Calcula la moda de un array de números (el valor más frecuente)
  export function calculateMode(numbers) {
    const frequency = {};
    numbers.forEach(number => {
      frequency[number] = (frequency[number] || 0) + 1;
    });
  
    let modes = [];
    let maxFrequency = 0;
    for (const number in frequency) {
      if (frequency[number] > maxFrequency) {
        modes = [parseInt(number, 10)]; // Convierte a número
        maxFrequency = frequency[number];
      } else if (frequency[number] === maxFrequency) {
        modes.push(parseInt(number, 10));
      }
    }
  
    return modes;
  }