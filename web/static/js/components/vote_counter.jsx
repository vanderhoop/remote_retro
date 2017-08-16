import React from "react"
import * as AppPropTypes from "../prop_types"
import styles from "./css_modules/vote_counter.css"

class VoteCounter extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const { idea, retroChannel, currentUser } = this.props
    retroChannel.push("submit_vote", { ideaId: idea.id, userId: currentUser.id })
  }

  render() {
    const { vote_count: voteCount } = this.props.idea

    return (
      <div className="ui labeled right floated button">
        <button className={`ui green button ${styles.voteButton}`} onClick={this.handleClick}>
          Vote
        </button>
        <a className={`ui basic green label ${styles.voteCount}`}>
          {voteCount}
        </a>
      </div>
    )
  }
}

VoteCounter.propTypes = {
  retroChannel: AppPropTypes.retroChannel.isRequired,
  idea: AppPropTypes.idea.isRequired,
  currentUser: AppPropTypes.user.isRequired,
}

export default VoteCounter
