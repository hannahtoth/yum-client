import { useState } from 'react'
import AppLoggedIn from './AppLoggedIn'

const Signup = (props) => {
    const [confirmPassword, setConfirmPassword] = useState()
    const [failMessage, setFailMessage] = useState('')


    const confirmAndSend = (e) => {
        if (props.password === confirmPassword) {
            props.signUpForm(e)
        } else {
            setFailMessage("Passwords must match")
            setTimeout(() => { setFailMessage("") }, 2000)
        }
    }

    return (
        <>
            {props.loggedIn ?
                <AppLoggedIn sessionToken={props.sessionToken} /> :
                <form>
                    <h1>Sign Up!</h1>
                    <label>Username: </label>
                    <input placeholder={props.username} onChange={e => props.setUsername(e.target.value)}></input>
                    <br />
                    <label>Password: </label>
                    <input type="password" onChange={e => props.setPassword(e.target.value)}></input>
                    {console.log(props.password)}
                    <br />
                    <label >Confirm: </label>
                    <input type="password" onChange={e => setConfirmPassword(e.target.value)}></input>
                    {console.log(confirmPassword)}
                    <br />
                    <a onClick={props.toggle}>Already have an account?</a>
                    <button type="button" onClick={confirmAndSend}>Sign Up</button>
                </form>
            } </>
    )
}

export default Signup