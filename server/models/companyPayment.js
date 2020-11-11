const PaymentFrequency = require('../models').paymentFrequency;
const Tenant = require('../models').tenant;
const PaymentMethod = require('../models').paymentMethod;
const Bank = require('../models').bank;
const AccountType = require('../models').accountType;

module.exports = (sequelize, DataTypes) => {
    const companyPayment = sequelize.define("companyPayment", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        accountNumber: DataTypes.NUMBER,
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
        idPaymentFrequency: {
            type: DataTypes.UUID,

            references: {
                // This is a reference to another model
                model: PaymentFrequency,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                /* deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE */
            }
        },
        idPaymentMethod: {
            type: DataTypes.UUID,

            references: {
                // This is a reference to another model
                model: PaymentMethod,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                /* deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE */
            }
        },
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


    }, { freezeTableName: true });

    return companyPayment;
}