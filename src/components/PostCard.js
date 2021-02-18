import React, {useContext} from 'react'
import {Card, Icon, Label, Button, Image} from 'semantic-ui-react'
import moment from 'moment'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/auth'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'



const PostCard = ({post}) =>{
    const {body, createdAt, id, username, likeCount, commentCount, likes}  = post
    
    const {user} = useContext(AuthContext)

    const likePost = () =>{
    }

    const makeComment = () =>{
    }
    return (
        <Card.Group>
            <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as = {Link} to = {`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        
        <LikeButton post = {{id, likes, likeCount}} user={user}></LikeButton>

    <Button as='div' labelPosition='right' as = {Link} to = {`/posts/${id}`} style = {{marginLeft:5}}>
      <Button color='teal' basic>
        <Icon name='comments' />
      </Button>
      <Label  basic color='teal' pointing='left'>
        {commentCount}
      </Label>
    </Button>

    {user && user.username == username && <DeleteButton postId = {id} ></DeleteButton>}
   
       
      </Card.Content>
    </Card>
        </Card.Group>
    )
}


export default PostCard

