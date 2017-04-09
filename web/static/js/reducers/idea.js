const idea = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_IDEA':
      return state['test'] = 'idea added'
    default:
      return state
  }
}

export default idea
