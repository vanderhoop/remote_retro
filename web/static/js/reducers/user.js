const user = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_USERS':
      return state['test'] = 'users added'
    case 'ADD_CURRENT_USER':
      return state['test'] = 'current user added'
    default:
      return state
  }
}

export default user
