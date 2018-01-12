import React from "react"
import { shallow } from "enzyme"

import PresenceList from "../../web/static/js/components/presence_list"
import PresenceListItem from "../../web/static/js/components/presence_list_item"

describe("passed an array of presences", () => {
  const presences = [{
    given_name: "treezy",
    online_at: 803,
    picture: "http://herpderp.com",
    token: "requiredAsUniqueKey",
  }, {
    given_name: "zander",
    online_at: 801,
    picture: "http://herpderp.com",
    token: "requiredAsADifferentUniqueKey",
  }]

  it("is renders a list item for each presence", () => {
    const wrapper = shallow(<PresenceList presences={presences} />)
    expect(wrapper.find(PresenceListItem)).to.have.length(2)
  })

  it("sorts the presences by their arrival in the room, ascending", () => {
    const wrapper = mountWithConnectedSubcomponents(<PresenceList presences={presences} />)
    expect(wrapper.text()).to.match(/zandertreezy/i)
  })
})
