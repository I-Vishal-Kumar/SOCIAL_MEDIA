import { gql } from "graphql-request";

export const GET_USERS = gql`
  query GetUsers {
    usersCollection{
     edges{
       node{
         username
         created_at
         id
       }
     }
   }
}
`;
export const GET_POSTS = gql`
query GetPosts {
  postsCollection {
    edges{
      node{
        caption
        id
        created_at
        file_url
        user_id
        
        
        users {
          username
          email 
          avatar
        }
      }
    }
  }
}
`
export const GET_SUGGESTIONS = gql`query getSuggestions($user_id: Number!) {
  usersCollection (filter : { id : {neq: $user_id } }) {
    edges{
      node{
        id username avatar
        
        folowers_listCollection (filter : {folower_id:{eq: $user_id}} ) {
          edges{
            node{
              folowing_id
            }
          }
        }
        
      }
    }
  }
}`


export const SEARCH_USERS_QUERY = gql`
  query SearchUsers($searchTerm: String!) {
    usersCollection(filter: { username: { startsWith: $searchTerm } }) {
      edges {
        node {
          id
          username
          avatar
        }
      }
    }
  }
`;


export const INSERT_POST = gql`
  mutation InsertPost($content: String!, $user_id: Int!) {
    insert_posts(objects: { content: $content, user_id: $user_id }) {
      returning {
        id
        content
        user_id
        created_at
      }
    }
  }
`;

