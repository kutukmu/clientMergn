import React,{useContext, useState} from 'react'
import {Form, Button} from 'semantic-ui-react'
import {gql, useMutation} from '@apollo/client'
import {useForm} from '../util/hooks'
import {AuthContext} from '../context/auth'


const Register = (props) =>{
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({})
   

    const {onChange, onSubmit, values} = useForm(addHelper, {
        username:'',
        password:'',
        email:'',
        confirmPassword:''
    })

    
     const [addUser, {loading }] = useMutation(REGISTER_USER, {
        update(proxy, {data:{register:userData}}){
            context.login(userData)
            props.history.push('/')
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        }
        ,
        variables:values
    })
    
    function addHelper(){
        addUser()
    }
   
    return (
        <div className= 'form-container'>
            <Form onSubmit = {onSubmit} noValidate className = {loading ? 'loading': ''}>
                <h1>Register</h1>
                <Form.Input onChange = {onChange} error = {errors.username ? true: false} label = 'Username' placeholder = 'Username..' name='username' value={values.username}/>
                <Form.Input onChange = {onChange} error = {errors.email ? true: false} label = 'Email' placeholder = 'Email..' name='email' value={values.email}/>
                <Form.Input onChange = {onChange} error = {errors.password ? true: false} label = 'Password' placeholder = 'Password..' type = 'password' name='password' value={values.password}/>
                <Form.Input onChange = {onChange} error = {errors.confirmPassword ? true: false} label = 'Confirm Password' placeholder = 'Confirm Password..' type = 'password' name='confirmPassword' value={values.confirmPassword}/>
                <Button type='submit' primary>
                    Register
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


const REGISTER_USER = gql`
    mutation register(
        $username:String!
        $email: String!
        $password:String!
        $confirmPassword:String!
    ){
        register(
            registerInput:{
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ){
            id
            email
            username
            createdAt
            token
        }
    }
`

export default Register