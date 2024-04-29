import Db from "../lib/db.js";

export const insertOne = async (project) => {
    let db = new Db();

    try{
        await db.createConnection();
        await db.prepare('INSERT INTO projects (title, content, project_author) VALUES (?,?,?)');
        let result = await db.execute([project.title, project.content, parseInt(project.projectAuthor)]);

        return result.insertId;
    }catch(error){
        console.log(error);
        throw new Error();
    }
}

export const getAll = async () => {
    let db = new Db();

    try{
        await db.createConnection();
        await db.prepare('SELECT * FROM projects');
        let result = await db.execute();

        return result;
    }catch(error){
        console.log(error);
        throw new Error();
    }
}

export const getOneById = async (id) => {
    let db = new Db();

    try{
        await db.createConnection();
        await db.prepare('SELECT * FROM projects WHERE project_id=? LIMIT 1');
        let result = await db.execute([parseInt(id)]);

        return result[0];
    }catch(error){
        console.log(error);
        throw new Error();
    }
}

export const deleteOne = async (id) => {
    let db = new Db();

    try{
        await db.createConnection();
        await db.prepare('DELETE FROM projects WHERE project_id=? LIMIT 1');
        let result = await db.execute([parseInt(id)]);

        return result.affectedRows;
    }catch(error){
        console.log(error);
        throw new Error();
    }
}