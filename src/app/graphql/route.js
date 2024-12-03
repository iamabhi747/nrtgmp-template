import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";

const typeDefs=  `#graphql
    type User { 
        id: Int!
        name: String!
    }
    
    type Query {  
        users: [User!]
    }
`;

const resolvers = { 
    Query: {
        users: async (parent, args) => {
            return [{ id: 1, name: "John Doe" }]; 
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers });
const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };