const jwt = require('jsonwebtoken')
const User = require('../models/User')

// Helper: generate JWT
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })

// @desc   Register a new user
// @route  POST /api/users/register
// @access Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email and password' })
    }

    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    const user = await User.create({ name, email, password, role })

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    })
  } catch (error) {
    next(error)
  }
}

// @desc   Login user
// @route  POST /api/users/login
// @access Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' })
    }

    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      token: generateToken(user._id),
    })
  } catch (error) {
    next(error)
  }
}

// @desc   Get current logged-in user profile
// @route  GET /api/users/me
// @access Private
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('savedJobs', 'title company location type')
    res.json(user)
  } catch (error) {
    next(error)
  }
}

// @desc   Update user profile
// @route  PUT /api/users/me
// @access Private
const updateMe = async (req, res, next) => {
  try {
    const { name, avatar } = req.body
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, avatar },
      { new: true, runValidators: true }
    )
    res.json(user)
  } catch (error) {
    next(error)
  }
}

// @desc   Save / unsave a job (toggle)
// @route  PUT /api/users/saved-jobs/:jobId
// @access Private
const toggleSavedJob = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
    const jobId = req.params.jobId

    const index = user.savedJobs.indexOf(jobId)
    if (index === -1) {
      user.savedJobs.push(jobId)
    } else {
      user.savedJobs.splice(index, 1)
    }

    await user.save()
    await user.populate('savedJobs', 'title company location type')

    res.json({ savedJobs: user.savedJobs })
  } catch (error) {
    next(error)
  }
}

// @desc   Get all users (admin only)
// @route  GET /api/users
// @access Private/Admin
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select('-password')
    res.json(users)
  } catch (error) {
    next(error)
  }
}

module.exports = { registerUser, loginUser, getMe, updateMe, toggleSavedJob, getAllUsers }
