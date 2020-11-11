module.exports = (sequelizep, DataTypes) => {
    const workPlaceRisks = sequelizep.define('workPlaceRisks', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        code: DataTypes.STRING,
        description: DataTypes.STRING,
        percentaje: DataTypes.NUMBER,
        createUser: DataTypes.STRING,
        updateUser: DataTypes.STRING,
        isActive: DataTypes.BOOLEAN

    }, { freezeTableName: true });

    return workPlaceRisks;
}