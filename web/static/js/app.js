/* eslint-disable react/jsx-filename-extension */

import React from "react"
import { render } from "react-dom"
import { bindActionCreators } from "redux"
import { AppContainer } from "react-hot-loader"

import RetroChannel from "./services/retro_channel"
import configureStore from "./configure_store"
import actions from "./actions"

import enableHotCssModuleUpdates from "./dev/enable_hot_css_module_updates"

const { userToken, retroUUID } = window

const store = configureStore()

const actionz = bindActionCreators({ ...actions }, store.dispatch)
const retroChannel = RetroChannel.configure({ userToken, retroUUID, store, actions: actionz })

retroChannel.join()
  .receive("error", error => console.error(error))
  .receive("ok", initialState => {
    actionz.setInitialState(initialState)

    const renderWithHotReload = () => {
      const RemoteRetro = require("./components/remote_retro").default

      render(
        <AppContainer>
          <RemoteRetro retroChannel={retroChannel} userToken={userToken} store={store} />
        </AppContainer>,
        document.querySelector(".react-root")
      )
    }

    // initial render
    renderWithHotReload()
    // ensure rerenders on store updates
    store.subscribe(renderWithHotReload)

    if (module.hot) {
      // ensure rerenders on module updates
      module.hot.accept("./components/remote_retro", renderWithHotReload)
      enableHotCssModuleUpdates()
    }
  })
