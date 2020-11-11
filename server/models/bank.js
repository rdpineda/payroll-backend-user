const City = require('../models').city;
module.exports = (sequelizep, DataTypes) => {
    const bank = sequelizep.define('bank', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        code: DataTypes.STRING,
        name: DataTypes.STRING,
        identification: DataTypes.STRING,
        address: DataTypes.STRING,
        phone: DataTypes.STRING,
        createUser: DataTypes.STRING,
        updateUser: DataTypes.STRING,
        isActive: DataTypes.BOOLEAN,
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

    }, { freezeTableName: true });

    return bank;
}