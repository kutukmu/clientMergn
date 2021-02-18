import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import './App.css'
import {Container} from 'semantic-ui-react'
import Menubar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import {AuthProvider} from './context/auth'
import AuthRoute from './util/Authroute'
import SinglePagePost from './pages/singlePagePost'



const App = () =>{
    return (
        <AuthProvider>
            <Router>
        <Container>
            <Menubar></Menubar>
            <Route exact path="/" component = {Home}></Route>
            <AuthRoute exact path = "/login" component = {Login}></AuthRoute>
            <AuthRoute exact path = "/register" component = {Register}></AuthRoute>
            <Route  exact path = '/posts/:postId' component = {SinglePagePost}/>
        
        </Container>
            
        </Router>
        </AuthProvider>
    )
}

export default App




