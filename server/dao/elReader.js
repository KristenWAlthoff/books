const { ContextExclusionPlugin } = require('webpack');
const db = require('../db/eldb');

const elReader = {}

elReader.validateUser = (username, password) => {
    const query = `SELECT _id FROM readers WHERE username=$1 and password=$2`
    const values = [username, password]
    db.query(query, values)
        .then((response) => {
            console.log(response.rows[0]._id)
            return response.rows[0]._id
        })
        .catch((err) => {
            return err;
        })
}

elReader.addUser = (username, password, email) => {
    const query = `INSERT INTO readers (username, password, email) VALUES ($1, $2, $3)`
    const values = [username, password, email]
    db.query(query, value)
        .then((response) => {
            if (response.rows.length) return response.rows[0]
            else return ''
        })
        .catch((err) => {
            return ''
        })
}

module.exports = elReader;