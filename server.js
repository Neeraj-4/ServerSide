import express from 'express';
import dotenv from 'dotenv';
import Connection from './Database/db.js';
import DefaultData from './Default.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import Routers from './Routers/Routers.js';
const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Routers);
const PORT = process.env.PORT || 8000;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const URL = process.env.MONGODB_URI || `mongodb+srv://${USERNAME}:${PASSWORD}@testproject.cotq4qt.mongodb.net/?retryWrites=true&w=majority`
Connection(URL);
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
}
app.listen(PORT, () => console.log(`server run successfully at${PORT}`)
);
DefaultData();
