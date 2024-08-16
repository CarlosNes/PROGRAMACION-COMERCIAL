const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db.config');

// Crear instancia de Sequelize
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
});

const Empleado = sequelize.define('Empleado', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    puesto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaContratacion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    salario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    proyectoId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Proyectos',
            key: 'id'
        }
    }
}, {
    timestamps: false,  // Desactivar createdAt y updatedAt
    tableName: 'Empleados'
});

module.exports = Empleado;
