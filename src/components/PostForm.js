import React from 'react'
import {Form, Button} from 'semantic-ui-react'
import {useForm} from '../util/hooks'
import {gql, useMutation} from '@apollo/client'
import {Fetch_post_query} from '../util/graphql'


const PostForm = () =>{

    const {values, onChange, onSubmit} = useForm(createPostCallback, {
        body : ''
    })

    
    const [createPost, {error}] = useMutation(Create_Post_Mutation, {
        variables : values,
        update(proxy, result){
            const data = proxy.readQuery({
                query:Fetch_post_query
            })
            
            proxy.writeQuery({
                query:Fetch_post_query, 
                data:{
                    getAllPosts:[ result.data.createPost, ...data.getAllPosts]
                }
            })
            values.body = ''
        }
    })

    function createPostCallback (){
        createPost()
    }

return (
    <>
    <Form onSubmit = {onSubmit}>
    <h2>Create a post:</h2>
    <Form.Field>
        <Form.Input
         placeholder = 'Hi world' 
             name = 'body'
             onChange = {onChange}
             value = {values.body}
             error = {error? true:false}
         />

    <Button type = 'submit' color= 'teal'>
        Submit
    </Button>
    </Form.Field>
</Form>
{error && (
    <div className = 'ui error message' style = {{marginBottom:20}}>
        <ul className='list'>
            <li>
                {error.graphQLErrors[0].message}
            </li>
        </ul>
    </div>
)}
</>
    
)
}

const Create_Post_Mutation = gql`
mutation createPost($body:String!){
    createPost(body: $body){
        id 
        body 
        createdAt 
        username

        likes{
            id 
            username 
            createdAt
        }

        likeCount

        comments{
            id
            body
            username createdAt
        }

        commentCount
    }
}

`

export default PostForm 





