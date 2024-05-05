import mysql from 'mysql2/promise';

class Db{
    constructor(){
        this.connection;
    }

    async createConnection(){
        try{
            this.connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME
            });
        }catch(errors){
            throw {msg: 'Error creating a databse connection.', location: '/backend/lib/db.js:8', function: 'createConnection()'};
        }
    }

    async prepare(query){
        try{
            this.statement = await this.connection.prepare(query);
        }catch(errors){
			console.log(errors);
            throw {msg: 'Error preparing statement.', location: '/backend/lib/db.js:21', function: 'prepare()'};
        }
    }

    async execute(params = []){
        try{
            let [result] = await this.statement.execute([...params]);
			this.closeConnection();
            return result;
        }catch(errors){
            throw {msg: 'Error executing statement.', location: '/backend/lib/db.js:30', function: 'execute()'};
        }
    }

    closeConnection(){
		this.connection.end(error => {
			if(error) throw {msg: 'Error closing connection.', location: '/backend/lib/db.js:39', function: 'closeConnection()'};
		});
    }
}

export default Db;