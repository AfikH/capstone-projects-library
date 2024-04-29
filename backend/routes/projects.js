import express from 'express';

import * as projects from '../controllers/projects.js';

const router = express.Router();

router.post('/', async (req, res) => {
    let project = {
        title: req.body.title,
        content: req.body.content,
        degree: req.body.degree,
        projectAuthor
    }

    try{
        // DB -> Creating new row in projects table using project object.
        let projectId = await users.insertOne(user);

        res.status(201).json({
            ok: true,
            msg: "Project has been created successfully.",
            id: projectId
        });
    }catch(error){
        res.status(error.status || 400).json({
            ok: false,
            msg: error.msg || "There was an error creating a project."
        });
    }
});

router.get('/', async (req, res) => {
    try{
        let allProjects = await projects.getAll();

        res.status(200).json({
            ok: true,
            msg: "Projects has been fetched successfuly",
            projects: allProjects
        });
    }catch(error){
        res.status(400).json({
            ok: false,
            msg: "Couldn't get projects."
        });
    }
});

router.get('/:id', async (req, res) => {
    try{
        let project = await projects.getOneById(req.params.id);

        if(project.length <= 0){
            throw { status: 404, msg: "Project with specified id doesn't exist in the database." }
        }
    
        res.status(200).json({
            ok: true,
            msg: "Project has been selected successfully.",
            project: project[0]
        });
    }catch(error){
        res.status(error.status || 400).json({
            ok: false,
            msg: error.msg || "There was an error selecting the project."
        });
    }
});

router.put('/:id', (req, res) => {
    // TODO:: Update project data with req.body data

    res.status(200).json({
        ok: true,
        msg: "Project has been updated successfully."
    });
});

router.delete('/:id', async (req, res) => {
    try{
        if((await projects.deleteOne(req.params.id) <= 0)){
            throw { status: 404, msg: "Project with specified id doesn't exist in the database." }
        }

        res.status(200).json({
            ok: true,
            msg: "Project has been deleted successfully."
        });
    }catch(error){
        res.status(error.status || 400).json({
            ok: false,
            msg: error.msg || "There was an error deleting the project."
        });
    }
});

export default router;