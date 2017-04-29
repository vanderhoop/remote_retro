import request from "superagent"

export default class IdeaRestClient {
  static post(idea) {
    return request
      .post(`/retros/${window.retroUUID}/ideas`)
      .send(idea)
      .set({ "x-csrf-token": window.csrfToken })
      .end(err => {
        if (err) console.error(err)
      })
  }

  static delete(id) {
    return request
      .del(`/retros/${window.retroUUID}/ideas/${id}`)
      .set({ "x-csrf-token": window.csrfToken })
      .end(err => {
        if (err) console.error(err)
      })
  }
}
