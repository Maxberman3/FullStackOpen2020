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
    Person.estimatedDocumentCount().then(count=>{
      console.log(count)
      const time = new Date()
      res.send(`<h2>There are ${count} entries in the phonebook</h2>
        <h2> The time when processed is ${time}</h2>
        `)
    })
})

app.get('/api/persons',(req,res)=>{
  Person.find({}).then(persons=>{
    console.log(persons)
    res.json(persons)
  })
})

app.get('/api/person/:id',(req,res)=>{
  Person.findById(req.params.id).then(person=>{
    if(person){
    res.json(person)
  }else{
    res.status(404).end()
  }
}).catch(error=>next(error))
})

app.delete('/api/person/:id', (req,res)=>{
  const id = req.params.id
  console.log(id)
  Person.findByIdAndDelete(id).then(result=>{
    console.log(result)
    res.status(204).end()
  }).catch(error=>next(error))
})

app.post('/api/person/', (req,res,next)=>{
  const data = req.body
  if(!data.name || !data.number){
    console.log('in the missing content if statement')
    return res.status(400).json({"error":"content was missing from request"})
  }
  Person.find({name:data.name}).then(persons=>{
    if(persons.length){
      return res.status(400).json({"error":"There is already an entry with that name in the phonebook"})
    }
    const person=new Person({
      name:data.name,
      number:data.number,
      date:new Date(),
    })
    // console.log(person)
    person.save().then(savedPerson=>{
      console.log(savedPerson)
      res.json(savedPerson)
    }).catch(error=>next(error))
  })
})

app.put('/api/person/:id',(req,res)=>{
  const id=req.params.id
  console.log(`processing update for person with id ${id}`)
  const data = req.body
  if(!data.name || !data.number){
    return res.status(400).json({"error":"content was missing from request"})
  }
  const update={
    name:data.name,
    number:data.number,
  }
  Person.findByIdAndUpdate(id,update,{new:true}).then(updatePerson=>{
    console.log(updatePerson)
    res.json(updatePerson)
  }).catch(error=>{
    console.log('find by id and update is failing')
    error=>next(error)
  })
})

const unknownRoute = (req, res) => {
  res.status(404).end();
};

app.use(unknownRoute);

const errorHandler=(error,req,res,next)=>{
  // console.error(error.message)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  else if(error.name==='ValidationError'){
    console.log(error.name)
    console.log(error.message)
    return res.status(400).json ({error:error.message})
  }

  next(error)
}

app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
