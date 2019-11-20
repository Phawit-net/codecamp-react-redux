import React from 'react'

import styles from './TodoList.module.css'

import NewTodo from './components/NewTodo'
import Todo from './components/Todo'

class TodoList extends React.Component {
  state = {
    textValue: '',
    todos: []
  }

    componentDidMount = async () => {
    try {
      const response = await fetch('http://localhost:3001/todos')
      const data = await response.json()
      console.log(data)

      this.setState(state =>({
        todos:data.map(x=>x)
      }))
      
    } catch (err) {
      console.log(err)
    }
   }


  handleChange = e => {
    this.setState({
      textValue: e.target.value
    })
  }

  handleAdd = async() => {
    if (!this.state.textValue) return
    try {
    console.log(this.state.textValue)
    await fetch('http://localhost:3001/todos', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        ticked: 'false',
        name: this.state.textValue
          })
        }
    )
    } catch (err) {
      console.log(err)
    }
    this.setState(
      state => ({
        todos: state.todos.concat({ ticked: false, name: state.textValue })
      }),
      () => {
        this.setState({ textValue: '' })
      }
    )

  }

  handleTick = idx => async () => {
    // await fetch('http://localhost:3001/todos/'+ this.state.todos[idx].id, {
    //   method: 'PATCH',
    //   headers: {'content-type': 'application/json'},
    //   body: JSON.stringify({
    //     ticked: this.state.todos[idx].ticked
    //       })
    //     })

    console.log(this.state.todos[idx].ticked)
    this.setState(state => ({
      todos: state.todos.map((todo, todoIdx) =>
        todoIdx === idx ? { ...todo, ticked: !todo.ticked } : todo
      )
    }))
    
    await fetch('http://localhost:3001/todos/'+ this.state.todos[idx].id, {
      method: 'PATCH',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        ticked: !(this.state.todos[idx].ticked)
          })
        })
  
  }

  handleDelete = idx => async() => {
    console.log(this.state.todos[idx].id)
    await fetch('http://localhost:3001/todos/' + this.state.todos[idx].id, {
      method: 'DELETE',
      headers: {'content-type': 'application/json'},
    })

    this.setState(state => ({
      todos: state.todos.filter((todo, todoIdx) => todoIdx !== idx)
    }))
  }

  render = () => {
    return (
      <div className={styles.Root}>
        <NewTodo
          textValue={this.state.textValue}
          onChange={this.handleChange}
          onAdd={this.handleAdd}
        />
        {this.state.todos.map(({ ticked, name }, idx) => (
          <Todo
            key={idx}
            ticked={ticked}
            name={name}
            onTick={this.handleTick(idx)}
            onDelete={this.handleDelete(idx)}
          />
        ))}
      </div>
    )
  }
}

export default TodoList




 