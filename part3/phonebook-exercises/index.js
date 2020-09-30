const express = require('express')
var morgan = require('morgan')
const app = express()

app.use(express.json())
morgan.token('data',(req)=>{
  let data=req.body
  return JSON.stringify(data)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
// app.use(morgan('tiny'))

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    },
    {
      "name": "Councilman Tarlock",
      "number": "123-456-8888",
      "id": 5
    }
  ]

  app.get('/', (req, res) => {
    res.send('<h1>The phonebook app</h1>')
  })

app.get('/info',(req,res)=>{
    let entries=persons.length
    let time = new Date()
    res.send(`<h2>There are ${entries} entries in the phonebook</h2>
      <h2> The time when processed is ${time}</h2>
      `)
})

app.get('/api/persons',(req,res)=>{
  res.send(persons)
})

app.get('/api/person/:id',(req,res)=>{
  const id = Number(req.params.id)
  const ret=persons.find(person=>person.id===id)
  if(ret){
    res.json(ret)
  }
  else{
    res.status(404).end()
  }
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
  let ret=persons.findIndex(person=>person.name===data.name)
  if(ret>-1){
    return res.status(400).json({"error":"There is already an entry with that name in the phonebook"})
  }
  data.id=getId()
  data.date=new Date()
  persons=persons.concat(data)
  // console.log(persons)
  res.json(data)
})

const getId = () =>{
  return Math.floor(Math.random()*10000)
}

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
