const express = require('express')    // build server and handle HTTP requests
const cors = require('cors')          // Middleware to enable Cross-Origin-Resource-Sharing
const Joi = require('joi')            // Data Validation Library
const fs = require('fs')              // Node.js File System module to interact with files

const app = express()

app.use(express.json())
app.use(cors());

class ActionService {
  constructor(dataFile) {
    this.dataFile = dataFile
    this.actions = this.loadData() || []
  }

  // read from json file
  loadData() {
    try {
      const data = fs.readFileSync(this.dataFile, 'utf8')
      return JSON.parse(data)
    } catch (err) {
      console.log("No existing Data, starting with []")
      return []
    }
  }

  // write into json file
  saveData() {
    fs.writeFileSync(this.dataFile, JSON.stringify(this.actions, null, 2), 'utf8')
  }

  // return json data
  getActions() {
    return this.actions
  }

  // add into json file
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


/*
+-------------------------------------------------+
|  post form validatiors. Using JOI               |
|  action: string, 3-50 characters, required.     |
|  date: date, iso format [yyyy/MM/dd], required. |
|  points: number, between 5-200, requried.       |
+-------------------------------------------------+
*/
const schema = Joi.object({
  action: Joi.string().min(3).max(50).required(),
  date: Joi.date().iso().required(),
  points: Joi.number().integer().min(5).max(200).required()
})



// ROUTES
// get all actions
app.get('/api/actions', (req, res) => {
  res.send(actionService.getActions())
})

// post an action
app.post('/api/actions', (req, res) => {
  const result = schema.validate(req.body)

  if (result.error) {
    res.status(400).send(result.error.details[0].message)
    return
  }

  const action = actionService.addAction(req.body)
  res.send(action)
})


// Configure Port. Default port: 3000
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening to port ${port}`))