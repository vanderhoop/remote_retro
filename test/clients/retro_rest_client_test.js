import request from "superagent"
import superagentMocker from "superagent-mocker"
import { spy } from "sinon"

import RetroRestClient from "../../web/static/js/clients/retro_rest_client"

describe("RetroRestClient", () => {
  window.csrfToken = "dkdkdkdkd"

  const mockRestServer = superagentMocker(request)

  before(() => {
    mockRestServer.put("/retros/:retro_id", () => ({}))
  })

  after(() => {
    mockRestServer.clearRoutes()
  })

  describe(".put", () => {
    let putSpy

    before(() => {
      window.retroUUID = "asdfhjkl"
      putSpy = spy(request, "put")
    })

    it("fires a delete request to the idea's REST endpoint", () => {
      RetroRestClient.put({ id: 666, stage: "derppppppp" })
      expect(putSpy.calledWith("/retros/asdfhjkl")).to.equal(true)
      putSpy.restore()
    })
  })
})
