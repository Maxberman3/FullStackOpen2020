import React from 'react'

const NumberForm = (props) =>{
  return(
  <form>
    <div>
      name: <input onChange={props.onNameChange} value={props.name}/> <br></br>
      number: <input onChange={props.onNumberChange} value={props.number}/>
    </div>
    <div>
      <button type="submit" onClick={props.onSubmit}>add</button>
    </div>
    </form>
  )
}
export default NumberForm
