import { GraphQLClient } from "graphql-request";

const SUPABASE_GRAPHQL_URL = import.meta.env.VITE_GQL_API_URL;

export const graphqlClient = new GraphQLClient(SUPABASE_GRAPHQL_URL, {
  headers: {
    apikey: import.meta.env.VITE_GQL_API_KEY
   },
});
