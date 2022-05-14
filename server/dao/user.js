const db = require('../db/db');

class UserDAO {
    //ADD A NEW USER
    async createUser(username, password, email) {
        const [id] = await db('readers')
            .insert({username, password, email})
            .returning('id');
        return id;
    }

    //UPDATE USERNAME
    async updateUsername(user_id, username) {
        await db('readers')
            .where({id: user_id})
            .update({username})
        return('updated user')
    }

    //CHECK IF USER IN DB
    async validateUser(username, password){
        try{
            const id = await db('readers')
            .where({
                username,
                password
            })
            .select({id})
            return id;
        }
        catch(err){
            return('Error');
        }
    }
}

module.exports =  new UserDAO

//this will need to be required into any middleware that's making use of this db
//this is a promise so it needs to be returned when used