const ConceptCategory = require('../models').conceptCategory;
const ConceptType = require('../models').conceptType;
const Company = require('../models').company;
/* const accumulator = require('../models/accumulator');
const conceptAccumulator = require('../models/conceptAccumulator'); */
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
                // This is a reference to another model
                model: Company,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                /* deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE */
            }
        },
        account: DataTypes.STRING,
        counterPart: DataTypes.STRING,

        conceptTypeId: {
            type: DataTypes.UUID,

            references: {
                // This is a reference to another model
                model: ConceptType,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                /* deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE */
            }
        },
        conceptCategoryId: {
            type: DataTypes.UUID,

            references: {
                // This is a reference to another model
                model: ConceptCategory,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                /* deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE */
            }
        },


        createUser: DataTypes.STRING,
        updateUser: DataTypes.STRING,
        isActive: DataTypes.BOOLEAN,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,

    }, {
        freezeTableName: true,


        /* classMethods: {
            associate(models) {
                concept.hasMany(models.Accumulator, {
                    as: 'conceptos',
                    through: conceptAccumulator,
                    foreignKey: 'idConcept'
                });
            },
        }, */
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






    /* console.log(usuario === sequelize.models.usuario); */
    return concept;

    /* concept.associate = () => {
        concept.belongsToMany(accumulator, { as: 'concepts', through: conceptAccumulator, foreignKey: 'concept_id' });
    }; */
};