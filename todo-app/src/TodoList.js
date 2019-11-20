import React from 'react'
import Todo from './components/Todo'
import NewTodo from './components/NewTodo'
import styles from './TodoList.module.css'

class TodoList extends React.Component {
  state = {
    todos:[],
    textValue:'' //ต้อง Link ไปที่ value ใน input text
  }

  handleTick = (idx) => {  //เพราะถ้าไม่ทำแบบนี้ จะส่งค่า idxไม่ได้
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
  
  handleAdd = (e)=>{   //แนะนำในให้ใช้setState แบบfunctionมากกว่า
    if (!this.state.textValue) return
    const {todos} = this.state
    this.setState({   //setState แบบ Object
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
      this.setState({  //ตรงนี้ อาจจะทำก่อนได้เพราะเป็น async เราจึงต้องเอาไปใส่ใน call back ของsetState
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
        <Todo key = {indx} ticked = {todo.ticked} name ={todo.name} onDelete = {this.handleDelete(indx)} onTick = {()=>this.handleTick(indx)} onWord={this.handleWord(indx)}/>
      ))}
      {/* โดยปกติในJSX ไม่ให้เราใส่ onTick = {this.handleTick(indx)} ()ในfunction ไม่งั้นจะเป็นการรันfunctionแต่เราต้องการให้มันทำตอนกด eventและจะ ส่ง parameter จึงต้องใช้ high order function 
          หรือ จะใส่ onDelete = {()=>this.handleDelete(indx)} เพื่อให้มันรอทำ function */}
    </div>
    )
  }
}

export default TodoList
