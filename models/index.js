import Usuario from "./Usuario.js";
import Reserva from "./Reserva.js";
import Funcion from "./Funcion.js";
import Sala from "./Sala.js";
import Pelicula from "./Pelicula.js";

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
    foreignKey: 'sala',
    onUpdate: "RESTRICT",
    onDelete: "RESTRICT",
})

Funcion.belongsTo(Sala, {
    foreignKey: 'sala',
    onUpdate: "RESTRICT",
    onDelete: "RESTRICT",
})


//

Pelicula.hasMany(Funcion, {
    foreignKey: 'idPelicula',
    onUpdate: "RESTRICT",
    onDelete: "RESTRICT",
})


Funcion.belongsTo(Pelicula, {
    foreignKey: 'idPelicula',
    onUpdate: "RESTRICT",
    onDelete: "RESTRICT",
    
})




export { Usuario, Reserva, Funcion, Sala, Pelicula }