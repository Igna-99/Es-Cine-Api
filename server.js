import express from 'express'
import indexRoutes from './routes/indexRoutes.js'
import connection from './connection/connection.js'
import { serverPort } from './config/config.js'

const app = express();

//middleweres

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(indexRoutes)


connection.sync({ force: true }).then(() => {
    app.listen(serverPort, () => {
        //console.clear()
        console.log("server OK http://localhost:" + serverPort);    
    })
})
