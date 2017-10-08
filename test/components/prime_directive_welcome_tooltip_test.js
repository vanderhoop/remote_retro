import React from "react"
import { shallow } from "enzyme"

import PrimeDirectiveWelcomeTooltip from "../../web/static/js/components/prime_directive_welcome_tooltip"

describe("<PrimeDirectiveWelcomeTooltip />", () => {
  context("given a facilitator user", () => {
    const facilitatorUser = {
      is_facilitator: true,
      given_name: "Travis",
    }

    it("tells the user to advance the retro once everyone's arrived", () => {
      const wrapper = shallow(<PrimeDirectiveWelcomeTooltip user={facilitatorUser} />)
      expect(wrapper.text()).to.match(
        /once your team members arrive, advance the retro to the idea generation stage/i
      )
    })
  })

  context("given a non-facilitator user", () => {
    const nonFacilitatorUser = {
      is_facilitator: false,
      given_name: "Bryan",
    }

    it("informs the user that the facilitator will advance the retro when ready", () => {
      const wrapper = shallow(<PrimeDirectiveWelcomeTooltip user={nonFacilitatorUser} />)
      expect(wrapper.text()).to.match(
        /facilitator will begin the Idea Generation stage once everyone has arrived/i
      )
    })
  })
})
