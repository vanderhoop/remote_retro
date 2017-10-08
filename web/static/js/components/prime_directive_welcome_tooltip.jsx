import React from "react"
import * as AppPropTypes from "../prop_types"
import styles from "./css_modules/prime_directive_welcome_tooltip.css"

const PrimeDirectiveWelcomeTooltip = ({ user }) => {
  const copy = user.is_facilitator ?
    "Once your team members arrive, advance the retro to the Idea Generation stage!" :
    "The facilitator will begin the Idea Generation stage once everyone has arrived. Hold tight!"
  return (
    <div className={`${styles.primeDirectiveWelcomePrompt} ui floated pointing below teal label`}>
      Hi, {`${user.given_name}`}!<br />
      {copy}
    </div>
  )
}

PrimeDirectiveWelcomeTooltip.propTypes = {
  user: AppPropTypes.user.isRequired,
}

export default PrimeDirectiveWelcomeTooltip
