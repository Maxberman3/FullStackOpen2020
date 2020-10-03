const dotenv=require('dotenv').config()
const mongoose = require('mongoose')

const password = process.env.MONGO_DB_KEY
console.log(password)

const arguments=process.argv


const url =process.env.MONGO_DB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = {
  name:String,
  number:String,
  id:Number,
  date: Date
}
const Person=mongoose.model('Person',personSchema)

if(arguments.length<4){
  Person.find({}).then(result=>{
    result.forEach(person=>{
      console.log(person)
    })
    mongoose.connection.close()
    process.exit(0)
  })
}
else{
var name=arguments[2]
var number=arguments[3]

const person=new Person({
  name:name,
  number:number,
  date:new Date()
})
person.save().then(result=>{
  console.log(result)
  console.log('Person saved!')
  mongoose.connection.close()
})
}
