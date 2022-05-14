//ADD IN IMPORTS
import React, { useEffect, useState, useContext } from 'react';
import readerNameContext from '../Contexts/readerNameContext.js';
import readerIDContext from '../Contexts/readerIDContext.js';
import { Link } from 'react-router-dom';


const LoginContainer = (props) => {
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const { reader_id, setReader_ID } = useContext(readerIDContext)
    const { readerName, setReaderName } = useContext(readerNameContext)

    const login = (e) => {
        e.preventDefault();
        const body = {
            username: usernameInput,
            password: passwordInput
        };
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then((data) => data.json())
            .then((result) => {
                if (result > 0) {
                    setReader_ID(result);
                    setReaderName(usernameInput);
                }
                else alert('Username or password invalid. Please try again.')
            })
            .catch((err) => {
                alert('Username or password invalid. Please try again.')
                setUsernameInput('')
                setPasswordInput('')
            })
    }

    const handleUsernameChange = e => setUsernameInput(e.target.value);
    const handlePasswordChange = e => setPasswordInput(e.target.value);

    return (
        <div>
            <h1>book/nook</h1>

            <input
                id='usernameInput'
                className='form-control'
                placeholder='Username'
                value={usernameInput}
                onChange={handleUsernameChange}
            ></input>

            <input
                id='passwordInput'
                placeholder='Password'
                type='password'
                value={passwordInput}
                onChange={handlePasswordChange}
            ></input>


            <button
                type='submit'
                id='loginButton'
                onClick={login}
            >Log In
            </button>

            <Link to='/signUp'>
                <button>
                    Sign Up
                </button>
            </Link> 

            <div>
                <h3>Reader ID: {reader_id}</h3>
            </div>
            <div>
                <h3>{readerName}</h3>
            </div>
            <Link to='/'>
                <button>
                    Home
                </button>
            </Link>
        </div>
    )
}


export default LoginContainer