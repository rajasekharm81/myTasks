import {Component} from 'react'
import './index.css'

class Tag extends Component {
  sendId = () => {
    const {id, SendTag} = this.props
    SendTag(id)
  }

  render() {
    const {item, classNameSet} = this.props
    const ClassSet = classNameSet ? 'inActiveButton' : 'activeButton'
    return (
      <li className="listItem">
        <button className={ClassSet} onClick={this.sendId} type="button">
          {item.displayText}
        </button>
      </li>
    )
  }
}

export default Tag
