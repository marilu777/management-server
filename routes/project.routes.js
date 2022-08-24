const router = require('express').Router();
const Project = require('../models/Project.model');
const Task = require('../models/Task.model');

router.post('/projects',  (req, res, next) => {
    const {title, description} = req.body

    Project.create({title, description, task: []})
    .then((response) => res.status(201).json(response))   // esperar pela resposta do api e mandar para o json
    .catch((err) => res.json(err));

});

// Get all projects
router.get('/projects', (req, res, next) => {
    Project.find()
    .populate('tasks')
    .then((projects) => res.json(projects))
    .catch((err) => res.json(err))
});

// Single route / details
router.get('/projects/:projectId', (req, res, next) => {
    const {projectId} = req.params;

    Project.findById(projectId)
    .populate('tasks')
    .then((project) => res.status(200).json(project))
    .catch((err) => res.json(err));
});

// Edit - Put route
router.put('/projects/:projectId', (req, res, next) => {
    const {projectId} = req.params;
    const {title, description} = req.body;

    Project.findByIdAndUpdate(projectId, {title, description}, {new: true})
    .then((project) => res.status(201).json(project))
    .catch((err) => res.json(err));
});

router.delete('/projects/:projectId', (req, res, next) => {
    const {projectId} = req.params;
    Project.findByIdAndRemove(projectId)
    .then((project) => res.status(200).json({message: `The project with id ${project._id} was successfully deleted`}))
    .catch((err) => res.json(err));
});


module.exports = router;