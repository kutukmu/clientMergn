import React, {createContext, useReducer} from 'react'
import jwtDecode from 'jwt-decode'

const initialState = {
    user:null
}

if(localStorage.getItem('jwtToken')){
    const token = jwtDecode(localStorage.getItem('jwtToken'))
    if(token.exp * 1000 < Date.now()){
        localStorage.removeItem('jwtToken')
    }else{
       initialState.user = token 
    }
}


const AuthContext  = createContext({
    user:null,
    login:(data) => {},
    logout: () => {}
})

function AuthReducer(state, action){
    switch(action.type){
        case "LOGIN":
            return{
                ...state,
                user:action.payload
            }
        case "LOGOUT":
            return {
                ...state,
                user:null
            }
        default:
            return state
    }
}

function AuthProvider(props){
    const [state, dispatch] = useReducer(AuthReducer,  initialState)
    
    
    const login = (data) => {
        localStorage.setItem('jwtToken', data.token)
        dispatch({
            type:"LOGIN",
            payload:data
        })
    }

    const logout = () =>{
        localStorage.removeItem('jwtToken')
        dispatch({
            type:"LOGOUT"
        })
    }

    return (
        <AuthContext.Provider
        value = {{user:state.user, login, logout}}
        {...props}
        ></AuthContext.Provider>
    )

}


export {AuthContext, AuthProvider}





