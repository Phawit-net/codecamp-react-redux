import React from 'react'
import Todo from './components/Todo'
import NewTodo from './components/NewTodo'
import styles from './TodoList.module.css'

class TodoList extends React.Component {
  state = {
    todos:[],
    textValue:'' //ต้อง Link ไปที่ value ใน input text
  }

  handleTick = (e)=>{
    console.log(e.target)
  }

  handleDelete = indx => () => {
    console.log(indx)
    this.setState({
      todos: this.state.todos.filter((todo, todoIdx) => todoIdx !== indx)
    })

  }

  handleAdd = ()=>{
    if (!this.state.textValue) return
    const {todos} = this.state
    this.setState({
      todos: this.state.todos !== '' ? todos.concat({ ticked: false, name:this.state.textValue }):''
    })   
  }

  handleValue = (e)=>{
    console.log(e.target.value)
    this.setState({
      textValue : e.target.value
    })
  }

  render = () => {
    return( 
    <div className = {styles.Root}>
      <NewTodo value ={this.state.textValue} onValue={this.handleValue} onAdd = {this.handleAdd}/>
      {this.state.todos.map((todo,indx)=>(
        <Todo key = {indx} ticked = {todo.ticked} name ={todo.name} onDelete = {this.handleDelete(indx)} onTick = {this.handleTick}/>
      ))}
    </div>
    )
  }
}

export default TodoList
