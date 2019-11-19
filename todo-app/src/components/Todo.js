import React from 'react'
import styles from './Todo.module.css'

function Todo(props){
    const { ticked =false ,name = "Pizza",onTick ,onDelete,onWord} = props   //มี = คือการประกาศตัวdefault props
    // const { ticked ,name } = props

    return(
        <div className ={styles.Root}>
            <div className = {styles.Tick} onClick = {onTick} style ={{backgroundColor:ticked ?'#a8d097':undefined}}></div>
            <div className = {styles.Text} style ={{textDecoration:ticked ?'line-through':'none'}} onClick={onWord}> {name} </div>
            <div className = {styles.Delete} onClick = {onDelete} > X </div>
        </div>
    )
}

// ประกาศ default props
// Todo.defaultProps = {
//     ticked : false,
//     name : "Pizza"
// }

export default Todo
