import React, { useState } from "react";
import { axiosWithAuth } from '../helpers/axiosWithAuth';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [ creds, setCreds ] = useState({
    username: 'Lambda School',
    password: 'i<3Lambd4',
    error: ''
  });

  const history = useHistory();

  const login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('http://localhost:5000/api/login', creds)
      .then(res => {
        console.log(res)
        localStorage.setItem("token", res.data.payload)
        history.push('/protected')
      })
      .catch(err => {
        console.log("Error: ", err)
      })
  }

  const handleChanges = e => {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value
    });
  };

  const { error } = "Username or Password is not valid."
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  
    // make a post request to retrieve a token from the api
    // when you have handled the token, navigate to the BubblePage route

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <form onSubmit={login}>
          <label>
            <input
              data-testid="username"
              type="text"
              name="username"
              placeholder="Username"
              value={creds.username}
              onChange={handleChanges}
              />
          </label>

          <label>
            <input
            data-testid="password"
            type="text"
            name="password"
            placeholder="Password"
            value={creds.password}
            onChange={handleChanges}
            />
          </label>
          <button>Log in</button>
        </form>
      </div>

      <p data-testid="errorMessage" className="error">{error}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE data-testid="username" and data-testid="password"
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.