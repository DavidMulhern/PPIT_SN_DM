// Importing use state
import userEvent from '@testing-library/user-event';
import React, {useState} from 'react';

const Login = () => {
    
    // State variables.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Front end to back end function. Making it asynchronus and wait for a repsonse.
    async function loginUser(event) {
        // This protects the event. E.g multiple submit clicks.
        event.preventDefault()
        const response = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            // Informing back end of the content type.
            headers: {
                'Content-Type': 'application/json',
            },
            // Passing the body 
            body: JSON.stringify({
                email,
                password,
            }),
        })

        // Convert it into JSON.
        const data = await response.json()

        if(data.user)
        {
            // Logins successful, store the token!
            localStorage.setItem('token', data.user)
            alert('Login Successful')
            window.location.href = '/UserPage'
        }
        else{
            alert('Please check username and password')
        }
    }

    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={loginUser}>
                <label>Email: </label>
                <input value={email}
                onChange={(e) => setEmail(e.target.value)}
                type = "text"
                placeholer="Email" 
                />
                <br />
                <label>Password: </label>
                <input value={password}
                onChange={(e) => setPassword(e.target.value)}
                type = "password"
                placeholer="Password" 
                />
                <br />
                <input type="submit" value="Login"/>
            </form>
        </div>
    )
};
export default Login;
