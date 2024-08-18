const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');
const ServiceRequest = require('../models/ServiceRequest');
const checkRole = require('../middleware/checkRole');


// @route   GET api/reports/tasks-summary
// @desc    Get summary of tasks
// @access  Private
router.get('/tasks-summary', [auth, checkRole('admin')], async (req, res) => {
    try {
    const taskSummary = await Task.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    res.json(taskSummary);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/reports/service-requests-summary
// @desc    Get summary of service requests
// @access  Private
router.get('/service-requests-summary', auth, async (req, res) => {
  try {
    const serviceRequestSummary = await ServiceRequest.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    res.json(serviceRequestSummary);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;