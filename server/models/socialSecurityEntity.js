const city = require('../models').city;
const socialSecurityEntityType = require('../models').socialSecurityEntityType;
module.exports = (sequelizep, DataTypes) => {
    const socialSecurityEntity = sequelizep.define('socialSecurityEntity', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        code: DataTypes.STRING,
        name: DataTypes.STRING,
        identification: DataTypes.STRING,
        verificationNumber: DataTypes.STRING,
        address: DataTypes.STRING,
        phone: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        createUser: DataTypes.STRING,
        updatedAt: DataTypes.DATE,
        updateUser: DataTypes.STRING,
        isActive: DataTypes.BOOLEAN,
        idCity: {
            type: DataTypes.UUIDV1,

            references: {
                // This is a reference to another model
                model: city,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                /* deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE */
            }
        },
        idSocialSecurityEntityType: {
            type: DataTypes.UUIDV1,

            references: {
                // This is a reference to another model
                model: socialSecurityEntityType,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                /* deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE */
            }
        },

    }, { freezeTableName: true });
    /* console.log(usuario === sequelize.models.usuario); */
    return socialSecurityEntity;
}