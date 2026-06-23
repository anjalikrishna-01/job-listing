const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })

const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

const userRoutes = require('./routes/userRoutes')
const jobRoutes = require('./routes/jobRoutes')
const applicationRoutes = require('./routes/applicationRoutes')

const app = express()

// Middleware
app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }))
app.use(express.json())

// Routes
app.get('/', (req, res) => res.json({ status: 'ok', message: 'Vantage Job Board API is running' }))
app.use('/api/users', userRoutes)
app.use('/api/jobs', jobRoutes)
console.log("Application routes loaded")

app.use('/api/applications', applicationRoutes)

// 404 + error handler (must be last)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
})
