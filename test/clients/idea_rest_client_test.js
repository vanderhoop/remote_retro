import request from "superagent"
import superagentMocker from "superagent-mocker"
import { spy } from "sinon"

import IdeaRestClient from "../../web/static/js/clients/idea_rest_client"

describe("IdeaRestClient", () => {
  const mockRestServer = superagentMocker(request)

  window.csrfToken = "dkdkdkdkd"

  describe(".post", () => {
    let postSpy

    before(() => {
      window.retroUUID = "nonsensicalValue"
      postSpy = spy(request, "post")
      mockRestServer.post("/retros/:retro_id/ideas", () => ({}))
    })

    it("fires a POST request to the 'ideas' REST endpoint", () => {
      IdeaRestClient.post({ herp: "derp" })
      expect(postSpy.calledWith("/retros/nonsensicalValue/ideas")).to.equal(true)
    })

    after(() => {
      postSpy.restore()
      mockRestServer.clearRoutes()
    })
  })

  describe(".delete", () => {
    let deleteSpy

    before(() => {
      window.retroUUID = "herp"
      deleteSpy = spy(request, "del")
      mockRestServer.del("/retros/herp/ideas/:id", () => ({}))
    })

    it("fires a delete request to the idea's REST endpoint", () => {
      IdeaRestClient.delete(666)
      expect(deleteSpy.calledWith("/retros/herp/ideas/666")).to.equal(true)
    })

    after(() => {
      deleteSpy.restore()
      mockRestServer.clearRoutes()
    })
  })
})
