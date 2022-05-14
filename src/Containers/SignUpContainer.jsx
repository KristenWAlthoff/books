import React, { useEffect, useState, useContext } from 'react';
import readerNameContext from '../Contexts/readerNameContext.js';
import readerIDContext from '../Contexts/readerIDContext.js';
import { Link } from 'react-router-dom'


const SignUpContainer = (props) => {
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const { reader_id, setReader_ID } = useContext(readerIDContext)
    const { readerName, setReaderName } = useContext(readerNameContext)

    const signUp = (e) => {
        e.preventDefault();
        const body = {
            username: usernameInput,
            password: passwordInput,
            email: emailInput
        };
        fetch('http://localhost:3000/signUp', {
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
                else alert('Username already in use. Please try again.')
            })
            .catch((err) => {
                alert('Username already in use. Please try again.')
                setUsernameInput('')
                setPasswordInput('')
            })
    }

    const handleUsernameChange = e => setUsernameInput(e.target.value);
    const handlePasswordChange = e => setPasswordInput(e.target.value);
    const handleEmailChange = e => setEmailInput(e.target.value);

    return (
        <div>
            <input
                id='usernameInput'
                placeholder='Username'
                value={usernameInput}
                onChange={handleUsernameChange}
            >
            </input>

            <input
                id='passwordInput'
                type='password'
                placeholder='Password'
                value={passwordInput}
                onChange={handlePasswordChange}
            >
            </input>

            <input
                id='emailInput'
                placeholder='Email Address'
                value={emailInput}
                onChange={handleEmailChange}
            >
            </input>

            <button
                type='submit'
                onClick={signUp}
            >
                Submit
            </button>

        </div>
    )
}


export default SignUpContainer;