const ContractRegime = require('../models').contractRegime;
const EmployeeType = require('../models').employeeType;
const WorkingHour = require('../models').workingHour;
const WorkPlaceRisks = require('../models').workPlaceRisks;

module.exports = (sequelize, DataTypes) => {
    const employeeWorking = sequelize.define("employeeWorking", {
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

        idContractRegime: {
            type: DataTypes.UUID,

            references: {
                // This is a reference to another model
                model: ContractRegime,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                /* deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE */
            }
        },
        idEmployeeType: {
            type: DataTypes.UUID,

            references: {
                // This is a reference to another model
                model: EmployeeType,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                /* deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE */
            }
        },
        idWorkPlaceRisks: {
            type: DataTypes.UUID,

            references: {
                // This is a reference to another model
                model: WorkPlaceRisks,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                /* deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE */
            }
        },
        idWorkingHour: {
            type: DataTypes.UUID,

            references: {
                // This is a reference to another model
                model: WorkingHour,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                /* deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE */
            }
        },
        transportAssistence: DataTypes.BOOLEAN,
        variableSalary: DataTypes.BOOLEAN


    }, { freezeTableName: true });

    return employeeWorking;
}