import express from 'express';
import bcrypt from 'bcrypt';

import * as users from '../controllers/users.js';

const router = express.Router();

router.post('/authenticate', async (req, res) => {
    try{
        let hashedPassword = await users.getHashedPasswordByEmail(req.body.email);
        
        let authenticated = await bcrypt.compare(req.body.password, hashedPassword);

        if(!authenticated){
            throw { status: 401, msg: "Wrong email or password." }
        }

        res.status(200).json({
            ok: true,
            msg: "User has been authenticated successfully."
        });
    }catch(errors){
        res.status(errors.status || 400).json({
            ok: false,
            msg: errors.msg || "There was an error authenticating the user."
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
    }catch(errors){
        res.status(errors.status || 400).json({
            ok: false,
            msg: errors.msg || "There was an error creating a user."
        });
    }
});

router.put('/:id', (req, res) => {
    // TODO:: Update user data with req.body data

    res.status(200).json({
        ok: true,
        msg: "User has been updated successfully."
    });
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
    }catch(errors){
        res.status(errors.status || 400).json({
            ok: false,
            msg: errors.msg || "There was an error creating a user."
        });
    }
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
    }catch(errors){
        res.status(errors.status || 400).json({
            ok: false,
            msg: errors.msg || "There was an error creating a user."
        });
    }
});

export default router;