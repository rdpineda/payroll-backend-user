/* const concept = require('../models').concept;
const conceptAccumulator = require('../models').conceptAccumulator; */

module.exports = (sequelizep, DataTypes) => {

    const accumulator = sequelizep.define('accumulator', {
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

    }, {
        freezeTableName: true,



        /*  classMethods: {
             associate(models) {
                 accumulator.belongsToMany(models.concept, {
                     as: 'acumulador',
                     through: conceptAccumulator,
                     foreignKey: 'idAccumulator'
                 });
             },
         }, */



    });

    /* accumulator.associate = function(models) {
        accumulator.belongsToMany(models.Concept, {
            foreignKey: 'idAccumulator'
        });
    }; */

    /*     accumulator.associate = () => {
            accumulator.belongsToMany(concept, { as: 'accumulators', through: conceptAccumulator, foreignKey: 'accumulator_id' });
        } */

    accumulator.associate = (models) => {
        accumulator.belongsToMany(models.concept, {
            as: "acumulador",
            through: models.conceptAccumulator,

            foreignKey: "accumulator_id",
        });
    };


    return accumulator;


};

/* accumulator.associate = () => {
    accumulator.belongsToMany(concept, { as: 'accumulators', through: conceptAccumulator, foreignKey: 'accumulator_id' });
}; */