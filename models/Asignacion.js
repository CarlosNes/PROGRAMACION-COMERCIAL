'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Asignacion extends Model {
    static associate(models) {
      // Asociación con las tablas `empleados` y `proyectos`
      Asignacion.belongsTo(models.Empleado, { foreignKey: 'empleado_id' });
      Asignacion.belongsTo(models.Proyecto, { foreignKey: 'proyecto_id' });
    }
  };
  Asignacion.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    empleado_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'empleados',
        key: 'id'
      }
    },
    proyecto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'proyectos',
        key: 'id'
      }
    },
    fecha_asignacion: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fecha_liberacion: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    modelName: 'Asignacion',
    tableName: 'asignaciones',
    timestamps: false
  });
  return Asignacion;
};
