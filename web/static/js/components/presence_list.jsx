import React from "react"
import PresenceListItem from "./presence_list_item"
import * as AppPropTypes from "../prop_types"
import styles from "./css_modules/presence_list.css"

const PresenceList = props => {
  const presencesSortedByArrival = props.presences.sort((a, b) => a.online_at - b.online_at)

  const listItems = presencesSortedByArrival.map(presence =>
    <PresenceListItem key={presence.token} user={presence} />
  )

  return (
    <section className={`${styles.index} ui center aligned basic segment`}>
      <ul id="user-list" className="ui horizontal list">
        {listItems}
      </ul>
    </section>
  )
}

PresenceList.propTypes = {
  presences: AppPropTypes.presences.isRequired,
}

export default PresenceList
