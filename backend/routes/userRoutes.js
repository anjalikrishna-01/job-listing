const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
  updateMe,
  toggleSavedJob,
  getAllUsers,
} = require('../controllers/userController')
const { protect, authorize } = require('../middleware/authMiddleware')

// Public routes
router.post('/register', registerUser)
router.post('/login', loginUser)

// Private routes
router.get('/me', protect, getMe)
router.put('/me', protect, updateMe)
router.put('/saved-jobs/:jobId', protect, toggleSavedJob)

// Admin only
router.get('/', protect, authorize('admin'), getAllUsers)

module.exports = router
