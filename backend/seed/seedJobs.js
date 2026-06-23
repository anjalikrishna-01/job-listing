const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

const mongoose = require('mongoose')
const Job = require('../models/Job')
const { jobs } = require('./frontendJobsData')

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected')

    await Job.deleteMany({})
    console.log('Old jobs cleared')

    // The frontend mock data uses a string `id` field (e.g. "vtg-014").
    // Mongo will generate its own real _id, so we keep the old id as
    // `legacyId` -- this is what lets the frontend's existing job pages
    // (which still use that string id in the URL) find the matching
    // real database job and apply to it correctly.
    const docs = jobs.map((job) => {
      const { id, ...rest } = job
      return { ...rest, legacyId: id }
    })

    await Job.insertMany(docs)
    console.log(docs.length + ' jobs seeded successfully')

    process.exit(0)
  } catch (error) {
    console.error('Seed error:', error.message)
    process.exit(1)
  }
}

seed()
