const ConceptCategory = require('../models').conceptCategory;
const ConceptType = require('../models').conceptType;
const Company = require('../models').company;

module.exports = (sequelizep, DataTypes) => {
    const concept = sequelizep.define('concept', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        code: DataTypes.STRING,
        description: DataTypes.STRING,
        companyId: {
            type: DataTypes.UUID,

            references: {

                model: Company,


                key: 'id',


            }
        },
        account: DataTypes.STRING,
        counterPart: DataTypes.STRING,

        conceptTypeId: {
            type: DataTypes.UUID,

            references: {

                model: ConceptType,


                key: 'id',


            }
        },
        conceptCategoryId: {
            type: DataTypes.UUID,

            references: {

                model: ConceptCategory,

                key: 'id',


            }
        },


        createUser: DataTypes.STRING,
        updateUser: DataTypes.STRING,
        isActive: DataTypes.BOOLEAN,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,

    }, {
        freezeTableName: true,

    });

    concept.associate = (models) => {
        concept.belongsToMany(models.accumulator, {
            as: 'concepto',
            through: models.conceptAccumulator,
            foreignKey: 'concept_id'
        });
    };

    concept.associate = (models) => {
        concept.belongsTo(models.conceptCategory, {
            foreignKey: 'conceptCategoryId',
            as: 'concepto'
        });
        models.conceptCategory.hasMany(models.concept);


    };






    return concept;


};