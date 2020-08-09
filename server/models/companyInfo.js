const City = require('../models').city;
const Tenant = require('../models').tenant;
const State = require('../models').state;
const Country = require('../models').country;
const SocialSecurityEntity = require('../models').socialSecurityEntity;
const IdentificationType = require('../models').identificationType;

module.exports = (sequelize, DataTypes) => {
    const companyInfo = sequelize.define("companyInfo", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        identification: DataTypes.STRING,
        verificationNumber: DataTypes.STRING,
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        phone: DataTypes.STRING,
        email: DataTypes.STRING,
        legalRepresentant: DataTypes.STRING,
        fundationDate: DataTypes.DATE,
        img: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        createUser: DataTypes.STRING,
        updatedAt: DataTypes.DATE,
        updateUser: DataTypes.STRING,
        isActive: DataTypes.BOOLEAN,
        idTenant: {
            type: DataTypes.UUID,

            references: {
                // This is a reference to another model
                model: Tenant,

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
        idEntityRisks: {
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
        idCompensationFund: {
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

    return companyInfo;
}