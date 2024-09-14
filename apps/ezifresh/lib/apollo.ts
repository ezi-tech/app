import { ApolloClient, InMemoryCache } from "@apollo/client";


export const apolloClient = new ApolloClient({
  uri: "https://ezifarmer-sandbox.myshopify.com/api/2023-07/graphql.json",
  cache: new InMemoryCache(),
  headers: {
    "X-Shopify-Storefront-Access-Token": "3b58269ba0b4bf917fffa87bb005cf8c",
  },
});