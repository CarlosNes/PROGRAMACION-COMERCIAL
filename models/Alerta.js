const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db.config');

// Crear instancia de Sequelize
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
});

const Alerta = sequelize.define('Alerta', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaFin: {
        type: DataTypes.DATE,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 'Alertas'
});

module.exports = Alerta;
