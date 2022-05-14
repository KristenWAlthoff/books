//ADD IN IMPORTS
import React, { useEffect, useState, useContext } from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import readerNameContext from '../Contexts/readerNameContext.js';
import readerIDContext from '../Contexts/readerIDContext.js';


const HomeContainer = () => {
    const { reader_id, setReader_ID } = useContext(readerIDContext)
    const { readerName, setReaderName } = useContext(readerNameContext)

    return (
        <div>
            <h1>Home</h1>
            <h1>Welcome {readerName}!</h1>
            <Link
                to={'/myPage/' + readerName}
            >
                <button>
                    {readerName}'s Page
                </button>
            </Link>
        </div>
    )
}


export default HomeContainer