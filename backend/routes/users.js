import express from 'express';
import bcrypt from 'bcrypt';

import * as users from '../controllers/users.js';
import * as token from '../lib/token.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// insert user
router.post('/', async (req, res) => {
    try{
		console.log(req.body);
        let user = {
            firstName: req.body.firstName || '',
            lastName: req.body.lastName || '',
            email: req.body.email || '',
            password: req.body.password || '',
            phoneNumber: req.body.phoneNumber || ''
        }

		// Check if all fields provided.
		const emptyProperties = Object.keys(user).filter(property => !user[property]);
		if(emptyProperties.length > 0){
			throw { msg: `Fields: ${emptyProperties.toString()} wasn't provided and are required in order to create a new user.` }
		}

        // Check if user with the provided email address already exists in the database.
        if((await users.getOneByEmail(user.email)).length > 0){
            throw { msg: 'User with provided email address already exist.', status: 409 }
        }

        // Hashing password and updating user object.
        user.password = await bcrypt.hash(req.body.password, 12);
        
        // DB -> Creating new row in users table using user object.
        let userId = await users.insertOne(user);

        res.status(201).json({
            ok: true,
            msg: "User has been created successfully.",
            id: userId
        });
    }catch(error){
        res.status(error.status || 400).json({
            ok: false,
            msg: error.msg || "There was an error creating a user."
        });
    }
});

// get specific user
router.get('/:id', auth(), async (req, res) => {
    try{
        let user = await users.getOneById(req.params.id);

        if(user.length <= 0){
            throw { status: 404, msg: "User with specified id doesn't exist in the database." }
        }
    
        res.status(200).json({
            ok: true,
            msg: "User has been selected successfully.",
            user: user[0]
        });
    }catch(error){
        res.status(error.status || 400).json({
            ok: false,
            msg: error.msg || "There was an error getting the user from the database."
        });
    }
});

// get all users
router.get('/', auth(true), async (req, res) => {
    try{
		let allUsers = await users.getAll();

        if(allUsers.length <= 0){
            throw { status: 404, msg: "No users found." }
        }
    
        res.status(200).json({
            ok: true,
            msg: "Users has been selected successfully.",
            users: allUsers
        });
    }catch(error){
        res.status(error.status || 400).json({
            ok: false,
            msg: error.msg || "There's a problem getting users from the database."
        });
    }
});

// update user
router.put('/:id', auth(true), async (req, res) => {
	try{
		let user = {
			id: req.params.id,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email.toLowerCase(),
			phoneNumber: req.body.phoneNumber,
			admin: req.body.admin
		}

		let userFromDb = await users.getOneByEmail(user.email);

		// Check if user with the provided email address already exists in the database.
        if(userFromDb.length > 0 && userFromDb[0].user_id !== parseInt(user.id)){
            throw { msg: 'User with provided email address already exist.', status: 409 }
        }

        if(req.body.password){
			user.password = await bcrypt.hash(req.body.password, 12);
		}

		let affectedRows = await users.updateOne(user);

		if(affectedRows <= 0) throw {}

        res.status(200).json({
			ok: true,
			msg: "User has been updated successfully."
		});
    }catch(error){
        res.status(error.status || 400).json({
            ok: false,
            msg: error.msg || "There was an error updating the user."
        });
    }
});

// delete user
router.delete('/:id', auth(true), async (req, res) => {
    try{
        if((await users.deleteOne(req.params.id) <= 0)){
            throw { status: 404, msg: "User with specified id doesn't exist in the database." }
        }

        res.status(200).json({
            ok: true,
            msg: "User has been deleted successfully."
        });
    }catch(error){
        res.status(error.status || 400).json({
            ok: false,
            msg: error.msg || "There was an error creating a user."
        });
    }
});

// signin
router.post('/sign-in', async (req, res) => {
    try{
        let {id, hashedPassword} = await users.getHashedPasswordByEmail(req.body.email);
        
        let authenticated = await bcrypt.compare(req.body.password, hashedPassword);

        if(!authenticated){
            throw { status: 401, msg: "Wrong email or password." }
        }

        res.status(200).json({
            ok: true,
            msg: "User has been authenticated successfully.",
			token: token.generate({ id: id, email: req.body.email })
        });
    }catch(error){
        console.log(error);
        res.status(error.status || 400).json({
            ok: false,
            msg: error.msg || "There was an error authenticating the user."
        });
    }
});

// auth
router.post('/auth', async (req, res) => {
	try{
		let decoded = token.verify(req.body.token);

		let authorized = await users.checkIfAdmin(decoded.data.id, decoded.data.email);

		if(!authorized) throw { status: 401, msg: "User is not authorized." }

		res.status(200).json({
            ok: true,
            msg: "User is authorized."
        });
	}catch(error){
		console.log(error);
        res.status(error.status || 400).json({
            ok: false,
            msg: error.msg || "There was an error authorizing the user."
        });
	}
});

export default router;