import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './index.css'

import Tag from '../tags'

const tagsList = [
  {optionId: 'Health', displayText: 'Health'},
  {optionId: 'Education', displayText: 'Education'},
  {optionId: 'Entertainment', displayText: 'Entertainment'},
  {optionId: 'Sports', displayText: 'Sports'},
  {optionId: 'Travel', displayText: 'Travel'},
  {optionId: 'Other', displayText: 'Other'},
]

class Home extends Component {
  state = {
    todoTask: '',
    todoTag: tagsList[0].displayText,
    list: [],
    searchTag: '',
    filteredList: [],
  }

  changeSearchTag = text => {
    const {searchTag} = this.state
    if (searchTag === '' || searchTag !== text) {
      this.setState({searchTag: text}, this.updateFilteredTasks)
    } else {
      this.setState({searchTag: ''}, this.updateFilteredTasks)
    }
  }

  updateTodoTask = event => {
    this.setState({todoTask: event.target.value})
  }

  updateTodoTag = event => {
    this.setState({todoTag: event.target.value})
  }

  addTask = event => {
    event.preventDefault()
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

  updateFilteredTasks = () => {
    const {list, searchTag} = this.state
    if (searchTag !== '') {
      const filteredlist = list.filter(each => each.tag.includes(searchTag))
      this.setState({filteredList: filteredlist})
    } else {
      this.setState({filteredList: []})
    }
  }

  RenderFilteredTasksList = () => {
    const {filteredList} = this.state
    if (filteredList.length === 0) {
      return (
        <div className="noTasksContainer">
          <p>No Tasks added yet</p>
        </div>
      )
    }
    return (
      <ul>
        {filteredList.map(each => (
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
    const toBeRenderItems =
      searchTag === '' ? this.RenderTasksList : this.RenderFilteredTasksList
    return (
      <div className="HomeNameContainer">
        <form className="leftContainer">
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
            type="submit"
          >
            Add Task
          </button>
        </form>
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
          {toBeRenderItems()}
        </div>
      </div>
    )
  }
}

export default Home
