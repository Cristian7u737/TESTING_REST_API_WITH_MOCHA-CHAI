/* importar modulos */
import { DataTypes } from "sequelize";
import db from '../config/connect.js';
/* Importar el modelo Alumno y Curso*/
import { Alumno } from './alumno.model.js';
import { Curso } from "./curso.model.js";
/* Primero recibe el nombre de la tabla */
export const Pago = db.define('Pago', {
    /* Recibe un objeto, los atributos del modelo */
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    precioCurso: {
        type: DataTypes.INTEGER(10),
        allowNull: false
    },
    aportePago: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
    }
}, {
    /* tercer parametro del objeto */
    timestamps: false /* no coloca los createDate y updateDate */
});

/* Relacionar las tablas ONE TO MANY Curso - Pago*/
Curso.hasMany(Pago, { /* Un Curso puede tener muchos Pagos */
    foreignKey: 'cursoId',
    sourceKey: 'id'
});

Pago.belongsTo(Curso, {/* Un Pago pertenece a un Curso */
    foreignKey: 'cursoId',
    targetKey: 'id' /* clave a la que tienden a ser objetivo que seria de Curso */
});

/* Relacionar las tablas ONE TO MANY Alumno - Pago*/
Alumno.hasMany(Pago, { /* Un Alumno puede tener muchos Pagos */
    foreignKey: 'alumnoId',
    sourceKey: 'id'
});

Pago.belongsTo(Alumno, {/* Un Pago pertenece a un Alumno */
    foreignKey: 'alumnoId',
    targetKey: 'id' /* clave a la que tienden a ser objetivo que seria de Pago */
});

/* Para hacer que se SINCRONICE con la DB */ 
await Pago.sync();