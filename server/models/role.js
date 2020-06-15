module.exports = (sequelize, DataTypes) => {
    const rol = sequelize.define('rol', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        name: DataTypes.STRING,
        createUser: DataTypes.STRING,
        updateUser: DataTypes.STRING,
        isActive: DataTypes.BOOLEAN

    }, { freezeTableName: true });

    return rol;
}