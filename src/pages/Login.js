import React,{useContext, useState} from 'react'
import {Form, Button} from 'semantic-ui-react'
import {gql, useMutation} from '@apollo/client'
import {useForm} from '../util/hooks'
import {AuthContext} from '../context/auth'



const Login = (props) =>{
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({})
    const {onChange, onSubmit, values} = useForm(addHelper, {
        username:'',
        password:''
    })


     const [loginUser, {loading }] = useMutation(LOGIN_USER, {
        update(proxy, {data:{login:userData}}){
            context.login(userData)
            props.history.push('/')
        },
        
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables:values
    })

    function addHelper(){
        loginUser()
    }
   
    return (
        <div className= 'form-container'>
            <Form onSubmit = {onSubmit} noValidate className = {loading ? 'loading': ''}>
                <h1>Login</h1>
                <Form.Input onChange = {onChange} error = {errors.username ? true: false} label = 'Username' placeholder = 'Username..' name='username' value={values.username}/>
                <Form.Input onChange = {onChange} error = {errors.password ? true: false} label = 'Password' placeholder = 'Password..' type = 'password' name='password' value={values.password}/>
           
                <Button type='submit' primary>
                    Login
                </Button>
            </Form>
            

            {Object.keys(errors).length >0 && (
                <div className = 'ui error message'>
                <ul className = 'list'>
                    {
                        Object.values(errors).map(value =>(
                            <li key = {value}>{value}</li>
                        ))
                    }
                </ul>
            </div>
            )}
            
        </div>
    )
}


const LOGIN_USER = gql`
    mutation login(
        $username:String!
        $password:String!
    ){
        login(
                username: $username
                password: $password
        ){
            id
            email
            username
            createdAt
            token
        }
    }
`

export default Login