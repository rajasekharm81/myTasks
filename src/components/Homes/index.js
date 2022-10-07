import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './index.css'

import Tag from '../tags'

const tagsList = [
  {id: 'Health', displayText: 'Health'},
  {id: 'Education', displayText: 'Education'},
  {id: 'Entertainment', displayText: 'Entertainment'},
  {id: 'Sports', displayText: 'Sports'},
  {id: 'Travel', displayText: 'Travel'},
  {id: 'Other', displayText: 'Other'},
]

class Home extends Component {
  state = {
    todoTask: '',
    todoTag: tagsList[0].displayText,
    list: [{id: uuidv4(), task: 'jii', tag: 'Health'}],
    searchTag: '',
  }

  changeSearchTag = text => {
    const {searchTag} = this.state
    if (searchTag === '' || searchTag !== text) {
      this.setState({searchTag: text})
    } else {
      this.setState({searchTag: ''})
    }
  }

  updateTodoTask = event => {
    this.setState({todoTask: event.target.value})
  }

  updateTodoTag = event => {
    this.setState({todoTag: event.target.value})
  }

  addTask = () => {
    const {todoTag, todoTask} = this.state
    this.setState(prevState => ({
      list: [...prevState.list, {id: uuidv4(), task: todoTask, tag: todoTag}],
      todoTask: '',
      todoTag: tagsList[0].displayText,
    }))
  }

  RenderTasksList = () => {
    const {list} = this.state
    if (list.length === 0) {
      return (
        <div className="noTasksContainer">
          <p>No Tasks added yet</p>
        </div>
      )
    }
    return (
      <ul>
        {list.map(each => (
          <li key={each.id} className="listItemContainer">
            <p>{each.task}</p>
            <p>{each.tag}</p>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const {todoTask, todoTag, searchTag} = this.state
    console.log(searchTag)
    return (
      <div className="HomeNameContainer">
        <div className="leftContainer">
          <h1>Create a task!</h1>
          <label className="label" htmlFor="task">
            Task
          </label>
          <input
            value={todoTask}
            className="input"
            type="text"
            placeholder="Enter the task here"
            onChange={this.updateTodoTask}
          />
          <label className="label" htmlFor="tagId">
            Tags
          </label>
          <select
            onChange={this.updateTodoTag}
            value={todoTag}
            className="input"
            id="tags"
          >
            {tagsList.map(each => (
              <option key={each.id}>{each.displayText}</option>
            ))}
          </select>
          <button
            onClick={this.addTask}
            className="AddTaskButton"
            type="button"
          >
            Add Task
          </button>
        </div>
        <div className="rightContainer">
          <h1>Tags</h1>
          <ul className="tagsUl">
            {tagsList.map(each => (
              <Tag
                SendTag={this.changeSearchTag}
                id={each.id}
                key={each.id}
                item={each}
                classNameSet={searchTag === each.id}
              />
            ))}
          </ul>
          <h1>Tasks</h1>
          {this.RenderTasksList()}
        </div>
      </div>
    )
  }
}

export default Home
