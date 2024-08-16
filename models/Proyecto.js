const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db.config');

// Crear instancia de Sequelize
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
});

const Proyecto = sequelize.define('Proyecto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fechaInicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fechaFin: {
        type: DataTypes.DATE,
        allowNull: true
    },
    porcentajeCompletado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    timestamps: false,  // Desactivar createdAt y updatedAt
    tableName: 'Proyectos'
});

module.exports = Proyecto;
