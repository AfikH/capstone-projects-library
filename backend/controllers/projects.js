import Db from "../lib/db.js";

const getAllProjects = async (cb) => {
    let db = new Db();

    try{
        await db.createConnection();
        await db.prepare('SELECT * FROM projects');
        let result = await db.execute();

        return cb(false, result);
    }catch(error){
        console.log(error);
        return cb({ msg: 'Error fetching projects table.' }, result);
    }
}