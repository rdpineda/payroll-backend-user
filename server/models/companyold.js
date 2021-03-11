const Tenant = require('.').tenant;
const User = require('.').user;
module.exports = (sequelize, DataTypes) => {
    const companyold = sequelize.define("companyold", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        name: DataTypes.STRING,
        startDemoDay: DataTypes.DATE,
        demoDay: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        createUser: DataTypes.STRING,
        updatedAt: DataTypes.DATE,
        updateUser: DataTypes.STRING,
        isActive: DataTypes.BOOLEAN,
        idTenant: {
            type: DataTypes.UUID,

            references: {
                // This is a reference to another model
                model: Tenant,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                /* deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE */
            }
        },
        idUser: {
            type: DataTypes.UUID,

            references: {
                // This is a reference to another model
                model: User,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                /* deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE */
            }
        },
        img: DataTypes.STRING,

    }, { freezeTableName: true });

    return companyold;
}