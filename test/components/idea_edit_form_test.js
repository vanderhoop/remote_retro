import React from "react"
import { shallow, mount } from "enzyme"
import sinon from "sinon"

import IdeaEditForm from "../../web/static/js/components/idea_edit_form"
import IdeaRestClient from "../../web/static/js/clients/idea_rest_client"

describe("<IdeaEditForm />", () => {
  const idea = { id: 999, category: "sad", body: "redundant tests", author: "Trizzle" }
  const mockRetroChannel = { on: () => {}, push: () => {} }
  const defaultProps = { idea, IdeaRestClient, retroChannel: mockRetroChannel }

  describe("on initial render", () => {
    it("is pre-populated with the given idea's body text", () => {
      const wrapper = shallow(<IdeaEditForm {...defaultProps} />)

      const textAreaValue = wrapper.find("textarea").props().value
      expect(textAreaValue).to.equal("redundant tests")
    })
  })

  describe("on change of the textarea", () => {
    let retroChannel
    let textarea
    let wrapper

    beforeEach(() => {
      retroChannel = { on: () => {}, push: sinon.spy() }
      wrapper = mount(<IdeaEditForm {...defaultProps} retroChannel={retroChannel} />)
      textarea = wrapper.find("textarea")
      textarea.simulate("change", { target: { value: "some value" } })
    })

    it("the value prop of the textarea updates in turn", () => {
      expect(textarea.props().value).to.equal("some value")
    })

    it("pushes a `idea_live_edit` event to the retroChannel, passing current input value", () => {
      expect(
        retroChannel.push.calledWith("idea_live_edit", { id: idea.id, liveEditText: "some value" })
      ).to.equal(true)
    })
  })

  describe("on submitting the form", () => {
    let putSpy

    before(() => {
      putSpy = sinon.stub(IdeaRestClient, "put")
      const wrapper = mount(<IdeaEditForm {...defaultProps} />)

      wrapper.simulate("submit")
    })

    it("fires a PUT request to the idea's REST endpoint", () => {
      expect(putSpy.calledWith({ id: idea.id, body: idea.body })).to.equal(true)
      putSpy.restore()
    })
  })

  describe("on cancelling out of the edit form", () => {
    it("pushes a `disable_edit_state` event to the given retroChannel", () => {
      const retroChannel = { on: () => {}, push: sinon.spy() }

      const wrapper = mount(<IdeaEditForm {...defaultProps} retroChannel={retroChannel} />)
      const cancelButton = wrapper.findWhere(element => (element.text() === "Cancel"))

      cancelButton.simulate("click")

      expect(
        retroChannel.push.calledWith("disable_edit_state", { id: idea.id })
      ).to.equal(true)
    })
  })
})
