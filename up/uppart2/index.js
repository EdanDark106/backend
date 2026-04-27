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

app.get('/', async (req, res) => {
    const [resultado] = await pool.query('SELECT * FROM productos');
    res.send(resultado);
});

const PUERTO = 3001;
app.listen(PUERTO, () => {
    console.log('servidor backend en http://localhost:${PUERTO}');
});