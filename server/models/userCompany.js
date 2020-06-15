const { Model, DataTypes, Deferrable } = require("sequelize");
const User = require('../models').user;
const Company = require('../models').company;
module.exports = (sequelize, DataTypes) => {
    const UserCompany = sequelize.define("userCompany", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        idUser: {
            type: DataTypes.UUID,

            references: {
                // This is a reference to another model
                model: User,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
        },
        idCompany: {
            type: DataTypes.UUID,

            references: {
                // This is a reference to another model
                model: Company,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.

                deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
        },
        createdAt: DataTypes.DATE,
        createUser: DataTypes.STRING,
        updatedAt: DataTypes.DATE,
        updateUser: DataTypes.STRING,

    }, { freezeTableName: true });

    return UserCompany;
}