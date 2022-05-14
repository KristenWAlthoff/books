const { ContextExclusionPlugin } = require('webpack');
const db = require('../db/eldb');

const bookController = {}

//if the book is not yet saved for user, add to db
//if it is saved for them, alter the status
bookController.changeBookStatus = (req, res, next) => {
    const {reader_id, book_title, book_isbn, status} = req.body;
    const query = `SELECT status FROM readers_books WHERE reader_id=$1 AND book_isbn=$2`
    const values = [reader_id, book_isbn]
    db.query(query, values)
        .then((result) => {
            //if it is, alter status
            if (result.rows.length){
                const alterQuery = `UPDATE readers_books SET status=$1 WHERE reader_id=$2 AND book_isbn=$3 RETURNING status`;
                const alterVals = [status, reader_id, book_isbn];
                db.query(alterQuery, alterVals)
                    .then((result) => {
                        res.locals.bookStatus = result.rows[0].status
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } else {
                const addQuery = `INSERT INTO readers_books (reader_id, book_title, book_isbn, status) VALUES ($1, $2, $3, $4) RETURNING status`;
                const addVals = [reader_id, book_title, book_isbn, status];
                db.query(addQuery, addVals)
                    .then((result) => {
                        res.locals.bookStatus = result.rows[0].status
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
            //UPDATES THE START DATE TO WHEN THEY SWITCH STATUS TO READING
            if (status === 'Reading'){
                const startQuery = `UPDATE readers_books SET date_started=$1 WHERE reader_id=$2 AND book_isbn=$3 RETURNING status`;
                const today = new Date();
                const date_started = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                const startVals = [date_started, reader_id, book_isbn]
                db.query(startQuery, startVals)
                    .then((result) => {
                        res.locals.bookStatus = result.rows[0].status
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
            //UPDATES THE FINISHED DATE IF THEY MARK IT READ TODAY
            if (status === 'Read'){
                const startQuery = `UPDATE readers_books SET date_finished=$1 WHERE reader_id=$2 AND book_isbn=$3 RETURNING status`;
                const today = new Date();
                const date_finished = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                const startVals = [date_finished, reader_id, book_isbn]
                db.query(startQuery, startVals)
                    .then((result) => {
                        res.locals.bookStatus = result.rows[0].status
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
            return next();
        })
        .catch((err) => {
            return next(err);
        })
    //see if the book is in the db
}



bookController.findBooks = (req, res, next) => {
    const { reader_id } = req.params;
    console.log(reader_id)
    //find all of the books in the readers_books db for that reader and return the list
    const query = `SELECT * from readers_books WHERE reader_id=$1`;
    const values = [reader_id];
    db.query(query, values)
        .then((result) => {
            console.log(result.rows);
            res.locals.userBooks = result.rows;
            return next()
        })
        .catch((err) => {
            return next({
                log: `bookController.findBooks: ERROR ${err}`,
                message: {err: `bookController.findBooks: ERROR: Check server log for details`}
            })
        })
}


module.exports = bookController;