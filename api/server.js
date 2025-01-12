const express = require('express')    // build server and handle HTTP requests
const cors = require('cors')          // Middleware to enable Cross-Origin-Resource-Sharing
const Joi = require('joi')            // Data Validation Library
const fs = require('fs')              // Node.js File System module to interact with files

const app = express()

app.use(express.json())
app.use(cors());

// Handle bad JSON Requests
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status == 400 && 'body' in err) {
    console.error(err)
    return res.status(400).send({ status: 400, message: err.message })
  }
})

// Handle unexpected errors with a 500 response
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal Server Error', message: 'Something went wrong. Please try later.' })
})

// Service class to manage actions data
class ActionService {
  constructor(dataFile) {
    this.dataFile = dataFile
    this.actions = this.loadData() || []
  }

  // Load actions from JSON file
  loadData() {
    try {
      const data = fs.readFileSync(this.dataFile, 'utf8')
      return JSON.parse(data)
    } catch (err) {
      console.log("No existing Data, starting with []")
      return []
    }
  }

  // Save actions to JSON file
  saveData() {
    fs.writeFileSync(this.dataFile, JSON.stringify(this.actions, null, 2), 'utf8')
  }

  // Get all actions
  getActions() {
    return this.actions
  }

  // Get action by ID
  getActionById(id) {
    return this.actions.find(action => action.id === id)
  }

  // Add new action
  addAction(actionData) {
    const action = {
      id: this.actions.length + 1,
      action: actionData.action,
      date: actionData.date,
      points: actionData.points
    }

    this.actions.push(action)
    this.saveData()
    return action
  }
}


const actionService = new ActionService('./data.json')


// Validation schema for actions using Joi
const schema = Joi.object({
  action: Joi.string().min(3).max(50).required(),
  date: Joi.date().iso().required(),
  points: Joi.number().integer().min(5).max(200).required()
})




// ROUTES

// Get all actions
app.get('/api/actions', (req, res) => {
  res.json(actionService.getActions())
})

// Get action by ID
app.get('/api/actions/:id', (req, res) => {
  const action = actionService.getActionById(parseInt(req.params.id))
  if (!action) {
    res.status(404).json({ error: 'Not Found', message: 'Action not Found' })
  } else {
    res.status(200).json(action)
  }
})

// Add new action
app.post('/api/actions', (req, res) => {
  const result = schema.validate(req.body)

  if (result.error) {
    res.status(400).send(result.error.details[0].message)
    return
  }

  const action = actionService.addAction(req.body)
  res.status(201).json(action)
})


// Configure server to listen on port
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening to port ${port}`))