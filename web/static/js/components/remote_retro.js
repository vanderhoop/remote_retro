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

  handleSubmitUsername(username) {
    let phone = window.phone = PHONE({
      number: username,
      publish_key: 'pub-c-774ec798-47ab-4add-a4e0-4db1282eeb45',
      subscribe_key: 'sub-c-dd561ef6-edf9-11e6-8bf6-02ee2ddab7fe',
      ssl: true,
    })

    phone.ready(() => { console.log("ready") })
    phone.receive(session => {
      session.connected(session => {
        const newUsers = this.state.users.map(user => {
          if (session.video.dataset.number === user.name) {
            user.videoSrc = session.video.src
          }
          return user
        })

        const newState = { ...this.state, users: newUsers }
        this.setState(newState)
      })

      session.ended(session => { console.log('gonna clear a bunch of video!') })
    })

    let socket = new Socket("/socket", {params: { user: username }})
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
        if (user.name === username) {
          user.videoSrc = phone.video.src
          user.muted = true
        } else {
          phone.dial(user.name)
        }
      })

      this.setState({ users, retroChannel })
    })

    retroChannel.join()
    this.setState({ user: username, retroChannel })
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
