import express from 'express'
import indexRoutes from './routes/indexRoutes.js'
import connection from './connection/connection.js'
import { serverPort } from './config/config.js'

import seedFuncion from './seed/seedFuncion.js'
import seedSala from './seed/seedSala.js'
import seedPelicula from './seed/seedPelicula.js'
import seedRol from './seed/seedRol.js'

import cors from 'cors'

const app = express();

//middleweres

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors())

//rutas

app.use(indexRoutes);

// Error Handler
app.use((error, req, res, next) => {
    res
        .status(error.status || 500)
        .send({ success: false, message: error.message });
});




connection.sync({ force: true })
    .then(() => {
        app.listen(serverPort, () => {
            //console.clear()
            console.log("server OK http://localhost:" + serverPort);
        })
    })
    .then(seedSala)
    .then(seedPelicula)
    .then(seedFuncion)
    .then(seedRol);
