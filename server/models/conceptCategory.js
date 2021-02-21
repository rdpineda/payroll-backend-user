module.exports = (sequelizep, DataTypes) => {
    const conceptCategory = sequelizep.define('conceptCategory', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        code: DataTypes.STRING,
        description: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        createUser: DataTypes.STRING,
        updatedAt: DataTypes.DATE,
        updateUser: DataTypes.STRING,
        isActive: DataTypes.BOOLEAN,


    }, { freezeTableName: true });

    conceptCategory.associate = (models) => {
        conceptCategory.hasMany(models.concept, {
            as: 'concepto'
        });
        models.concept.belongsTo(models.conceptCategory, { foreignKey: 'conceptCategoryId' });

    };
    /* console.log(usuario === sequelize.models.usuario); */
    return conceptCategory;
};