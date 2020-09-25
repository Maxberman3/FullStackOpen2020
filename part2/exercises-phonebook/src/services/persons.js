import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const create = newPerson => {
  const request=axios.post(baseUrl,newPerson)
  return request.then(response => response.data)
}

const getPersons = ()=>{
  const request=axios.get(baseUrl)
  return request.then(response => response.data)
}

const deletePerson=(id)=>{
  let params={id}
  const request=axios.delete(baseUrl,params)
  return request.then(response=>response.data)
}

export default {create, getPersons, deletePerson}
