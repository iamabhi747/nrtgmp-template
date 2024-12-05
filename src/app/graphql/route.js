import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mongoConnect } from "@/mongodb/connection";
import { mongoDatasources } from "@/mongodb/datasources";


const resolversArray = loadFilesSync('src/graphql/**/*.resolver.js');
const resolvers      = mergeResolvers(resolversArray);

const typeDefsArray  = loadFilesSync('src/graphql/**/*.graphql');
const typeDefs       = mergeTypeDefs(typeDefsArray);

await mongoConnect();

const server = new ApolloServer({ typeDefs, resolvers});
const handler = startServerAndCreateNextHandler(server, {
    context: async (req, res) => ({
        req, res,
        ds: mongoDatasources
    })
});

export { handler as GET, handler as POST };