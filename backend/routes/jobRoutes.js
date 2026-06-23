const express = require('express')
const router = express.Router()
const {
  getJobs,
  getJobById,
  getJobByLegacyId,
  createJob,
  updateJob,
  deleteJob,
  getMyJobs,
} = require('../controllers/jobController')
const { protect, authorize } = require('../middleware/authMiddleware')

// Public routes
router.get('/', getJobs)
router.get('/legacy/:legacyId', getJobByLegacyId)
router.get('/:id', getJobById)

// Private routes
router.get('/employer/my-jobs', protect, getMyJobs)
router.post('/', protect, authorize('employer', 'admin'), createJob)
router.put('/:id', protect, authorize('employer', 'admin'), updateJob)
router.delete('/:id', protect, authorize('employer', 'admin'), deleteJob)

module.exports = router
