import React from "react"
import { shallow, mount } from "enzyme"

import UserList from "../../web/static/js/components/user_list"
import UserListItem from "../../web/static/js/components/user_list_item"

describe.only("passed an array of users", () => {
  const users = [{
    given_name: "treezy",
    online_at: 803,
    picture: "http://herpderp.com",
  }, {
    given_name: "zander",
    online_at: 801,
    picture: "http://herpderp.com",
  }]

  it("is renders a list item for each user", () => {
    const wrapper = shallow(<UserList users={users} />)
    expect(wrapper.find(UserListItem)).to.have.length(2)
  })

  it("sorts the users by their arrival in the room, ascending", () => {
    const wrapper = mount(<UserList users={users} />)
    expect(wrapper.text()).to.match(/zandertreezy/i)
  })

  describe("when the stage is 'closed'", () => {
    it("displays an iframe", () => {
      const wrapper = mount(<UserList users={users} stage="closed" />)
      expect(wrapper.find("iframe").length).to.equal(1)
    })
  })

  describe("when the stage is not 'closed'", () => {
    it("does not display an iframe", () => {
      const wrapper = mount(<UserList users={users} stage="idea-generation" />)
      expect(wrapper.find("iframe").length).to.equal(0)
    })
  })
})
