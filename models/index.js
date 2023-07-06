import Usuario from "./Usuario.js";
import Reserva from "./Reserva.js";
import Funcion from "./Funcion.js";
import Sala from "./Sala.js";
import Pelicula from "./Pelicula.js";
import Asiento from "./Asiento.js";
import AsientosDeFuncion from "./AsientosDeFuncion.js";
import Rol from "./Rol.js"



// Relacion Rol(1) y Usuario(M)

Rol.hasMany(Usuario, {
    foreignKey: "idRol",
});
Usuario.belongsTo(Rol, {
    foreignKey: "idRol",
});


// Relacion Usuario(1) y Reservas(M)

Usuario.hasMany(Reserva, {
    foreignKey: 'idUsuario',
    // onUpdate: "RESTRICT",
    // onDelete: "RESTRICT",
});
Reserva.belongsTo(Usuario, {
    foreignKey: 'idUsuario',
    // onUpdate: "RESTRICT",
    // onDelete: "RESTRICT",
});

// Relacion Funcion(1) y Reservas(M)

Funcion.hasMany(Reserva, {
    foreignKey: 'idFuncion',
    // onUpdate: "RESTRICT",
    // onDelete: "RESTRICT",
});
Reserva.belongsTo(Funcion, {
    foreignKey: 'idFuncion',
    // onUpdate: "RESTRICT",
    // onDelete: "RESTRICT",
});


// Relacion Pelicula(1) y Funcion(M)

Pelicula.hasMany(Funcion, {
    foreignKey: 'idPelicula',
    // onUpdate: "RESTRICT",
    // onDelete: "RESTRICT",
});
Funcion.belongsTo(Pelicula, {
    foreignKey: 'idPelicula',
    // onUpdate: "RESTRICT",
    // onDelete: "RESTRICT",
});

// Relacion Sala(1) y Funcion(M)

Sala.hasMany(Funcion, {
    foreignKey: 'sala',
    // onUpdate: "RESTRICT",
    // onDelete: "RESTRICT",
});
Funcion.belongsTo(Sala, {
    foreignKey: 'sala',
    // onUpdate: "RESTRICT",
    // onDelete: "RESTRICT",
});

// Relacion Sala(1) y Asiento(M)

Sala.hasMany(Asiento, {
    foreignKey: 'sala',
    // onUpdate: "RESTRICT",
    // onDelete: "RESTRICT",
});
Asiento.belongsTo(Sala, {
    foreignKey: 'sala',
    // onUpdate: "RESTRICT",
    // onDelete: "RESTRICT",
});

// Relacion Funcion(M) y Asiento(M) con  AsientosDeFuncion

Funcion.belongsToMany(Asiento, {
    through: 'AsientosDeFuncion',
    foreignKey: 'idFuncion',
});
Asiento.belongsToMany(Funcion, {
    through: 'AsientosDeFuncion',
    foreignKey: 'idAsiento',
});

// Relacion Reserva(1) y AsientosDeFuncion(M)

Reserva.hasMany(AsientosDeFuncion, {
    foreignKey: 'idReserva',
});
AsientosDeFuncion.belongsTo(Reserva, {
    foreignKey: 'idReserva',
});





export { Usuario, Reserva, Funcion, Sala, Pelicula, Asiento, Rol, AsientosDeFuncion }