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

export const sequelizeDatasources = {
    postgresDatasource: sequelize
}