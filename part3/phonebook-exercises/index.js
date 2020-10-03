const express = require('express')
var morgan = require('morgan')
const app = express()
const cors= require('cors')
require('dotenv').config()
const Person=require('./models/person')

app.use(express.json())
app.use(cors())

morgan.token('data',(req)=>{
  let data=req.body
  return JSON.stringify(data)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
// app.use(morgan('tiny'))

  app.get('/', (req, res) => {
    res.send('<h1>The phonebook app</h1>')
  })

app.get('/info',(req,res)=>{
    const entries=Person.estimatedDocumentCount()
    const time = new Date()
    res.send(`<h2>There are ${entries} entries in the phonebook</h2>
      <h2> The time when processed is ${time}</h2>
      `)
})

app.get('/api/persons',(req,res)=>{
  Person.find({}).then(persons=>{
    console.log(persons)
    res.json(persons)
  })
})

app.get('/api/person/:id',(req,res)=>{
  Person.findById(req.params.id).then(person=>{
    response.json(person)
  })
})

app.delete('/api/person/:id', (req,res)=>{
  const id = Number(req.params.id)
  persons=persons.filter(person=> person.id !== id)
  // console.log(persons)
  res.status(204).end()
})

app.post('/api/person/', (req,res)=>{
  const data = req.body
  if(!data.name || !data.number){
    return res.status(400).json({"error":"content was missing from request"})
  }
  let ret=persons.find({name:data.name}).then(persons=>{
    if(persons.length){
      return res.status(400).json({"error":"There is already an entry with that name in the phonebook"})
    }
    const person=new Person({
      name:data.name,
      number:data.number,
      date:new Date()
    })
    person.save(savedPerson=>{
      res.json(savedPerson)
    })
  })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
