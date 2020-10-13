import React from 'react'
import NewNote from './components/newNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/visibilityFilter'

const App = () => {
  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App
