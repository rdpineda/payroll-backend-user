module.exports = (sequelizep, DataTypes) => {
    const contractType = sequelizep.define('contractType', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        code: DataTypes.STRING,
        description: DataTypes.STRING,
        createUser: DataTypes.STRING,
        updateUser: DataTypes.STRING,
        isActive: DataTypes.BOOLEAN

    }, { freezeTableName: true });

    return contractType;
}