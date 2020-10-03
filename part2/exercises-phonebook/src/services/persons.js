import axios from 'axios'
const baseUrl = 'http://localhost:3001/api'

const create = newPerson => {
  const request=axios.post(baseUrl,newPerson)
  return request.then(response => response.data)
}

const getPersons = ()=>{
  const request=axios.get(`${baseUrl}/persons`)
  return request.then(response => response.data)
}

const deletePerson=(id)=>{
  const request=axios.delete(`${baseUrl}/${id}`)
  return request.then(response=>response.data)
}

const updatePerson= (newPerson) => {
  // console.log(newPerson.id)
  const request=axios.put(`${baseUrl}/${newPerson.id}`,newPerson)
  return request.then(response=>response.data)
}

export default {create, getPersons, deletePerson, updatePerson}
