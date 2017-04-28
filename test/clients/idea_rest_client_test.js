import request from "superagent"
import superagentMocker from "superagent-mocker"
import { spy } from "sinon"

import IdeaRestClient from "../../web/static/js/clients/idea_rest_client"

describe("IdeaRestClient", () => {
  describe(".post", () => {
    let postSpy
    let mockRestServer

    before(() => {
      window.csrfToken = "dkdkdkdkd"
      window.retroUUID = "nonsensicalValue"
      postSpy = spy(request, "post")
      mockRestServer = superagentMocker(request)
      mockRestServer.post("/retros/:retro_id/ideas", () => ({}))
    })

    it("fires a POST request to the 'ideas' REST endpoint", () => {
      IdeaRestClient.post({ herp: "derp" })
      expect(postSpy.calledWith("/retros/nonsensicalValue/ideas")).to.equal(true)
      postSpy.restore()
    })

    after(() => {
      mockRestServer.clearRoutes()
    })
  })
})
