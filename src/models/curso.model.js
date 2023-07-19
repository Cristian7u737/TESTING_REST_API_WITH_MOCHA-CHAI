/* importar modulos */
import { DataTypes } from "sequelize";
import db from '../config/connect.js';
/* Primero recibe el nombre de la tabla */
export const Curso = db.define('Curso', {
    /* Recibe un objeto, los atributos del modelo */
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    nombreCurso: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    precioCurso: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dateCurso: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
}, {
    /* tercer parametro del objeto */
    timestamps: false /* no coloca los createDate y updateDate */
});


/* Para hacer que se SINCRONICE con la DB */ 
await Curso.sync(); 
