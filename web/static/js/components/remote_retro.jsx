import React, { Component } from "react"
import PropTypes from "prop-types"
import { Provider } from "react-redux"

import * as AppPropTypes from "../prop_types"
import Room from "./room"
import Alert from "./alert"
import ShareRetroLinkModal from "./share_retro_link_modal"
import DoorChime from "./door_chime"

export class RemoteRetro extends Component {
  // Trigger analytics events on page load and stage changes
  componentDidMount() {
    hj("trigger", this.props.stage)
  }

  componentDidUpdate(prevProps) {
    const { stage } = this.props
    if (prevProps.stage !== stage) { hj("trigger", stage) }
  }

  render() {
    const { store, userToken, retroChannel } = this.props
    const { users, ideas, stage, insertedAt, alert } = store.getState()

    const currentUser = users.find(user => user.token === userToken)

    return (
      <Provider store={store}>
        <div className={stage}>
          <Room
            currentUser={currentUser}
            users={users}
            ideas={ideas}
            stage={stage}
            retroChannel={retroChannel}
          />
          <Alert config={alert} />
          <ShareRetroLinkModal retroCreationTimestamp={insertedAt} />
          <DoorChime {...this.props} />
        </div>
      </Provider>
    )
  }
}

RemoteRetro.propTypes = {
  retroChannel: AppPropTypes.retroChannel.isRequired,
  userToken: PropTypes.string.isRequired,
  stage: AppPropTypes.stage.isRequired,
  insertedAt: PropTypes.string,
  alert: PropTypes.object,
}

export default RemoteRetro
