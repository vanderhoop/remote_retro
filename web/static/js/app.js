import "phoenix_html"

import React, { Component } from 'react'
import { render } from 'react-dom'
import styles from '../css/react_playground.css'

class ReactPlayground extends Component {
  render(){
    return (
      <div className={ styles.sampleClass }>
        <p>The React Playground</p>
      </div>
    )
  }
}

render(<ReactPlayground/>, document.querySelector('.react-root'))
