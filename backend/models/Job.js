const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Engineering', 'Product', 'Design', 'Data', 'Marketing', 'Sales', 'Finance', 'Operations'],
    },
    level: {
      type: String,
      enum: ['Junior', 'Mid', 'Senior', 'Lead'],
      default: 'Mid',
    },
    type: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Remote'],
      default: 'Full-time',
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    remote: {
      type: Boolean,
      default: false,
    },
    salaryMin: {
      type: Number,
      default: 0,
    },
    salaryMax: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: 'LPA',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['open', 'closed', 'paused'],
      default: 'open',
    },
    tags: [String],
    logo: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
    },
    responsibilities: [String],
    requirements: [String],
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    applicationsCount: {
      type: Number,
      default: 0,
    },
    legacyId: {
      type: String,
      index: true,
    },
  },
  { timestamps: true }
)

// Text index for search
jobSchema.index({ title: 'text', company: 'text', description: 'text', tags: 'text' })

module.exports = mongoose.model('Job', jobSchema)
