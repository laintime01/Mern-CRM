const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
// 暂时注释掉 auth 中间件
// const auth = require('../middleware/auth');

// 测试路由
router.get('/test', (req, res) => {
  console.log('Test route accessed');
  res.json({ msg: 'Users route is working' });
});

// @route   GET api/users
// @desc    Get all users
// @access  Public (temporarily)
router.get('/', async (req, res) => {
  try {
    console.log('Attempting to fetch all users');
    const users = await User.find().select('-password');
    console.log(`Found ${users.length} users`);
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
});

// @route   POST api/users/register
// @desc    Register a user
// @access  Public
router.post('/register', async (req, res) => {
  console.log('Received registration request');
  const { name, email, password, role } = req.body;
  console.log('Registration data:', { name, email, role }); // 不记录密码

  try {
    let user = await User.findOne({ email });

    if (user) {
      console.log('User already exists');
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
      role: role || 'user'
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    console.log('User registered successfully');

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Error in user registration:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// @route   POST api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  console.log('Received login request');
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      console.log('Invalid credentials: User not found');
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log('Invalid credentials: Password does not match');
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    console.log('User authenticated successfully');

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Error in user login:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// @route   PUT api/users/:id
// @desc    Update a user
// @access  Public (temporarily)
router.put('/:id', async (req, res) => {
  console.log(`Received update request for user ID: ${req.params.id}`);
  const { name, email, role } = req.body;

  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ msg: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();
    console.log('User updated successfully');

    res.json(user);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
});

// @route   DELETE api/users/:id
// @desc    Delete a user
// @access  Public (temporarily)
router.delete('/:id', async (req, res) => {
  console.log(`Received delete request for user ID: ${req.params.id}`);

  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ msg: 'User not found' });
    }

    await user.remove();
    console.log('User removed successfully');

    res.json({ msg: 'User removed' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
});

// @route   PUT api/users/:id/role
// @desc    Assign a role to a user
// @access  Public (temporarily)
router.put('/:id/role', async (req, res) => {
  console.log(`Received role update request for user ID: ${req.params.id}`);
  const { role } = req.body;

  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ msg: 'User not found' });
    }

    user.role = role;
    await user.save();
    console.log(`User role updated to: ${role}`);

    res.json(user);
  } catch (err) {
    console.error('Error updating user role:', err);
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
});

module.exports = router;