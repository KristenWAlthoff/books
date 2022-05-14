import React, { useEffect, useState, useContext } from 'react';
import readerNameContext from '../Contexts/readerNameContext.js';
import readerIDContext from '../Contexts/readerIDContext.js';

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
        books.push(
            <h1>{bookList[i].book_title}</h1>
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