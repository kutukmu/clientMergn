import React, {useContext, useState} from 'react'
import {gql} from '@apollo/client'
import {useQuery, useMutation} from '@apollo/client'
import moment from 'moment'
import {AuthContext} from '../context/auth'
import { Icon } from 'semantic-ui-react'
import {Grid, Card, Image, Label, Button, Form} from 'semantic-ui-react'
import LikeButton from '../components/LikeButton'
import DeleteButton from '../components/DeleteButton'


export default function SinglePagePost( props) {
    const postId = props.match.params.postId
    const {user} = useContext(AuthContext)
const [comment, setComment] = useState('')

    const {data: {getPost} = {}} = useQuery(FETCH_POST, {
        variables:{
            postId
        }
    })
    const [submitComment] = useMutation(SUBMIT_COMMENT, {
        update(){
            setComment('')
        },
        variables:{
            postId,
            body:comment
        }
    })

    const deleteButtonCallback = () =>{
        props.history.push('/')
    }
    let postMarkup
    if(!getPost){
        postMarkup = <p>Loading post ...</p>
    }else{
        const {id, body, createdAt, username, comments,likes, likeCount, commentCount} = getPost
    
        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width = {2}>
                        <Image 
                        fluid
          
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'/>
                    </Grid.Column>
                    <Grid.Column width = {10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>
                                {username}
                                </Card.Header>
                                <Card.Meta>
                                {moment(createdAt).fromNow()}
                                </Card.Meta>
                                <Card.Description>
                                    {body}
                                </Card.Description>
                            </Card.Content>
                            <hr/>
                            <Card.Content>

                                <LikeButton user = {user} post = {{id, likeCount, likes}}/>
                                <Button 
                                as = 'div' 
                                labelPosition= 'right'
                                onClick = {() => console.log('like')}>
                        <Button basic color = "blue">
                                <Icon name = 'comments'/>

                        </Button>
                        <Label basic color = 'blue' pointing=  'left'>
                                {commentCount}
                                </Label>
                                </Button>
                                {user && user.username == username && (
                                    <DeleteButton postId = {id} callback = {deleteButtonCallback}/>
                                )}
                            </Card.Content>
                        </Card>
                        {user && (
                            <Card fluid>
                                <Card.Content>
                                <p>Post a Comment</p>
                                <Form>
                                    <div className = 'ui action input fluid'>
                                        <input 
                                        type = 'text' 
                                        placeholder = "Comment..."
                                        name = 'comment'
                                        value = {comment}
                                        onChange ={e => setComment(e.target.value)}
                                        ></input>
                                        <button type = 'submit' 
                                        disabled = {comment.trim() === ''}
                                        onClick = {submitComment}
                                        className = 'ui button teal'>
    Submit
                                        </button>
                                    </div>
                                </Form>
                                </Card.Content>
                            </Card>
                        )}
                        {comments.map(comment =>{
                            return <Card fluid key = {comment.id}>
                                <Card.Content>
                                {user && user.username === comment.username && (
                                    <DeleteButton postId = {id} commentId = {comment.id}/>
                                )}
                                    <Card.Header>
                                        {comment.username}
                                    </Card.Header>
                                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                                    <Card.Description>{comment.body}</Card.Description>
                                </Card.Content>
                            </Card>
                        })}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
    
    return (
        postMarkup
    )
}

const FETCH_POST = gql`
query($postId: ID!){
    getPost(postId:$postId){
        id body createdAt username likeCount
        likes{
            username
        }
        commentCount
        comments{
            id
            username
            createdAt
            body
        }
    }
}

`

const SUBMIT_COMMENT = gql`
    mutation($postId: String!, $body:String!){
        createComment(postId: $postId, body:$body){
            id
            comments{
                id
                body
                createdAt
                username
            }
            commentCount
        }
    }
`

