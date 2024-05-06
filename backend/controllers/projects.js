import Db from "../lib/db.js";

export const insertOne = async (project) => {
    let db = new Db();

    try{
        await db.createConnection();
        await db.prepare('INSERT INTO projects (project_title, project_content, project_degree, project_author) VALUES (?,?,?,?)');
        let result = await db.execute([project.title, project.content, project.degree, parseInt(project.author)]);

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
        await db.prepare('SELECT projects.*, CONCAT(users.user_firstname, " ", users.user_lastname) AS project_author FROM projects INNER JOIN users ON projects.project_author = users.user_id ORDER BY projects.project_date_updated DESC');
        let result = await db.execute();

        return result;
    }catch(error){
        console.log(error);
        throw new Error();
    }
}

export const getOneById = async (id, join = true) => {
    let db = new Db();

    try{
        await db.createConnection();
        if(join){
			await db.prepare('SELECT projects.*, CONCAT(users.user_firstname, " ", users.user_lastname) AS project_author FROM projects INNER JOIN users ON projects.project_author = users.user_id WHERE project_id=? LIMIT 1');
		}else{
			await db.prepare('SELECT * FROM projects WHERE project_id=? LIMIT 1');
		}
        let result = await db.execute([parseInt(id)]);

        return result[0];
    }catch(error){
        console.log(error);
        throw new Error();
    }
}

export const updateOne = async (project) => {
	let db = new Db();

    try{
        await db.createConnection();
        await db.prepare('UPDATE projects SET project_title=?, project_content=?, project_degree=? WHERE project_id=?');
        let result = await db.execute([project.title, project.content, project.degree, parseInt(project.id)]);

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
        await db.prepare('DELETE FROM projects WHERE project_id=? LIMIT 1');
        let result = await db.execute([parseInt(id)]);

        return result.affectedRows;
    }catch(error){
        console.log(error);
        throw new Error();
    }
}