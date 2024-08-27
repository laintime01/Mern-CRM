const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

// @route   POST api/clients
// @desc    Create a new client
// @access  Public (for testing)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, wixId } = req.body;

    const newClient = new Client({
      name,
      email,
      phone,
      wixId  // This will be undefined if not provided in the request
    });

    const client = await newClient.save();
    res.json(client);
  } catch (err) {
    console.error('Error creating client:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// @route   GET api/clients
// @desc    Get all clients
// @access  Public (for testing)
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (err) {
    console.error('Error fetching clients:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// @route   GET api/clients/:id
// @desc    Get client by ID
// @access  Public (for testing)
router.get('/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({ msg: 'Client not found' });
    }

    res.json(client);
  } catch (err) {
    console.error('Error fetching client:', err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Client not found' });
    }
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// @route   PUT api/clients/:id
// @desc    Update client
// @access  Public (for testing)
router.put('/:id', async (req, res) => {
  const { name, email, phone } = req.body;

  // Build client object
  const clientFields = {};
  if (name) clientFields.name = name;
  if (email) clientFields.email = email;
  if (phone) clientFields.phone = phone;

  try {
    let client = await Client.findById(req.params.id);

    if (!client) return res.status(404).json({ msg: 'Client not found' });

    client = await Client.findByIdAndUpdate(
      req.params.id,
      { $set: clientFields },
      { new: true }
    );

    res.json(client);
  } catch (err) {
    console.error('Error updating client:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// @route   DELETE api/clients/:id
// @desc    Delete client
// @access  Public (for testing)
router.delete('/:id', async (req, res) => {
  try {
    let client = await Client.findById(req.params.id);

    if (!client) return res.status(404).json({ msg: 'Client not found' });

    await Client.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Client removed' });
  } catch (err) {
    console.error('Error deleting client:', err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Client not found' });
    }
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;