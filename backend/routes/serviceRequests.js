const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ServiceRequest = require('../models/ServiceRequest');
const Client = require('../models/Client');

// @route   POST api/service-requests
// @desc    Create a new service request
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { client, title, description, status, priority, assignedTo } = req.body;

    // Check if client exists
    const clientExists = await Client.findById(client);
    if (!clientExists) {
      return res.status(404).json({ msg: 'Client not found' });
    }

    const newServiceRequest = new ServiceRequest({
      client,
      title,
      description,
      status,
      priority,
      assignedTo,
      createdBy: req.user.id
    });

    const serviceRequest = await newServiceRequest.save();
    res.json(serviceRequest);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/service-requests
// @desc    Get all service requests
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const serviceRequests = await ServiceRequest.find()
      .sort({ createdAt: -1 })
      .populate('client', ['name', 'email'])
      .populate('assignedTo', ['name', 'email']);
    res.json(serviceRequests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/service-requests/:id
// @desc    Get service request by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const serviceRequest = await ServiceRequest.findById(req.params.id)
      .populate('client', ['name', 'email'])
      .populate('assignedTo', ['name', 'email']);

    if (!serviceRequest) {
      return res.status(404).json({ msg: 'Service request not found' });
    }

    res.json(serviceRequest);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Service request not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/service-requests/:id
// @desc    Update service request
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { client, title, description, status, priority, assignedTo } = req.body;

  // Build service request object
  const serviceRequestFields = {};
  if (client) serviceRequestFields.client = client;
  if (title) serviceRequestFields.title = title;
  if (description) serviceRequestFields.description = description;
  if (status) serviceRequestFields.status = status;
  if (priority) serviceRequestFields.priority = priority;
  if (assignedTo) serviceRequestFields.assignedTo = assignedTo;

  try {
    let serviceRequest = await ServiceRequest.findById(req.params.id);

    if (!serviceRequest) return res.status(404).json({ msg: 'Service request not found' });

    serviceRequest = await ServiceRequest.findByIdAndUpdate(
      req.params.id,
      { $set: serviceRequestFields },
      { new: true }
    ).populate('client', ['name', 'email'])
     .populate('assignedTo', ['name', 'email']);

    res.json(serviceRequest);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/service-requests/:id
// @desc    Delete service request
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let serviceRequest = await ServiceRequest.findById(req.params.id);

    if (!serviceRequest) return res.status(404).json({ msg: 'Service request not found' });

    await ServiceRequest.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Service request removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Service request not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;