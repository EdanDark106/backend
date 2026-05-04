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

app.get('/:id', async (req, res) => {
    const id = req.params.id;
    const [resultado] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
    res.send(resultado[0]);
});

app.post('/', async(req, res) => {
    const{nombre,precio} = req.body;
    const [resultado] = await pool.query(
        'INSERT INTO productos(nombre,precio)objectToValues(?,?)',
        [nombre, precio]); 
    res.send(resultado);
})

app.patch('/:id', async(req, res) => {
    const id = req.params.id;
    const{nombre,precio} = req.body;
    const [resultado] = await pool.query(
        'UPDATE productos set nombre = ?, precio = ? WHERE id = ?',
        [nombre, precio,id]); 
    res.send(resultado);
})

app.delete('/:id', async(req, res) => {
    const id = req.params.id;
    const [resultado] = await pool.query(
        'DELETE FROM productos WHERE id = ?',
        [id]); 
    res.send({mensaje:'producto eliminado correctamente' });
})

const PUERTO = 3001;
app.listen(PUERTO, () => {
    console.log('servidor backend en http://localhost:${PUERTO}');
});