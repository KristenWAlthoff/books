import React, { useEffect, useState, useContext } from 'react';
import readerNameContext from '../Contexts/readerNameContext.js';
import readerIDContext from '../Contexts/readerIDContext.js';
import { Link } from 'react-router-dom';

const MyPageContainer = (props) => {
    const { readerName } = useContext(readerNameContext);
    const { reader_id } = useContext(readerIDContext);
    const [bookList, setBookList] = useState([])

    const getBooks = () => {
        fetch(`http://localhost:3000/findBooks/${reader_id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then((data) => data.json())
            .then((result) => {
                //console.log(result)
                setBookList(result);
            })
            .catch((err) => {
                alert(`You haven't added any books yet, ${readerName}! Add some to see them here`);
            })
    }

    useEffect(() => getBooks(), [])

    const books = [];

    for (let i = 0; i < bookList.length; i++) {
        const { book_title } = bookList[i]
        books.push(
            <div>
                <Link to={'/book/' + book_title.split(' ').join('-')}>
                    {book_title}
                </Link>
            </div>
            
        )
    }

    return (
        <div>
            <h1>
                Hey {readerName}!
            </h1>
            {books}
        </div>
    )
}

export default MyPageContainer;