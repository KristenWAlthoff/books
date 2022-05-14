import React, { useContext, useEffect, useState, useParams } from 'react';
import readerNameContext from '../Contexts/readerNameContext.js';
import readerIDContext from '../Contexts/readerIDContext.js';

const BookContainer = (props) => {
    const { readerName } = useContext(readerNameContext);
    const { reader_id } = useContext(readerIDContext);
    
    //const { book_title } = useParams();

    return(
        <div>
            <h1>Books!</h1>
        </div>
    )
}


export default BookContainer;