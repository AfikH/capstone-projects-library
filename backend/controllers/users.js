import Db from "../lib/db.js";

export const insertOne = async (user) => {
    let db = new Db();

    try{
        await db.createConnection();
        await db.prepare('INSERT INTO users (user_firstname, user_lastname, user_email, user_password, user_phone_number) VALUES (?,?,?,?,?)');
        let result = await db.execute([user.firstName, user.lastName, user.email.toLowerCase(), user.password, user.phoneNumber]);

        return result.insertId;
    }catch(error){
        console.log(error);
    }
}

export const getOneById = async (id) => {
    let db = new Db();

    try{
        await db.createConnection();
        await db.prepare('SELECT user_id, user_email, user_firstname, user_lastname, user_phone_number, user_admin FROM users WHERE user_id=? LIMIT 1');
        let result = await db.execute([parseInt(id)]);

        return result;
    }catch(error){
        console.log(error);
    }
}

export const getOneByEmail = async (email) => {
    let db = new Db();

    try{
        await db.createConnection();
        await db.prepare('SELECT user_id, user_email FROM users WHERE user_email=? LIMIT 1');
        let result = await db.execute([email]);

        return result;
    }catch(error){
        console.log(error);
    }
}

export const getAll = async () => {
	let db = new Db();

    try{
		await db.createConnection();
        await db.prepare('SELECT user_id, user_firstname, user_lastname FROM users');
        let result = await db.execute();

        return result;
    }catch(error){
        console.log(error);
    }
}

export const updateOne = async (user) => {
	let db = new Db();

    try{
        await db.createConnection();
        await db.prepare(`UPDATE users SET user_firstname=?, user_lastname=?, user_email=?,${user.password ? ' user_password=?,' : ''} user_phone_number=?, user_admin=? WHERE user_id=?`);
		let escaped = [user.firstName, user.lastName, user.email.toLowerCase(), user.phoneNumber, user.admin, parseInt(user.id)];
		if(user.password) escaped = [user.firstName, user.lastName, user.email.toLowerCase(), user.password, user.phoneNumber, user.admin, parseInt(user.id)];
        let result = await db.execute(escaped);

        return result.affectedRows;
    }catch(error){
        console.log(error);
        throw new Error();
    }
}

export const deleteOne = async (id) => {
    let db = new Db();

    try{
        await db.createConnection();
        await db.prepare('DELETE FROM users WHERE user_id=? LIMIT 1');
        let result = await db.execute([parseInt(id)]);

        return result.affectedRows;
    }catch(error){
        console.log('Error deleting user - /backend/controllers/users.js:deleteOne()');
        throw new Error();
    }
}

export const getHashedPasswordByEmail = async (email) => {
    let db = new Db();

    try{
        await db.createConnection();
        await db.prepare('SELECT user_id, user_password, user_firstname, user_lastname FROM users WHERE user_email=? LIMIT 1');
        let result = await db.execute([email]);

        return {
            id: result[0].user_id,
            hashedPassword: result[0].user_password,
            firstName: result[0].user_firstname,
            lastName: result[0].user_lastname
        };
    }catch(error){
        console.log(error);
    }
}

export const checkIfAdmin = async (id, email) => {
    let db = new Db();

    try{
        await db.createConnection();
        await db.prepare('SELECT user_admin FROM users WHERE user_id=? AND user_email=? LIMIT 1');
        let result = await db.execute([id, email]);

        return Boolean(result[0].user_admin);
    }catch(error){
        console.log(error);
    }
}