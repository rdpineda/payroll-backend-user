const ContractType = require('../models').contractType
const Employee = require('../models').employee

module.exports = (sequelize, DataTypes) => {
    const employeeContract = sequelize.define("employeeContract", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },

        initialContractDate: DataTypes.DATE,
        endContractDate: DataTypes.DATE,
        createdAt: DataTypes.DATE,
        createUser: DataTypes.STRING,
        updatedAt: DataTypes.DATE,
        updateUser: DataTypes.STRING,
        isActive: DataTypes.BOOLEAN,

        idContractType: {
            type: DataTypes.UUID,

            references: {
                // This is a reference to another model
                model: ContractType,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                /* deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE */
            }
        },
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



    }, { freezeTableName: true });

    return employeeContract;
}