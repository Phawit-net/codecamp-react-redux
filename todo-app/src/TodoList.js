import React from 'react'

import styles from './TodoList.module.css'

import NewTodo from './components/NewTodo'
import Todo from './components/Todo'

class TodoList extends React.Component {
  state = {
    textValue: '',
    todos: []  // {id :string , ticked : boolean ,  name : string }
  }

    componentDidMount = async () => {
    console.log("Initialize") 
    try {
      const response = await fetch('http://localhost:3001/todos')
      console.log(response)
      const data = await response.json() 
      
      this.setState(state =>({
        todos:data
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
        ticked: false,
        name: this.state.textValue
          })
        }
    )
    } catch (err) {
      console.log(err)
    }
    const response = await fetch('http://localhost:3001/todos')
    const data = await response.json() 

    this.setState(state =>({
      todos:data,
      textValue:''
    }))

    // this.setState(
    //   state => ({
    //     todos: state.todos.concat({ ticked: false, name: state.textValue })
    //   }),
    //   () => {
    //     this.setState({ textValue: '' })
    //   }
    // )

  }

  handleTick = id => async () => {
    // await fetch('http://localhost:3001/todos/'+ this.state.todos[idx].id, {
    //   method: 'PATCH',
    //   headers: {'content-type': 'application/json'},
    //   body: JSON.stringify({
    //     ticked: !(this.state.todos[idx].ticked)
    //       })
    //     })
    const tickedTodo = this.state.todos.find(x => x.id === id)
    tickedTodo.ticked = !tickedTodo.ticked 

    await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(tickedTodo)
    })

    const response = await fetch('http://localhost:3001/todos')
    const data = await response.json() 

    this.setState(state =>({data}))

    // this.setState(state => ({
    //   todos: state.todos.map((todo, todoIdx) =>
    //     todoIdx === idx ? { ...todo, ticked: !todo.ticked } : todo
    //   )
    // })) 
  }
  
  // componentDidUpdate= async (prevProps,prevState) => {
  //   console.log("update")
  //   console.log(prevState.todos.map(x => x.id))
  //   await fetch('http://localhost:3001/todos/'+prevState.todos.map(x => x.id), {
  //     method: 'PATCH',
  //     headers: {'content-type': 'application/json'},
  //     body: JSON.stringify({
  //       ticked: prevState.todos.map(x => x.ticked)
  //         })
  //       })
  // }

  handleDelete = id => async() => {
    // console.log(this.state.todos[idx].id)
    await fetch(`http://localhost:3001/todos/${id}`, {
      method: 'DELETE',
      headers: {'content-type': 'application/json'},
    })

    const response = await fetch('http://localhost:3001/todos')
    const data = await response.json() 

    this.setState({todos:data})
    
    // this.setState(state => ({
    //   todos: state.todos.filter((todo, todoIdx) => todoIdx !== id)
    // }))
  }

  render = () => {
    return (
      <div className={styles.Root}>
        <NewTodo
          textValue={this.state.textValue}
          onChange={this.handleChange}
          onAdd={this.handleAdd}
        />
        {this.state.todos.map(({ ticked, name ,id},idx) => ( //ไม่ได้ใช้ indexแล้ว 
          <Todo
            key={idx}
            ticked={ticked}
            name={name}
            onTick={this.handleTick(id)}
            onDelete={this.handleDelete(id)}
          />
        ))}
      </div>
    )
  }
}

export default TodoList




 