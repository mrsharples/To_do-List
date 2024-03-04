import TodoItems from '../TodoItems/TodoItems';
import tick from '../assets/tick.png';
import './Todo.css';
import { useState, useRef, useEffect } from 'react';
import Completed from './../Completed/Completed';

let taskCount = localStorage.getItem("todos_count") ? 
                  localStorage.getItem("todos_count") : 0;

const Todo = () => {

  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);

  const addTask = () => {
    if (inputRef.current.value !== "") {
      setTodos([...todos, {
        no:taskCount++,
        text:inputRef.current.value,
        display:""
      }])
      inputRef.current.value="";
      localStorage.setItem("todos_count", todos.length + 1);
      document.querySelector(".error-message").style.display = "none";
    }
    else {
      document.querySelector(".error-message").style.display = "block";
      setTimeout(() => {
        document.querySelector(".error-message").style.display = "none";
      }, 3000)
    }
  }

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todos")));
    taskCount = localStorage.getItem("todos_count");
  }, [])

  useEffect(()=>{
    setTimeout(() => {
      localStorage.setItem("todos", JSON.stringify(todos));
      taskCount = localStorage.getItem("todos_count");
    }, 100)
  }, [todos]) //executes when todos state changegs

  return (
    <div className='todo'>
        <div className="todo-header">
            <h1>To-Do List</h1>
            <img src={tick} alt="tick.png"/>
        </div>
        <div className="todo-add">
            <input 
              ref={inputRef} 
              type="text" 
              placeholder="Add new task..." 
              className="todo-input" 
              onKeyDown={e => e.key === "Enter" ? addTask() : null}
            />
            <div onClick={()=>addTask()} className="todo-add-btn">+ Task</div>
        </div>
        <div className="error-message">
          <p>Please enter a task to add!</p>
        </div>
        <div className="todo-list">
          {todos.map((task, index)=>{
            return <TodoItems key={index} 
                              todos={todos}
                              setTodos={setTodos} 
                              no={task.no} 
                              display={task.display} 
                              text={task.text}
                              />
          })}
        </div>
        <Completed todos={todos}/>
    </div>
  )
}

export default Todo;