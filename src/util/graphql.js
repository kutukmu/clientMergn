import {gql} from '@apollo/client'

const Fetch_post_query = gql`{
    getAllPosts{
     id
     createdAt
     username
     body
     comments{
       id
       username
       body
     }
     likes{
       username
     }
     commentCount
     likeCount
   }
   }
   
`
export {Fetch_post_query}