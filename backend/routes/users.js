import express from 'express';
import bcrypt from 'bcrypt';

import * as users from '../controllers/users.js';
import * as token from '../lib/token.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/authenticate', async (req, res) => {
    try{
        let hashedPassword = await users.getHashedPasswordByEmail(req.body.email);
        
        let authenticated = await bcrypt.compare(req.body.password, hashedPassword);

        if(!authenticated){
            throw { status: 401, msg: "Wrong email or password." }
        }

        // Set cookie    
        res.cookie('access_token', token.generate(req.body.email), {
            maxAge: 1000 * 60 * 15, // would expire after 15 minutes
            httpOnly: true, // The cookie only accessible by the web server
            signed: true // Indicates if the cookie should be signed
        });

        res.status(200).json({
            ok: true,
            msg: "User has been authenticated successfully."
        });
    }catch(error){
        console.log(error);
        res.status(error.status || 400).json({
            ok: false,
            msg: error.msg || "There was an error authenticating the user."
        });
    }
});

router.get('/:id', async (req, res) => {
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
            msg: error.msg || "There was an error creating a user."
        });
    }
});

router.post('/', async (req, res) => {
    let user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: '',
        phoneNumber: req.body.phoneNumber
    }

    try{
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

router.put('/:id', auth(), (req, res) => {
    // TODO:: Update user data with req.body data

    res.status(200).json({
        ok: true,
        msg: "User has been updated successfully."
    });
});

router.delete('/:id', async (req, res) => {
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

export default router;