import request from "superagent"

const logError = err => { if (err) console.error(err) }

export default class IdeaRestClient {
  static put(retro) {
    return request
      .put(`/retros/${window.retroUUID}`)
      .send(retro)
      .set({ "x-csrf-token": window.csrfToken })
      .end(logError)
  }
}
