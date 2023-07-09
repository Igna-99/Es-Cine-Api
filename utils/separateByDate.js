
export const separateByDate = (arrayDePeliculas) => {

    let funcionesPorFecha = {}

    arrayDePeliculas.forEach(pelicula => {
        const fecha = pelicula.fecha;

        if (!funcionesPorFecha[fecha]) {
            funcionesPorFecha[fecha] = [];
        };

        funcionesPorFecha[fecha].push(pelicula);
    });

    return funcionesPorFecha;


};