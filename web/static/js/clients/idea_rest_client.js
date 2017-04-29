import request from "superagent"

const logError = err => { if (err) console.error(err) }

export default class IdeaRestClient {
  static post(idea) {
    return request
      .post(`/retros/${window.retroUUID}/ideas`)
      .send(idea)
      .set({ "x-csrf-token": window.csrfToken })
      .end(logError)
  }

  static put(idea) {
    return request
      .put(`/retros/${window.retroUUID}/ideas/${idea.id}`)
      .send(idea)
      .set({ "x-csrf-token": window.csrfToken })
      .end(logError)
  }

  static delete(id) {
    return request
      .del(`/retros/${window.retroUUID}/ideas/${id}`)
      .set({ "x-csrf-token": window.csrfToken })
      .end(logError)
  }
}
