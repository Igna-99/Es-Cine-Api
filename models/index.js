import Usuario from "./Usuario.js";
import Reserva from "./Reserva.js";


Usuario.hasMany(Reserva, {
    foreignKey: 'idUusario'
});

Reserva.belongsTo(Usuario, {
    foreignKey: 'idUusario'
});


export { Usuario, Reserva }