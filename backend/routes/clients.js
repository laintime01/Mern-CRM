const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Client = require('../models/Client');

// @route   POST api/clients
// @desc    Create a new client
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { name, email, phone, address, company, notes } = req.body;

    const newClient = new Client({
      name,
      email,
      phone,
      address,
      company,
      notes,
      createdBy: req.user.id
    });

    const client = await newClient.save();
    res.json(client);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/clients
// @desc    Get all clients
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const clients = await Client.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    res.json(clients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/clients/:id
// @desc    Get client by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({ msg: 'Client not found' });
    }

    // Make sure user owns client
    if (client.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    res.json(client);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Client not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/clients/:id
// @desc    Update client
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, address, company, notes } = req.body;

  // Build client object
  const clientFields = {};
  if (name) clientFields.name = name;
  if (email) clientFields.email = email;
  if (phone) clientFields.phone = phone;
  if (address) clientFields.address = address;
  if (company) clientFields.company = company;
  if (notes) clientFields.notes = notes;

  try {
    let client = await Client.findById(req.params.id);

    if (!client) return res.status(404).json({ msg: 'Client not found' });

    // Make sure user owns client
    if (client.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    client = await Client.findByIdAndUpdate(
      req.params.id,
      { $set: clientFields },
      { new: true }
    );

    res.json(client);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/clients/:id
// @desc    Delete client
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let client = await Client.findById(req.params.id);

    if (!client) return res.status(404).json({ msg: 'Client not found' });

    // Make sure user owns client
    if (client.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Client.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Client removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Client not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;