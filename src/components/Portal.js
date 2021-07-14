import React from 'react'
import { PinDropSharp } from '@material-ui/icons'
import { useState, useEffect } from 'react'
import Login from './Login'
import Signup from './Signup'

const Portal = () => {
    const [showLogin, setShowLogin] = useState(true)
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [loggedIn, setLoggedIn] = useState(false)
    const [sessionToken, setSessionToken] = useState('')

    useEffect(() => {
        if (localStorage.getItem('token')){
            setSessionToken(localStorage.getItem('token'))
            setLoggedIn(true)
            console.log(localStorage)

        }
    }, [])



    const toggleLoginSignup = () => {
        setShowLogin(!showLogin)
    }

    const updateToken = (newToken) => {
        localStorage.setItem('token', newToken)
        setSessionToken(newToken)
        console.log(newToken)
        newToken ? setLoggedIn(true) : setLoggedIn(false)
        console.log(sessionToken)
    }

    const loginForm = (e) => {
        e.preventDefault()
        console.log(`${username}, ${password}`)
        fetch("http://localhost:3000/user/login", {
            method: 'POST',
            body: JSON.stringify({user:{username: username, password: password}}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (res) => res.json()
        ).then(json => {
            updateToken(json.sessionToken)
        })
    }

    const signUpForm = (e) => {
        e.preventDefault()
        console.log(`${username}, ${password}`)
        fetch("http://localhost:3000/user/register", {
            method: 'POST',
            body: JSON.stringify({user:{username: username, password: password}}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (res) => res.json()
        ).then(json => {
            updateToken(json.sessionToken)
        })
    }

    return (
        <>
            {showLogin
                ? <Login 
                    username={username}
                    setPassword={setPassword}
                    setUsername={setUsername}
                    toggle={toggleLoginSignup}
                    loginForm={loginForm}
                    loggedIn={loggedIn}
                    sessionToken={sessionToken}/>
                : <Signup
                    username={username}
                    setPassword={setPassword}
                    setUsername={setUsername}
                    toggle={toggleLoginSignup}
                    signUpForm={signUpForm}
                    password={password}
                    loggedIn={loggedIn}
                    sessionToken={sessionToken} />}
        </>
    )
}

export default Portal