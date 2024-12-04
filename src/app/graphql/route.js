import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';


const resolversArray = loadFilesSync('src/graphql/**/*.resolver.js');
const resolvers      = mergeResolvers(resolversArray);

const typeDefsArray  = loadFilesSync('src/graphql/**/*.graphql');
const typeDefs       = mergeTypeDefs(typeDefsArray);

const server = new ApolloServer({ typeDefs, resolvers });
const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };