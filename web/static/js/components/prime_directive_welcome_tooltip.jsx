import React from "react"
import * as AppPropTypes from "../prop_types"
import styles from "./css_modules/prime_directive_welcome_tooltip.css"

const PrimeDirectiveWelcomeTooltip = props => {
  const { user } = props
  return (
    <div className={`${styles.primeDirectiveWelcomePrompt} ui floated pointing below teal label`}>
      Hi, {`${user.given_name}`}!<br />
      The facilitator will begin the idea-generation stage once everyone has arrived. Hold tight!
    </div>
  )
}

PrimeDirectiveWelcomeTooltip.propTypes = {
  user: AppPropTypes.user.isRequired,
}

export default PrimeDirectiveWelcomeTooltip
