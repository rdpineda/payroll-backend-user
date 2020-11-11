const ConceptGroup = require('../models').conceptGroup;
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
        createdAt: DataTypes.DATE,
        createUser: DataTypes.STRING,
        updatedAt: DataTypes.DATE,
        updateUser: DataTypes.STRING,
        isActive: DataTypes.BOOLEAN,
        idConceptType: {
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
        idConceptGroup: {
            type: DataTypes.UUID,

            references: {
                // This is a reference to another model
                model: ConceptGroup,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                /* deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE */
            }
        },
        idCompany: {
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


    }, { freezeTableName: true });
    /* console.log(usuario === sequelize.models.usuario); */
    return concept;
}