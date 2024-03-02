import TodoItems from '../TodoItems/TodoItems';
import tick from '../assets/tick.png';
import './Todo.css';
import { useState, useRef, useEffect } from 'react';

let taskCount = 0;

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
      localStorage.setItem("todos_count", taskCount);
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
      console.log(todos);
      localStorage.setItem("todos", JSON.stringify(todos));
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
              placeholder="Add new task." 
              className="todo-input" 
              onKeyDown={e => e.key === "Enter" ? addTask() : null}
            />
            <div onClick={()=>addTask()} className="todo-add-btn">+ Task</div>
        </div>
        <div className="error-message">
          <p>Please enter a task to add!</p>
        </div>
        <div className="todo-list">
          {todos.map((item,index)=>{
            return <TodoItems key={index} 
                              setTodos={setTodos} 
                              no={item.no} 
                              display={item.display} 
                              text={item.text}
                              />
          })}
        </div>
    </div>
  )
}

export default Todo;