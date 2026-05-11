import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';


const sequelize = new Sequelize('basededatos', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});


const conectaBD = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
    } catch (error) {
        console.error('Error de conexion: ', error);
        process.exit(1);     
    }
}

const app = express();
app.use(express.json());

conectaBD();


const Producto = sequelize.define('Producto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'productos',
    timestamps: false
});


app.get('/', async (req, res) => {
    const resultado = await Producto.findAll();
    res.send(resultado);
});

app.get('/', async (req, res) => {
    const resultado = await Producto.findByPk(req.params.id);
    res.send(resultado);
});

const PUERTO = 3001;
app.listen(PUERTO, () => {
    console.log(`Servidor backend en http://localhost:${PUERTO}`);
});


