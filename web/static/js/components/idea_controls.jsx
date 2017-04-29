import React from "react"
import * as AppPropTypes from "../prop_types"
import styles from "./css_modules/idea_controls.css"

function IdeaControls(props) {
  const { idea, retroChannel, IdeaRestClient } = props

  return (
    <span>
      <i
        title="Delete Idea"
        className={`${styles.actionIcon} remove circle icon`}
        onClick={() => { IdeaRestClient.delete(idea.id) }}
      />
      <i
        title="Edit Idea"
        className={`${styles.actionIcon} edit icon`}
        onClick={() => { retroChannel.push("enable_edit_state", idea) }}
      />
    </span>
  )
}

IdeaControls.propTypes = {
  idea: AppPropTypes.idea.isRequired,
  retroChannel: AppPropTypes.retroChannel.isRequired,
  IdeaRestClient: React.PropTypes.func.isRequired,
}

export default IdeaControls
