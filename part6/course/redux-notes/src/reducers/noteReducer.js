const noteReducer = (state = [], action) => {
  if (action.type === 'NEW_NOTE') {
    state.push(action.data)
    return state
  }

  return state
}
const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

  export const createNote = (content) => {
    return {
      type: 'NEW_NOTE',
      data: {
        content,
        important: false,
        id: generateId()
      }
    }
  }

  export const toggleImportanceOf = (id) => {
    return {
      type: 'TOGGLE_IMPORTANCE',
      data: { id }
    }
  }

export default noteReducer
