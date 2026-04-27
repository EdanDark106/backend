import express from 'express';
import mysql3 from 'mysql2/promise';

const app = express();
app.use(express.json());

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'basededatos'
});

app.get('/', (req, res) => {
    res.send('desde GET');
});

const PUERTO = 3001;
app.listen(PUERTO, () => {
    console.log('servidor backend en http://localhost:${PUERTO}');
});