const SalaryType = require('../models').salaryType
const Employee = require('../models').employee

module.exports = (sequelize, DataTypes) => {
    const employeeSalary = sequelize.define("employeeSalary", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },

        initialSalaryDate: DataTypes.DATE,
        endSalaryDate: DataTypes.DATE,
        salary: DataTypes.REAL,
        createdAt: DataTypes.DATE,
        createUser: DataTypes.STRING,
        updatedAt: DataTypes.DATE,
        updateUser: DataTypes.STRING,
        isActive: DataTypes.BOOLEAN,

        idSalaryType: {
            type: DataTypes.UUID,

            references: {
                // This is a reference to another model
                model: SalaryType,

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

    return employeeSalary;
}