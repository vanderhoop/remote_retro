import { expect } from 'chai'

import * as actionCreators from '../../web/static/js/actions/idea'


describe('addIdea', () => {
  it('should create an action to add an idea', () => {
    const idea = {
      id: 1,
      author: 'Morty',
      category: 'confused',
      body: 'Get your shit together Summer.',
    }
    const expectedAction = { type: 'ADD_IDEA', idea }

    expect(actionCreators.addIdea(idea)).to.deep.equal(expectedAction)
  })

});
