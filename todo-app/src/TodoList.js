import React from 'react'
import Todo from './components/Todo'
import NewTodo from './components/NewTodo'
import styles from './TodoList.module.css'

class TodoList extends React.Component {
  state = {
    todos:[],
    textValue:'' //ต้อง Link ไปที่ value ใน input text
  }

  handleTick = idx => () => {
    this.setState(state => ({
      todos: state.todos.map((todo, todoIdx) =>
        todoIdx === idx ? { ...todo, ticked: !todo.ticked } : todo
      )
    }))
  }

  // handleDelete = indx => () => {
  //   console.log(indx)
  //   this.setState({
  //     todos: this.state.todos.filter((todo, todoIdx) => todoIdx !== indx)
  //   })
  // }
  handleDelete(indx){
    return ()=>{
      this.setState({
        todos: this.state.todos.filter((todo, todoIdx) => todoIdx !== indx)
        })
    }
  }

  handleAdd = (e)=>{
    if (!this.state.textValue) return
    const {todos} = this.state
    this.setState({
      todos: this.state.todos !== '' ? todos.concat({ ticked: false, name:this.state.textValue }):''
    })   
    this.setState({
      textValue : ''
    })
  }

  handleEnter = (e)=>{
    if (!this.state.textValue) return
    if (e.key === 'Enter') {
      const {todos} = this.state
      this.setState({
        todos: this.state.todos !== '' ? todos.concat({ ticked: false, name:this.state.textValue }):''
      })  
      this.setState({
        textValue : ''
      })
    } 
  }

  handleWord = idx => () => {
    this.setState(state => ({
      todos: state.todos.map((todo, todoIdx) =>
        todoIdx === idx ? { ...todo, ticked: !todo.ticked } : todo
      )
    }))
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
      <NewTodo value ={this.state.textValue} onValue={this.handleValue} onAdd = {this.handleAdd} onEnter ={this.handleEnter}/>
      {this.state.todos.map((todo,indx)=>(
        <Todo key = {indx} ticked = {todo.ticked} name ={todo.name} onDelete = {this.handleDelete(indx)} onTick = {this.handleTick(indx)} onWord={this.handleWord(indx)}/>
      ))}
    </div>
    )
  }
}

export default TodoList
