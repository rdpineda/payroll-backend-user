const Country = require('../models').country;
module.exports = (sequelizep, DataTypes) => {
    const state = sequelizep.define('state', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUID,
            primaryKey: true
        },
        code: DataTypes.STRING,
        name: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        createUser: DataTypes.STRING,
        updatedAt: DataTypes.DATE,
        updateUser: DataTypes.STRING,
        isActive: DataTypes.BOOLEAN,
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

    }, { freezeTableName: true });
    /* console.log(usuario === sequelize.models.usuario); */
    return state;
}