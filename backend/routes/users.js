import express from 'express';

const router = express.Router();

router.get('/:id', (req, res) => {
    // TODO:: Get user from db and return in response

    res.status(200).json({
        ok: true,
        msg: "User has been created successfully.",
        user: user
    });
});

router.put('/:id', (req, res) => {
    // TODO:: Update user data with req.body data

    res.status(200).json({
        ok: true,
        msg: "User has been updated successfully."
    });
});

router.post('/', (req, res) => {
    // TODO:: Create new user in users database using req.body data

    let user = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: ''
    }

    res.status(201).json({
        ok: true,
        msg: "User has been created successfully.",
        id: 1
    });
});

router.delete('/:id', (req, res) => {
    // TODO:: Delete user from database using id param

    res.status(204).json({
        ok: true,
        msg: "User has been deleted successfully."
    });
});

export default router;