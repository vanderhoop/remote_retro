import STAGES from "../configs/stages"

const { PRIME_DIRECTIVE } = STAGES
const stage = (state = PRIME_DIRECTIVE, action) => {
  switch (action.type) {
    case "SET_INITIAL_STATE":
      return action.initialState.stage
    case "UPDATE_STAGE":
      return action.stage
    default:
      return state
  }
}

export default stage
