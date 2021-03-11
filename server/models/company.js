const City = require('.').city;
const Tenant = require('.').tenant;
const State = require('.').state;
const Country = require('.').country;
const SocialSecurityEntity = require('.').socialSecurityEntity;
const IdentificationType = require('.').identificationType;
const User = require('.').user;

module.exports = (sequelize, DataTypes) => {
    const company = sequelize.define("company", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        identification: DataTypes.STRING,
        verificationNumber: DataTypes.STRING,

        name: DataTypes.STRING,
        startDemoDay: DataTypes.DATE,
        demoDay: DataTypes.INTEGER,
        address: DataTypes.STRING,
        phone: DataTypes.STRING,
        cellphone: DataTypes.STRING,
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

        idUser: {
            type: DataTypes.UUID,

            references: {
                // This is a reference to another model
                model: User,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                /* deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE */
            }
        },


    }, { freezeTableName: true });

    return company;
}