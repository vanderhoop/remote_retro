import React from "react"
import { CSSTransitionGroup } from "react-transition-group"

import styles from "./css_modules/lower_third_wrapper.css"

const LowerThirdWrapper = ({ children }) => (
  <CSSTransitionGroup
    transitionName={{ appear: styles.appear, appearActive: styles.appearActive }}
    transitionAppear
    transitionAppearTimeout={700}
    transitionEnter={false}
    transitionLeave={false}
  >
    <div className="ui stackable grid basic attached secondary center aligned segment">
      {children}
    </div>
  </CSSTransitionGroup>
)

LowerThirdWrapper.defaultProps = {}

LowerThirdWrapper.propTypes = {
  children: React.PropTypes.node.isRequired,
}

export default LowerThirdWrapper
