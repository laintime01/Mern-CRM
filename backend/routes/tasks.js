const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');

// @route   POST api/tasks
// @desc    Create a new task
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, assignedTo, relatedTo, relatedToModel } = req.body;

    const newTask = new Task({
      title,
      description,
      status,
      priority,
      dueDate,
      assignedTo,
      relatedTo,
      relatedToModel,
      createdBy: req.user.id
    });

    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/tasks
// @desc    Get all tasks
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find()
      .sort({ createdAt: -1 })
      .populate('assignedTo', ['name', 'email'])
      .populate('relatedTo')
      .populate('createdBy', ['name', 'email']);
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/tasks/:id
// @desc    Get task by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('assignedTo', ['name', 'email'])
      .populate('relatedTo')
      .populate('createdBy', ['name', 'email']);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    res.json(task);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Task not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/tasks/:id
// @desc    Update task
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { title, description, status, priority, dueDate, assignedTo, relatedTo, relatedToModel } = req.body;

  // Build task object
  const taskFields = {};
  if (title) taskFields.title = title;
  if (description) taskFields.description = description;
  if (status) taskFields.status = status;
  if (priority) taskFields.priority = priority;
  if (dueDate) taskFields.dueDate = dueDate;
  if (assignedTo) taskFields.assignedTo = assignedTo;
  if (relatedTo) taskFields.relatedTo = relatedTo;
  if (relatedToModel) taskFields.relatedToModel = relatedToModel;

  try {
    let task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    // Make sure user owns task or is an admin
    if (task.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: taskFields },
      { new: true }
    ).populate('assignedTo', ['name', 'email'])
     .populate('relatedTo')
     .populate('createdBy', ['name', 'email']);

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/tasks/:id
// @desc    Delete task
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    // Make sure user owns task or is an admin
    if (task.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Task.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Task not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;