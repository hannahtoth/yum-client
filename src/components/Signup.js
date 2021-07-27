import { useState } from "react";
import AppLoggedIn from "./AppLoggedIn";

const Signup = (props) => {
  const [confirmPassword, setConfirmPassword] = useState();
  const [failMessage, setFailMessage] = useState("");

  const checkForNumsAndChars = (str) => {
    const chars = "1234567890!@#$%^&*()"

    for (let i=0; i<chars.length; i++) {
      if(str.indexOf(chars[i]) > -1 ) {
        return true
      } else {
        return false
      }
    }
  }
  
  const confirmAndSend = (e) => {
   if (props.password !== confirmPassword){
     setFailMessage("Passwords must match!")
   } else if (props.password.length < 5){
     setFailMessage("Please make your password longer!")
   } else if (checkForNumsAndChars(props.password) === false){
     setFailMessage("Please use a number or special character in your password!")
   } else if (props.username.length < 4){
     setFailMessage("Please make your username longer!")
   } else {
     setFailMessage("")
     props.signUpForm(e)
   } }

  return (
    <>
      {props.loggedIn ? (
        <AppLoggedIn sessionToken={props.sessionToken} />
      ) : (
        <form >
          <h1>Sign Up!</h1>
          <label>Username: </label>
          <input
            onChange={(e) => props.setUsername(e.target.value)}
          ></input>
          <br />
          <br />
          <label>Password: </label>
          <input
            type="password"
            onChange={(e) => props.setPassword(e.target.value)}
          ></input>
          <br />
          <br />
          <label
          style={{
              textAlign: 'left'
          }}> Confirm: </label>
          <input 
            style={{
               marginLeft: 15,
            }}
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
          <br />
          <button
            type="button"
            size="large"
            style={{
              backgroundColor: "#476040",
              color: "#D2DAC3",
              margin: 10,
            }}
            onClick={confirmAndSend}
          >
            Sign Up
          </button>
          <br />         
          <a style={{
                          color: '#b55139',
                        }}
        onClick={props.toggle}>Already have an account?</a>
        </form>

      )}{failMessage ? <p>{failMessage}</p> : <></>}
    </>
  );
};

export default Signup
