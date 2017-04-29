import React from "react"
import { shallow } from "enzyme"
import sinon from "sinon"

import IdeaControls from "../../web/static/js/components/idea_controls"
import IdeaRestClient from "../../web/static/js/clients/idea_rest_client"

describe("<IdeaControls />", () => {
  const idea = { id: 666, category: "sad", body: "redundant tests", author: "Trizzle" }
  const mockRetroChannel = { on: () => {}, push: () => {} }

  describe("on click of the removal icon", () => {
    it("invokes the rest client's `delete` method, passing the given idea's id", () => {
      const deleteStub = sinon.stub(IdeaRestClient, "delete")

      const wrapper = shallow(
        <IdeaControls idea={idea} retroChannel={mockRetroChannel} IdeaRestClient={IdeaRestClient} />
      )

      wrapper.find(".remove.icon").simulate("click")
      expect(
        deleteStub.calledWith(666)
      ).to.equal(true)
    })
  })

  describe("on click of the edit icon", () => {
    it("pushes an `enable_edit_state` event to the retro channel, passing the given idea", () => {
      const retroChannel = { on: () => {}, push: sinon.spy() }

      const wrapper = shallow(
        <IdeaControls idea={idea} retroChannel={retroChannel} IdeaRestClient={IdeaRestClient} />
      )

      wrapper.find(".edit.icon").simulate("click")
      expect(
        retroChannel.push.calledWith("enable_edit_state", idea)
      ).to.equal(true)
    })
  })
})
