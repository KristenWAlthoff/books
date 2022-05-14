const elReader = require("../dao/elReader");
const db = require('../db/eldb');


const readerController = {}

////ATTEMPT WITH USING A DAO FOR THE DATABASE... ASYNCRONICITY IS OFF... MAYBE HAVE TO USE SERVICE??
// readerController.loginReader = async (req, res, next) => {
//     const {username, password} = req.body;
//     elReader.validateUser(username, password)
//         .then((result) => {
//             res.locals.readerID = result;
//             return next()
//         })
//         .catch((err) => {
//             return next({
//                 log: `readerController.loginReader: ERROR ${err}`,
//                 message: {err: `loginController.loginReader: ERROR: Check server log for details`}
//             })
//         })
// }

readerController.login = (req, res, next) => {
    const {username, password} = req.body
    const query = `SELECT _id FROM readers WHERE username=$1 and password=$2`;
    const values = [username, password];
    db.query(query, values)
        .then((result) => {
            //console.log(result.rows)
            res.locals.readerID = result.rows[0]._id
            return next()
        })
        .catch((err) => {
            return next({
                log: `readerController.login: ERROR ${err}`,
                message: {err: `loginController.loginReader: ERROR: Check server log for details`}
            })
        })
}


readerController.signUp = (req, res, next) => {
    const {username, password, email} = req.body;
    const query = `INSERT INTO readers (username, password, email) VALUES ($1, $2, $3) RETURNING _id`
    values = [username, password, email]
    db.query(query, values)
        .then((result) => {
            res.locals.readerID = result.rows[0]._id
            return next()
        })
        .catch((err) => {
            return next({
                log: `readerController.signUp: ERROR: ${err}`,
                message: {err: `loginController.signUp: ERROR: Check server log for details`}
            })
        })
}

module.exports = readerController;