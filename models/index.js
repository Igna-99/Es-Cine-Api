import Usuario from "./Usuario.js";
import Reserva from "./Reserva.js";
import Funcion from "./Funcion.js";
import Sala from "./Sala.js";

//

Usuario.hasMany(Reserva, {
    foreignKey: 'idUusario'
});

Reserva.belongsTo(Usuario, {
    foreignKey: 'idUusario'
});

//

Funcion.hasMany(Reserva, {
    foreignKey: 'sala'
});

Reserva.belongsTo(Funcion, {
    foreignKey: 'sala'
});

//

Sala.hasMany(Funcion, {
    foreignKey: 'sala'
})

Funcion.belongsTo(Sala, {
    foreignKey: 'sala'
})







export { Usuario, Reserva, Funcion, Sala }