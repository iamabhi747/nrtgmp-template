// Repurposing the graphql-tools loadFilesSync function to load all the files in the datasources folder
import { loadFilesSync } from '@graphql-tools/load-files'
import { sequelize } from './connection';

const raw_models = loadFilesSync("src/sequelize/models/**/*.model.js");

raw_models.forEach(model => {
    model.model.init(model.defination, {
        sequelize,
        modelName: model.modelName
    });
});

const sequelize_prefix = process.env.SEQUELIZE_PREFIX || 'pg';

const datasources = Object.fromEntries(
    Object.entries(sequelize.models).map(([modelName, model]) => {
        return [`${sequelize_prefix}${modelName}DataSource`, model];
    })
);

export { datasources as sequelizeDatasources };