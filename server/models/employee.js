const City = require('../models').city;
const Tenant = require('../models').tenant;
const State = require('../models').state;
const Country = require('../models').country;
const Gender = require('../models').gender;
const IdentificationType = require('../models').identificationType;
const Company = require('../models').company;

module.exports = (sequelize, DataTypes) => {
    const employee = sequelize.define("employee", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        identification: DataTypes.STRING,
        firstname: DataTypes.STRING,
        secondname: DataTypes.STRING,
        surname: DataTypes.STRING,
        secondsurname: DataTypes.STRING,
        birthDate: DataTypes.DATE,
        address: DataTypes.STRING,
        phone: DataTypes.STRING,
        cellPhone: DataTypes.STRING,
        email: DataTypes.STRING,
        img: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        createUser: DataTypes.STRING,
        updatedAt: DataTypes.DATE,
        updateUser: DataTypes.STRING,
        isActive: DataTypes.BOOLEAN,
        idCompany: {
            type: DataTypes.UUID,

            references: {
                // This is a reference to another model
                model: Company,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                /* deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE */
            }
        },
        idCity: {
            type: DataTypes.UUID,

            references: {
                // This is a reference to another model
                model: City,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                /* deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE */
            }
        },
        idState: {
            type: DataTypes.UUID,

            references: {
                // This is a reference to another model
                model: State,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                /* deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE */
            }
        },
        idCountry: {
            type: DataTypes.UUID,

            references: {
                // This is a reference to another model
                model: Country,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                /* deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE */
            }
        },
        idGender: {
            type: DataTypes.UUID,

            references: {
                // This is a reference to another model
                model: Gender,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                /* deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE */
            }
        },

        idIdentificationType: {
            type: DataTypes.UUID,

            references: {
                // This is a reference to another model
                model: IdentificationType,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                /* deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE */
            }
        },


    }, { freezeTableName: true });

    return employee;
}