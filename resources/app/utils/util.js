export const convertirFecha = (fechaOriginal) => {
    const fecha = new Date(fechaOriginal);

    // Configuramos la fecha y hora en formato local y en la zona horaria de Bolivia (GMT-4)
    const opciones = { timeZone: 'America/La_Paz', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const fechaFormateada = fecha.toLocaleString('es-BO', opciones);

    return fechaFormateada;
}
