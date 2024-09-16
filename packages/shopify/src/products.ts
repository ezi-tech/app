import { useQuery } from "@apollo/client";
import { graphql } from "./graphql";

export const listProductsQuery = graphql(`
  query listProducts {
    products(first: 250) {
      edges {
        node {
          id
          title
          images(first: 3) {
            edges {
              node {
                url
                height
                width
              }
            }
          }
          variants(first: 3) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`);

export const getProductQuery = graphql(`
  query getProduct($id: ID!) {
    product(id: $id) {
      id
      title
      description
      images(first: 3) {
        edges {
          node {
            url
            height
            width
          }
        }
      }
      variants(first: 3) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`);

export function useProducts() {
  return useQuery(listProductsQuery);
}

export function useProduct(id: string) {
  return useQuery(getProductQuery, { variables: { id } });
}
