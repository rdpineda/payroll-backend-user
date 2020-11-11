const AccountType = require('../models').accountType
const Bank = require('../models').bank
const Employee = require('../models').employee

module.exports = (sequelize, DataTypes) => {
    const employeePayment = sequelize.define("employeePayment", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },

        accountNumber: DataTypes.NUMERIC,
        createdAt: DataTypes.DATE,
        createUser: DataTypes.STRING,
        updatedAt: DataTypes.DATE,
        updateUser: DataTypes.STRING,
        isActive: DataTypes.BOOLEAN,

        idBank: {
            type: DataTypes.UUID,

            references: {
                // This is a reference to another model
                model: Bank,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                /* deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE */
            }
        },

        idAccountType: {
            type: DataTypes.UUID,

            references: {
                // This is a reference to another model
                model: AccountType,

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

    return employeePayment;
}