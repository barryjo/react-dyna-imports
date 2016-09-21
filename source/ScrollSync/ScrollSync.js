import { Component, PropTypes } from 'react'
import shallowCompare from 'react-addons-shallow-compare'

/**
 * HOC that simplifies the process of synchronizing scrolling between two or more virtualized components.
 */
export default class ScrollSync extends Component {
  static propTypes = {
    /**
     * Function responsible for rendering 2 or more virtualized components.
     * This function should implement the following signature:
     * ({ onScroll, scrollLeft, scrollTop }) => PropTypes.element
     */
    children: PropTypes.func.isRequired
  }

  constructor (props, context) {
    super(props, context)

    this.state = {
      clientHeight: 0,
      clientWidth: 0,
      scrollHeight: 0,
      scrollLeft: 0,
      scrollTop: 0,
      scrollWidth: 0
    }

    this._onScroll = this._onScroll.bind(this)
  }

  render () {
    const { children } = this.props
    const { clientHeight, clientWidth, scrollHeight, scrollLeft, scrollTop, scrollWidth } = this.state

    return children({
      clientHeight,
      clientWidth,
      onScroll: this._onScroll,
      scrollHeight,
      scrollLeft,
      scrollTop,
      scrollWidth
    })
  }

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  _onScroll ({ clientHeight, clientWidth, scrollHeight, scrollLeft, scrollTop, scrollWidth }) {
    this.setState({ clientHeight, clientWidth, scrollHeight, scrollLeft, scrollTop, scrollWidth })
  }
}
