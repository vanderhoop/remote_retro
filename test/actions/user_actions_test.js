import { expect } from 'chai'

import * as actionCreators from '../../web/static/js/actions/user'

describe('addUsers', () => {
  it('should create an action to add users', () => {
    const users = [
      { given_name: 'Rick' },
      { given_name: 'Morty' },
      { given_name: 'Birdperson' },
    ]
    const expectedAction = { type: 'ADD_USERS', users }

    expect(actionCreators.addUsers(users)).to.deep.equal(expectedAction)
  })
})

describe('addCurrentUser', () => {
  it('should create an action to add the current user', () => {
    const currentUser = { given_name: 'Tiny Rick' }
    const expectedAction = { type: 'ADD_CURRENT_USER', currentUser }

    expect(actionCreators.addCurrentUser(currentUser)).to.deep.equal(expectedAction)
  })
})
