const Application = require('../models/Application')
const Job = require('../models/Job')

// @desc   Apply for a job
// @route  POST /api/applications
// @access Private (jobseeker)
const applyForJob = async (req, res, next) => {
  try {
    const { jobId, coverLetter, resumeLink } = req.body

    if (!jobId) return res.status(400).json({ message: 'Job ID is required' })

    // Check job exists and is open
    const job = await Job.findById(jobId)
    if (!job) return res.status(404).json({ message: 'Job not found' })
    if (job.status !== 'open') return res.status(400).json({ message: 'This job is no longer accepting applications' })

    // Check for duplicate application
    const exists = await Application.findOne({ job: jobId, applicant: req.user._id })
    if (exists) return res.status(400).json({ message: 'You have already applied for this job' })

    const application = await Application.create({
      job: jobId,
      applicant: req.user._id,
      coverLetter,
      resumeLink,
    })

    // Increment applicationsCount on the job
    await Job.findByIdAndUpdate(jobId, { $inc: { applicationsCount: 1 } })

    await application.populate([
      { path: 'job', select: 'title company location' },
      { path: 'applicant', select: 'name email' },
    ])

    res.status(201).json(application)
  } catch (error) {
    next(error)
  }
}

// @desc   Get all applications made by the logged-in user
// @route  GET /api/applications/my
// @access Private (jobseeker)
const getMyApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ applicant: req.user._id })
      .populate('job', 'title company location type status logo')
      .sort('-createdAt')
    res.json(applications)
  } catch (error) {
    next(error)
  }
}

// @desc   Get all applications for a specific job (employer / admin)
// @route  GET /api/applications/job/:jobId
// @access Private (employer / admin)
const getApplicationsForJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.jobId)
    if (!job) return res.status(404).json({ message: 'Job not found' })

    // Only owner or admin can see all applicants
    if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' })
    }

    const applications = await Application.find({ job: req.params.jobId })
      .populate('applicant', 'name email avatar')
      .sort('-createdAt')

    res.json(applications)
  } catch (error) {
    next(error)
  }
}

// @desc   Update application status (employer / admin)
// @route  PUT /api/applications/:id/status
// @access Private (employer / admin)
const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body
    const validStatuses = ['pending', 'reviewed', 'shortlisted', 'rejected', 'hired']

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' })
    }

    const application = await Application.findById(req.params.id).populate('job', 'postedBy')
    if (!application) return res.status(404).json({ message: 'Application not found' })

    // Only job owner or admin can update status
    if (
      application.job.postedBy.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    application.status = status
    if (notes !== undefined) application.notes = notes
    await application.save()

    res.json(application)
  } catch (error) {
    next(error)
  }
}

// @desc   Withdraw (delete) an application
// @route  DELETE /api/applications/:id
// @access Private (applicant only)
const withdrawApplication = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id)
    if (!application) return res.status(404).json({ message: 'Application not found' })

    if (application.applicant.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to withdraw this application' })
    }

    await application.deleteOne()
    await Job.findByIdAndUpdate(application.job, { $inc: { applicationsCount: -1 } })

    res.json({ message: 'Application withdrawn' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  applyForJob,
  getMyApplications,
  getApplicationsForJob,
  updateApplicationStatus,
  withdrawApplication,
}
