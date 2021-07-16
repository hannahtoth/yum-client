import React from "react";
import { useState, useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Navbar from "./Navbar";

const Portal = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [sessionToken, setSessionToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
      setLoggedIn(true);
    }
  }, []);

  const toggleLoginSignup = () => {
    setShowLogin(!showLogin);
  };

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    newToken ? setLoggedIn(true) : setLoggedIn(false);
  };

  const loginForm = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/user/login", {
      method: "POST",
      body: JSON.stringify({
        user: { username: username, password: password },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        updateToken(json.sessionToken);
      });
  };

  const signUpForm = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/user/register", {
      method: "POST",
      body: JSON.stringify({
        user: { username: username, password: password },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        updateToken(json.sessionToken);
      });
  };

  const clearToken = (e) => {
      e.preventDefault()
      localStorage.clear()
      setSessionToken('')
      setLoggedIn(false)
  }

  return (
    <>
      <Navbar loggedIn={loggedIn} clearToken={clearToken} />

      {showLogin ? (
        <Login
          username={username}
          setPassword={setPassword}
          setUsername={setUsername}
          toggle={toggleLoginSignup}
          loginForm={loginForm}
          loggedIn={loggedIn}
          sessionToken={sessionToken}
        />
      ) : (
        <Signup
          username={username}
          setPassword={setPassword}
          setUsername={setUsername}
          toggle={toggleLoginSignup}
          signUpForm={signUpForm}
          password={password}
          loggedIn={loggedIn}
          sessionToken={sessionToken}
        />
      )}
    </>
  );
};

export default Portal;
