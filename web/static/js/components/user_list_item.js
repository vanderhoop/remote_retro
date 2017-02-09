import React from "react"

function UserListItem(props) {
  return (
    <li className="item">
      <div className="ui center aligned grid">
        <div className="ui row">{ props.user.name }</div>
        <video src={ props.user.videoSrc } muted={ props.user.muted } autoPlay></video>
      </div>
    </li>
  )
}

UserListItem.propTypes = {
  user: React.PropTypes.object.isRequired
}

export default UserListItem
