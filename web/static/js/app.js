/* eslint-disable react/jsx-filename-extension */

import React from "react"
import { render } from "react-dom"
import { createStore, bindActionCreators } from "redux"
import { Provider } from "react-redux"
import { AppContainer } from "react-hot-loader"

import RemoteRetro from "./components/remote_retro"
import RetroChannel from "./services/retro_channel"
import rootReducer from "./reducers"
import actions from "./actions"

import enableHotCssModuleUpdates from "./dev/enable_hot_css_module_updates"

const { userToken, retroUUID } = window

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const actionz = bindActionCreators({ ...actions }, store.dispatch)
const retroChannel = RetroChannel.configure({ userToken, retroUUID, store, actions: actionz })

retroChannel.join()
  .receive("error", error => console.error(error))
  .receive("ok", initialState => {
    actionz.setInitialState(initialState)

    const renderWithHotReload = RemoteRetro => {
      render(
        <AppContainer>
          <Provider store={createStore(rootReducer)}>
            <RemoteRetro retroChannel={retroChannel} userToken={userToken} />
          </Provider>
        </AppContainer>,
        reactRoot
      )
    }

    renderWithHotReload(RemoteRetro)

    if (module.hot) {
      enableHotCssModuleUpdates()

      module.hot.accept("./components/remote_retro", () => {
        renderWithHotReload(RemoteRetro)
      })
    }
  })
}
