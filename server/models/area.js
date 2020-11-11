const Company = require('../models').company;
module.exports = (sequelizep, DataTypes) => {
    const area = sequelizep.define('area', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        description: DataTypes.STRING,
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

    }, { freezeTableName: true });
    /* console.log(usuario === sequelize.models.usuario); */
    return area;
}