import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web'
import sportifyRoute from './route/Search';
import connectDB from './config/connectDB';

require('dotenv').config()

let app = express()

app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json())

viewEngine(app)

initWebRoutes(app)

connectDB()

let port = process.env.PORT || 8090

app.use('/spotify', sportifyRoute)

app.listen(port, () => {
    console.log('listening on port' + port)
})
