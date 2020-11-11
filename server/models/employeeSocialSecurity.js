const ContributorSubType = require('../models').contributorSubType;
const ContributorType = require('../models').contributorType;
const SocialSecurityEntity = require('../models').socialSecurityEntity;
const Employee = require('../models').employee;

module.exports = (sequelize, DataTypes) => {
    const employeeSocialSecurity = sequelize.define("employeeSocialSecurity", {
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
        idContributorType: {
            type: DataTypes.UUID,

            references: {
                // This is a reference to another model
                model: ContributorType,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                /* deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE */
            }
        },
        idContributorSubType: {
            type: DataTypes.UUID,

            references: {
                // This is a reference to another model
                model: ContributorSubType,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                /* deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE */
            }
        },
        idEntityHealth: {
            type: DataTypes.UUID,

            references: {
                // This is a reference to another model
                model: SocialSecurityEntity,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                /* deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE */
            }
        },
        idEntityPension: {
            type: DataTypes.UUID,

            references: {
                // This is a reference to another model
                model: SocialSecurityEntity,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                /* deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE */
            }
        },
        idEntitySeverance: {
            type: DataTypes.UUID,

            references: {
                // This is a reference to another model
                model: SocialSecurityEntity,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                /* deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE */
            }
        },



    }, { freezeTableName: true });

    return employeeSocialSecurity;
}