module.exports = (sequelizep, DataTypes) => {
    const conceptGroup = sequelizep.define('conceptGroup', {
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


    }, { freezeTableName: true });
    /* console.log(usuario === sequelize.models.usuario); */
    return conceptGroup;
}