import express from 'express';

const router = express.Router();

router.get('/:id', (req, res) => {
    // TODO:: Get project from db and return in response

    res.status(200).json({
        ok: true,
        msg: "Project has been created successfully.",
        project: project
    });
});

router.put('/:id', (req, res) => {
    // TODO:: Update project data with req.body data

    res.status(200).json({
        ok: true,
        msg: "Project has been updated successfully."
    });
});

router.post('/', (req, res) => {
    // TODO:: Create new project in projects database using req.body data

    let project = {
        name: '',
        content: '',
        degree: '',
        date: ''
    }

    res.status(201).json({
        ok: true,
        msg: "Project has been created successfully.",
        id: 1
    });
});

router.delete('/:id', (req, res) => {
    // TODO:: Delete project from database using id param

    res.status(204).json({
        ok: true,
        msg: "Project has been deleted successfully."
    });
});

export default router;