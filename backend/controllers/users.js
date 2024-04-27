import Db from "../lib/db.js";

export const getOneById = async (id) => {
    let db = new Db();

    try{
        await db.createConnection();
        await db.prepare('SELECT user_id, email, first_name, last_name, phone_number FROM users WHERE user_id=? LIMIT 1');
        let result = await db.execute([parseInt(id)]);

        return result;
    }catch(errors){
        console.log(errors);
    }
}

export const getOneByEmail = async (email) => {
    let db = new Db();

    try{
        await db.createConnection();
        await db.prepare('SELECT * FROM users WHERE email=? LIMIT 1');
        let result = await db.execute([email]);

        return result;
    }catch(errors){
        console.log(errors);
    }
}

export const insertOne = async (user) => {
    let db = new Db();

    try{
        await db.createConnection();
        await db.prepare('INSERT INTO users (first_name, last_name, email, password, phone_number) VALUES (?,?,?,?,?)');
        let result = await db.execute([user.firstName, user.lastName, user.email, user.password, user.phoneNumber]);

        return result.insertId;
    }catch(errors){
        console.log(errors);
    }
}

export const deleteOne = async (id) => {
    let db = new Db();

    try{
        await db.createConnection();
        await db.prepare('DELETE FROM users WHERE user_id=? LIMIT 1');
        let result = await db.execute([parseInt(id)]);

        return result.affectedRows;
    }catch(errors){
        console.log('Error deleting user - /backend/controllers/users.js:deleteOne()');
        throw new Error();
    }
}

export const getHashedPasswordByEmail = async (email) => {
    let db = new Db();

    try{
        await db.createConnection();
        await db.prepare('SELECT password FROM users WHERE email=?');
        let result = await db.execute([email]);

        return result[0].password;
    }catch(errors){
        console.log(errors);
    }
}