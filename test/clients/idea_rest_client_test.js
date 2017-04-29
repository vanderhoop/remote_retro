import request from "superagent"
import superagentMocker from "superagent-mocker"
import { spy } from "sinon"

import IdeaRestClient from "../../web/static/js/clients/idea_rest_client"

describe("IdeaRestClient", () => {
  window.csrfToken = "dkdkdkdkd"

  const mockRestServer = superagentMocker(request)

  before(() => {
    mockRestServer.post("/retros/:retro_id/ideas", () => ({}))
    mockRestServer.del("/retros/:retro_id/ideas/:id", () => ({}))
    mockRestServer.put("/retros/:retro_id/ideas/:id", () => ({}))
  })

  after(() => {
    mockRestServer.clearRoutes()
  })

  describe(".post", () => {
    let postSpy

    before(() => {
      window.retroUUID = "nonsensicalValue"
      postSpy = spy(request, "post")
    })

    it("fires a POST request to the 'ideas' REST endpoint", () => {
      IdeaRestClient.post({ herp: "derp" })
      expect(postSpy.calledWith("/retros/nonsensicalValue/ideas")).to.equal(true)
      postSpy.restore()
    })
  })

  describe(".delete", () => {
    let deleteSpy

    before(() => {
      window.retroUUID = "herp"
      deleteSpy = spy(request, "del")
    })

    it("fires a delete request to the idea's REST endpoint", () => {
      IdeaRestClient.delete(666)
      expect(deleteSpy.calledWith("/retros/herp/ideas/666")).to.equal(true)
      deleteSpy.restore()
    })
  })

  describe(".put", () => {
    let putSpy

    before(() => {
      window.retroUUID = "larkin"
      putSpy = spy(request, "put")
    })

    it("fires a PUT request to the idea's REST endpoint", () => {
      IdeaRestClient.put({ id: 666, category: "happy" })
      expect(putSpy.calledWith("/retros/larkin/ideas/666")).to.equal(true)
      putSpy.restore()
    })
  })
})
