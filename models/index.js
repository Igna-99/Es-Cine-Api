import Usuario from "./Usuario.js";
import Reserva from "./Reserva.js";
import Funcion from "./Funcion.js";
import Sala from "./Sala.js";
import Pelicula from "./Pelicula.js";
import Asiento from "./Asiento.js"


// Relacion Usuario(1) y Reservas(M)

Usuario.hasMany(Reserva, {
    foreignKey: 'idUusario',
    onUpdate: "RESTRICT",
    onDelete: "RESTRICT",
});
Reserva.belongsTo(Usuario, {
    foreignKey: 'idUusario',
    onUpdate: "RESTRICT",
    onDelete: "RESTRICT",
});



// Relacion Funcion(1) y Reservas(M)
// problemas a la hora de las constrints

Funcion.hasMany(Reserva, {
    foreignKey: 'sala'
});
Reserva.belongsTo(Funcion, {
    foreignKey: 'sala'
});



// Relacion Sala(1) y Funcion(M)

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



// Relacion Pelicula(1) y Funcion(M)

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



// Relacion Sala(1) y Asiento(M)

Sala.hasMany(Asiento, {
    foreignKey: 'sala',
    onUpdate: "RESTRICT",
    onDelete: "RESTRICT",
})
Asiento.belongsTo(Sala, {
    foreignKey: 'sala',
    onUpdate: "RESTRICT",
    onDelete: "RESTRICT",
})

// Relacion Pelicula(1) y Reserva(M)
// talvez sea innecesasria si se pudiera estrablecer FK entre Reserva y Funciones


Pelicula.hasMany(Reserva, {
    foreignKey: 'idPelicula',
    onUpdate: "RESTRICT",
    onDelete: "RESTRICT",
})
Reserva.belongsTo(Pelicula, {
    foreignKey: 'idPelicula',
    onUpdate: "RESTRICT",
    onDelete: "RESTRICT",
})

// Relacion Sala(1) y Reserva(M)
// talvez sea innecesasria si se pudiera estrablecer FK entre Reserva y Funciones

Sala.hasMany(Reserva, {
    foreignKey: 'sala',
    onUpdate: "RESTRICT",
    onDelete: "RESTRICT",
})
Reserva.belongsTo(Sala, {
    foreignKey: 'sala',
    onUpdate: "RESTRICT",
    onDelete: "RESTRICT",
})


export { Usuario, Reserva, Funcion, Sala, Pelicula, Asiento }