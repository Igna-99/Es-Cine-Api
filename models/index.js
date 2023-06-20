import Usuario from "./Usuario.js";
import Reserva from "./Reserva.js";
import Funcion from "./Funcion.js";




Usuario.hasMany(Reserva, {
    foreignKey: 'idUusario'
});

Reserva.belongsTo(Usuario, {
    foreignKey: 'idUusario'
});




Funcion.hasMany(Reserva, {
    foreignKey: 'sala'
});

Reserva.belongsTo(Funcion, {
    foreignKey: 'sala'
});






export { Usuario, Reserva, Funcion }