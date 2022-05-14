import React, { useEffect, useState, createContext, useContext } from 'react';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';

import LoginContainer from './Containers/LoginContainer.jsx';
import HomeContainer from './Containers/HomeContainer.jsx';
import MyPageContainer from './Containers/MyPageContainer.jsx'
import SignUpContainer from './Containers/SignUpContainer.jsx';
import BookContainer from './Containers/BookContainer.jsx';

import usernameContext from './Contexts/readerNameContext.js';
import readerIDContext from './Contexts/readerIDContext.js';

//const themeContext = React.createContext('light')

//you can also put state as the value of context so you can affect it by altering state in a component
//useContext is only for functional components

//Provider = declare the data that we want available thru component tree
//Consumer = allows any component in tree that needs that data to subscribe to it
    //wrap in .Consumer and pass as function to access

const App = () => {
    const [reader_id, setReader_ID] = useState(1);
    const [readerName, setReaderName] = useState('kristen')
    return (
        <usernameContext.Provider value={{readerName, setReaderName}}>
            <readerIDContext.Provider value={{reader_id, setReader_ID}}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<HomeContainer />} />
                        <Route path='/login' element={<LoginContainer />} />
                        <Route path='/myPage/:readerName' element={<MyPageContainer />} />
                        <Route path='/signUp' element={<SignUpContainer />} />
                        <Route path='/book/:book_title' element={<BookContainer />} />
                    </Routes>
                </BrowserRouter>
            </readerIDContext.Provider>
        </usernameContext.Provider>
    )
}

export default App;