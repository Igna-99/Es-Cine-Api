import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import indexRoutes from './routes/indexRoutes.js'
import connection from './connection/connection.js'

import { serverPort } from './config/config.js'

import seedFuncion from './seed/seedFuncion.js'
import seedSala from './seed/seedSala.js'
import seedPelicula from './seed/seedPelicula.js'
import seedRol from './seed/seedRol.js'
import seedUsuario from './seed/seedUsuario.js'



const app = express();



const whitelist = ['http://localhost:8080', 'http://localhost:5173']

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error())
    }
  },
  credentials: true,
}

const corsOptions2 = { credentials: true, origin: 'http://localhost:5173' }

//middleweres

app.use(cors(corsOptions2))

app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



//rutas

app.use(indexRoutes);

// Error Handler
app.use((error, req, res, next) => {
  res
    .status(error.status || 500)
    .send({ success: false, message: error.message });
});



let forza = true


connection.sync({ force: forza })
  .then(() => {
    app.listen(serverPort, () => {
      //console.clear()
      console.log("server OK http://localhost:" + serverPort);
    })
  })
  .then(async () => {
    if (forza) {
      await seedSala()
      await seedPelicula()
      await seedFuncion()
      await seedRol()
      await seedUsuario()
    }
  });

