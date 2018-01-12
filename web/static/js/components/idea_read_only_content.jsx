import React, { Component } from "react"

import IdeaControls from "./idea_controls"

import * as AppPropTypes from "../prop_types"
import styles from "./css_modules/idea_read_only_content.css"

class IdeaReadOnlyContent extends Component {
  state = {}

  handleDragEnd = event => {
    this.setState({ dragging: false })
  }

  handleDragStart = props => event => {
    this.setState({ dragging: true })
    const { idea } = props
    event.dataTransfer.dropEffect = "move"
    // event dataTransfer only supports strings
    event.dataTransfer.setData("idea", JSON.stringify(idea))
  }

  render() {
    const { idea, currentUser, retroChannel, stage, assignee } = this.props
    const { dragging } = this.state
    const isEdited = (+new Date(idea.updated_at) - +new Date(idea.inserted_at)) > 1000
    const hasAssignee = Object.keys(assignee).length > 0

    const canUserEditIdea = currentUser.is_facilitator || (currentUser.id === idea.user_id)
    const isIdeaEditableInCurrentStage = stage === "idea-generation"
    const draggable = canUserEditIdea && isIdeaEditableInCurrentStage

    return (
      <div
        className={`${styles.ideaWrapper} ${draggable && "draggable"} ${dragging && "dragging"}`}
        draggable={draggable}
        onDragStart={this.handleDragStart(this.props)}
        onDragEnd={this.handleDragEnd}
      >
        <IdeaControls
          idea={idea}
          retroChannel={retroChannel}
          currentUser={currentUser}
          stage={stage}
        />
        <span data-hj-masked>{ idea.body }</span>
        {hasAssignee && <span className={styles.assignee}> ({assignee.name})</span>}
        {isEdited && <span className={styles.editedIndicator}> (edited)</span>}
      </div>
    )
  }
}

IdeaReadOnlyContent.propTypes = {
  idea: AppPropTypes.idea.isRequired,
  retroChannel: AppPropTypes.retroChannel.isRequired,
  currentUser: AppPropTypes.presence.isRequired,
  stage: AppPropTypes.stage.isRequired,
  assignee: AppPropTypes.presence,
}

IdeaReadOnlyContent.defaultProps = {
  assignee: {},
}

export default IdeaReadOnlyContent
