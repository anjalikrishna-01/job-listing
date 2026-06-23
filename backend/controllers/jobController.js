const Job = require('../models/Job')

// @desc   Get all jobs with filters, search, pagination
// @route  GET /api/jobs
// @access Public
const getJobs = async (req, res, next) => {
  try {
    const {
      search,
      category,
      type,
      level,
      remote,
      status = 'open',
      featured,
      page = 1,
      limit = 10,
      sort = '-createdAt',
    } = req.query

    const query = {}

    // Status filter
    if (status) query.status = status

    // Category filter
    if (category) query.category = category

    // Job type filter
    if (type) query.type = type

    // Level filter
    if (level) query.level = level

    // Remote filter
    if (remote !== undefined) query.remote = remote === 'true'

    // Featured filter
    if (featured !== undefined) query.featured = featured === 'true'

    // Full-text search
    if (search) {
      query.$text = { $search: search }
    }

    const skip = (Number(page) - 1) * Number(limit)
    const total = await Job.countDocuments(query)

    const jobs = await Job.find(query)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit))
      .populate('postedBy', 'name email')

    res.json({
      jobs,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      total,
    })
  } catch (error) {
    next(error)
  }
}

// @desc   Get a single job by its legacy frontend-mock id (e.g. "vtg-014")
// @route  GET /api/jobs/legacy/:legacyId
// @access Public
const getJobByLegacyId = async (req, res, next) => {
  try {
    const job = await Job.findOne({ legacyId: req.params.legacyId }).populate('postedBy', 'name email')
    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }
    res.json(job)
  } catch (error) {
    next(error)
  }
}

// @desc   Get a single job by ID
// @route  GET /api/jobs/:id
// @access Public
const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'name email')
    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }
    res.json(job)
  } catch (error) {
    next(error)
  }
}

// @desc   Create a new job
// @route  POST /api/jobs
// @access Private (employer / admin)
const createJob = async (req, res, next) => {
  try {
    const job = await Job.create({ ...req.body, postedBy: req.user._id })
    res.status(201).json(job)
  } catch (error) {
    next(error)
  }
}

// @desc   Update a job
// @route  PUT /api/jobs/:id
// @access Private (owner or admin)
const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id)
    if (!job) return res.status(404).json({ message: 'Job not found' })

    // Only owner or admin can update
    if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this job' })
    }

    const updated = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    res.json(updated)
  } catch (error) {
    next(error)
  }
}

// @desc   Delete a job
// @route  DELETE /api/jobs/:id
// @access Private (owner or admin)
const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id)
    if (!job) return res.status(404).json({ message: 'Job not found' })

    if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this job' })
    }

    await job.deleteOne()
    res.json({ message: 'Job removed' })
  } catch (error) {
    next(error)
  }
}

// @desc   Get all jobs posted by the logged-in employer
// @route  GET /api/jobs/my-jobs
// @access Private
const getMyJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id }).sort('-createdAt')
    res.json(jobs)
  } catch (error) {
    next(error)
  }
}

module.exports = { getJobs, getJobById, getJobByLegacyId, createJob, updateJob, deleteJob, getMyJobs }
