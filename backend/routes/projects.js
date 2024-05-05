import express from 'express';

import * as projects from '../controllers/projects.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// insert project
router.post('/', auth(), async (req, res) => {
    try{
        let projectAuthor = 1;

        if(!req.body.title, !req.body.content, !projectAuthor){
            throw { msg: "Project 'title', 'content' & 'project author' are required to insert a project to the database." }
        }

        let project = {
            title: req.body.title,
            content: req.body.content,
            degree: req.body.degree || null,
            projectAuthor
        }

        // DB -> Creating new row in projects table using project object.
        let projectId = await projects.insertOne(project);

        res.status(201).json({
            ok: true,
            msg: "Project has been created successfully.",
            id: projectId
        });
    }catch(error){
        console.log(error);
        res.status(error.status || 400).json({
            ok: false,
            msg: error.msg || "There was an error creating a project."
        });
    }
});

// get all projects
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

// get specific project
router.get('/:id', async (req, res) => {
    try{
        let project = await projects.getOneById(req.params.id);

        if(!project){
            throw { status: 404, msg: "Project with specified id doesn't exist in the database." }
        }

        res.status(200).json({
            ok: true,
            msg: "Project has been selected successfully.",
            project: project
        });
    }catch(error){
        res.status(error.status || 400).json({
            ok: false,
            msg: error.msg || "There was an error selecting the project."
        });
    }
});

// update project
router.put('/:id', auth(), (req, res) => {
    // TODO:: Update project data with req.body data

    res.status(200).json({
        ok: true,
        msg: "Project has been updated successfully."
    });
});

// delete project
router.delete('/:id', auth(), async (req, res) => {
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