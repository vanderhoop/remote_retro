import React, { Component } from "react"
import { Socket, Presence } from "phoenix"
import values from "lodash/values"

import UserForm from "./user_form"
import Room from "./room"

import UrlHelpers from "../services/url_helpers"

class RemoteRetro extends Component {
  constructor(props) {
    super(props)
    this.state = { users: [], retroChannel: {} }

    this.handleSubmitUsername = this.handleSubmitUsername.bind(this)
  }

  handleSubmitUsername(user) {
    let phone = window.phone = PHONE({
      number: user,
      publish_key: 'pub-c-774ec798-47ab-4add-a4e0-4db1282eeb45',
      subscribe_key: 'sub-c-dd561ef6-edf9-11e6-8bf6-02ee2ddab7fe',
      ssl: true,
    })

    phone.ready(() => { console.log("ready") })
    phone.receive(session => {
      session.connected(session => {
        console.log("==============is this a video element?")
        console.log(session.video)
        console.log("==============is this a video element?")
        document.querySelector('body').appendChild(session.video)
      })

      session.ended(session => { console.log('gonna clear a bunch of video!') })
    })

    let socket = new Socket("/socket", {params: { user }})
    socket.connect()
    let presences = {}

    const retroUUID = UrlHelpers.parseRetroUUID(location.pathname)
    const retroChannel = socket.channel("retro:" + retroUUID)

    retroChannel.on("presence_state", state => {
      presences = Presence.syncState(presences, state)
      const users = values(presences).map(presence => presence.user)
      this.setState({ users, retroChannel })
    })

    retroChannel.on("presence_diff", diff => {
      presences = Presence.syncDiff(presences, diff)
      const users = values(presences).map(presence => presence.user)

      users.forEach(user => {
        phone.dial(user.name)
      })

      this.setState({ users, retroChannel })
    })

    retroChannel.join()
    this.setState({ user, retroChannel })
  }

  render() {
    const user = this.state.user

    let content
    if (user) {
      content = <Room users={ this.state.users } retroChannel={ this.state.retroChannel } />
    } else {
      content = <UserForm onSubmitUsername={this.handleSubmitUsername} />
    }

    return <div>{ content }</div>
  }
}

export default RemoteRetro
