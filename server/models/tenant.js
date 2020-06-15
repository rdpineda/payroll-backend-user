module.exports = (sequelize, DataTypes) => {
    const tenant = sequelize.define('tenant', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        code: DataTypes.STRING,
        name: DataTypes.STRING,
        createUser: DataTypes.STRING,
        updateUser: DataTypes.STRING,
        isActive: DataTypes.BOOLEAN

    }, { freezeTableName: true });

    return tenant;
}