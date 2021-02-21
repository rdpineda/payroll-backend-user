    const concept = require('../models/concept');
    const accumulator = require('../models/accumulator');


    module.exports = (sequelize, DataTypes) => {
        const conceptAccumulator = sequelize.define('conceptAccumulator', {
            concept_id: {
                type: DataTypes.UUID,
                references: {
                    model: concept,
                    key: 'id'
                }
            },
            accumulator_id: {
                type: DataTypes.UUID,
                references: {
                    model: accumulator,
                    key: 'id'
                }
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,

        }, {
            freezeTableName: true,
            /*  classMethods: {
                 associate(models) {
                     Concept.belongsToMany(models.Accumulator, {
                         as: 'conceptos',
                         through: conceptAccumulator,
                         foreignKey: 'idConcept'
                     });
                 },
             }, */

        });

        /* Concept.hasMany(Accumulator);
        Accumulator.belongsTo(Concept);
        Concept.hasMany(ConceptAccumulator); */


        conceptAccumulator.associate = (models) => {
            console.log(models);
            models.concept.belongsToMany(models.accumulator, { through: conceptAccumulator, foreignKey: 'concept_id' });
            models.accumulator.belongsToMany(models.concept, { through: conceptAccumulator, foreignKey: 'accumulator_id' });

        };



        return conceptAccumulator;

    }