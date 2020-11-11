const CostCenter = require('../models').costCenter
const Area = require('../models').area
const Subsidiary = require('../models').subsidiary
const Position = require('../models').position
const Employee = require('../models').employee

module.exports = (sequelize, DataTypes) => {
    const employeeJob = sequelize.define("employeeJob", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },


        createdAt: DataTypes.DATE,
        createUser: DataTypes.STRING,
        updatedAt: DataTypes.DATE,
        updateUser: DataTypes.STRING,
        isActive: DataTypes.BOOLEAN,


        idEmployee: {
            type: DataTypes.UUID,

            references: {
                // This is a reference to another model
                model: Employee,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                /* deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE */
            }
        },
        idCostCenter: {
            type: DataTypes.UUID,

            references: {
                // This is a reference to another model
                model: CostCenter,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                /* deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE */
            }
        },
        idArea: {
            type: DataTypes.UUID,

            references: {
                // This is a reference to another model
                model: Area,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                /* deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE */
            }
        },
        idSubsidiary: {
            type: DataTypes.UUID,

            references: {
                // This is a reference to another model
                model: Subsidiary,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                /* deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE */
            }
        },
        idPosition: {
            type: DataTypes.UUID,

            references: {
                // This is a reference to another model
                model: Position,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                /* deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE */
            }
        },



    }, { freezeTableName: true });

    return employeeJob;
}