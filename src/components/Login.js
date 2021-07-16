import AppLoggedIn from "./AppLoggedIn";

const Login = (props) => {

    return (
        <>
            {
            props.loggedIn ? 
            <AppLoggedIn sessionToken={props.sessionToken} /> :
                <form>
                    <h1>Login</h1>
                    <label>Username: </label>
                    <input placeholder={props.username} onChange={e => props.setUsername(e.target.value)}></input>
                    <br />

                    <label>Password:</label>
                    <input type="password" onChange={e => props.setPassword(e.target.value)}></input>
                    <br />
                    

                    <button type="button" onClick={props.loginForm} 
                 
                    variant="contained"
                    size="large"
                    style={{
                    backgroundColor:"#476040",
                    color: "white",
                    margin: 10,}}
                        >Login</button>
                    <br />
                    <a onClick={props.toggle}>Don't have an account?</a>
                   
                </form>}

        </>

    )
}

export default Login
