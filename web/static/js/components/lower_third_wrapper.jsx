import React from "react"
import { CSSTransitionGroup } from "react-transition-group"

import styles from "./css_modules/lower_third_wrapper.css"

const LowerThirdWrapper = ({ children, displayContents }) => {
  const contents = (
    <div key="herp" className="ui stackable grid basic attached secondary center aligned segment">
      {children}
    </div>
  )

  return (
    <CSSTransitionGroup
      transitionName="translateY"
      transitionAppear
      transitionLeave
      transitionAppearTimeout={700}
      transitionLeaveTimeout={70000}
      transitionEnter={false}
    >
      {displayContents && contents}
    </CSSTransitionGroup>
  )
}
LowerThirdWrapper.defaultProps = {}

LowerThirdWrapper.propTypes = {
  children: React.PropTypes.node.isRequired,
}

export default LowerThirdWrapper
