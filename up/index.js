import express from "express"; 
import {check, validationResoult} from "express-validator";
const app = express();

app.use(express.json());

app.get('/',(req, res)=> {res.send('desde GET')});
app.post('/', async(req, res)=> {
    await check('nombre')
        .notEmpty().withMessage('El nombre no puede ir vacio').run(req);
    await check('nota')
        .notEmpty().withMessage('lanota no puede ir vacia').run(req)
        .isNumeric().withMessage('La nota debe ser numerica')
        .custom(resultado => resultado >= 0).withMessage('Lanota debe ser positiva')
        .run(req);
    const resultado = validationResoult;
    console.log(resultado.array()); //.maped()
    res.send(resultado.array());
    if (resultado.isEmpty()){
        return res.send({mensahe: resultado.array()});
    }
    /*console.log(req.body.nombre);
    //console.log(req.body.nota);
    const {nombre, nota} = req.body;
    if (nombre.length === 0) {
        console.log("nombre no valido");
    }*/
    res.send({mensahe: 'registro insertado'});
});

const puerto = 3001;
app.listen(puerto,
() => { console.log(`Servidor en
http://localhost:${puerto}`);
});



