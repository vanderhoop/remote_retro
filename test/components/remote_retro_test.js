import React from "react"
import { createStore } from "redux"
import { mount } from "enzyme"
import { spy } from "sinon"

import RemoteRetro from "../../web/static/js/components/remote_retro"

describe("RemoteRetro component", () => {
  const mockRetroChannel = { push: spy(), on: () => {} }
  const stubUser = { given_name: "Mugatu" }
  const defaultProps = {
    currentUser: stubUser,
    retroChannel: mockRetroChannel,
    users: [],
    userToken: "",
    store: createStore(() => ({
      users: [],
      ideas: [],
      stage: "idea-generation",
    })),
  }

  context("when the component mounts", () => {
    it("triggers a hotjar event, passing the stage", () => {
      const hotjarSpy = spy(global, "hj")

      mount(<RemoteRetro {...defaultProps} stage="closed" />)

      expect(hotjarSpy.calledWith("trigger", "closed")).to.eql(true)
      hotjarSpy.restore()
    })
  })
})
