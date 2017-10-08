import React from "react"
import * as AppPropTypes from "../prop_types"
import styles from "./css_modules/user_list_item.css"
import AnimatedEllipsis from "./animated_ellipsis"
import PrimeDirectiveWelcomeTooltip from "./prime_directive_welcome_tooltip"

const UserListItem = ({ user, stage }) => {
  let givenName = user.given_name
  const isPrimeDirective = stage === "prime-directive"
  const imgSrc = user.picture.replace("sz=50", "sz=200")

  if (user.is_facilitator) {
    givenName += " (Facilitator)"
  }

  return (
    <li className={`item ${styles.wrapper}`}>
      { isPrimeDirective && <PrimeDirectiveWelcomeTooltip user={user} /> }
      <img className={styles.picture} src={imgSrc} alt={givenName} />
      <p>{givenName}</p>
      <AnimatedEllipsis animated={user.is_typing} />
    </li>
  )
}

UserListItem.propTypes = {
  user: AppPropTypes.user.isRequired,
  stage: AppPropTypes.stage.isRequired,
}

export default UserListItem
