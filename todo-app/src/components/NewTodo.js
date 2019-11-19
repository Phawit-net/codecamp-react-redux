import React from 'react'
import styles from './NewTodo.module.css'

function NewTodo(props){
    const {onAdd,onValue,onEnter,value}=props
    return(
        <div className ={styles.Root}>
            <input type="text" className = {styles.Input} placeholder="Enter Todo" value={value} onChange={onValue}  onKeyDown={onEnter}/>
            <button type ="submit" className = {styles.button} onClick ={onAdd}>ADD</button>
        </div>
    )
}

export default NewTodo
