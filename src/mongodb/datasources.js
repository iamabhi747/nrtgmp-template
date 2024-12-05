// Repurposing the graphql-tools loadFilesSync function to load all the files in the datasources folder
import { loadFilesSync } from '@graphql-tools/load-files'

const raw_datasources = loadFilesSync("src/mongodb/models/**/*.datasource.js");
const datasources     = new Object();

raw_datasources.forEach((ds) => {
    const datasource = new ds.datasource({ modelOrCollection: ds.model });
    datasources[ds.name] = datasource;
});

export { datasources as mongoDatasources };