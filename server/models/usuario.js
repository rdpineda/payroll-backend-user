const Rol = require('../models').role;
module.exports = (sequelize, DataTypes) => {
    const usuario = sequelize.define('user', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        name: DataTypes.STRING,
        userName: DataTypes.STRING,
        password: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        createUser: DataTypes.STRING,
        updatedAt: DataTypes.DATE,
        updateUser: DataTypes.STRING,
        img: DataTypes.STRING,
        isActive: DataTypes.BOOLEAN,
        cellPhone: DataTypes.STRING,
        idRol: {
            type: DataTypes.UUID,

            references: {
                // This is a reference to another model
                model: Rol,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                /* deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE */
            }
        },

    }, { freezeTableName: true });
    /* console.log(usuario === sequelize.models.usuario); */
    return usuario;
}