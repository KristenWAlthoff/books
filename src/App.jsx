import React from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import LoginContainer from './Containers/LoginContainer.jsx';
import HomeContainer from './Containers/HomeContainer.jsx';

const App = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<HomeContainer/>} />
                <Route path='/login' element={<LoginContainer/>} />
            </Routes>
        </div>
    )
}

export default App;