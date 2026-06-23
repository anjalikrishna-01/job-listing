const express = require('express')
const router = express.Router()
const {
  applyForJob,
  getMyApplications,
  getApplicationsForJob,
  updateApplicationStatus,
  withdrawApplication,
} = require('../controllers/applicationController')
const { protect } = require('../middleware/authMiddleware')

// All routes are private
router.post('/', protect, applyForJob)
router.get('/my', protect, getMyApplications)
router.get('/job/:jobId', protect, getApplicationsForJob)
router.put('/:id/status', protect, updateApplicationStatus)
router.delete('/:id', protect, withdrawApplication)

module.exports = router
