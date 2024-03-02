import './TodoItems.css';
import tick from '../assets/tick.png';
import not_tick from '../assets/not_tick.png';
import Cross from './../Cross/Cross';

const TodoItems = ({no, display, text, setTodos}) => {

  const toggleIcon = (no) => {
    let data = JSON.parse(localStorage.getItem("todos"));
    for (let i = 0; i < data.length; i++) {
      if (data[i].no === no) {
        if (data[i].display === "") {
          data[i].display = "ticked";
        }
        else {
          data[i].display = "";
        }
        break;
      }
    }
    setTodos(data);
  }

  return (
    <div className="todo-items">
        <div className={`todo-items-container ${display}`} onClick={()=>{toggleIcon(no)}}>
            {display === "" ? 
              <img src={not_tick} alt="not_tick.png"/> :
              <img src={tick} alt="tick.png"/>
            }
            <div className="todo-items-text">
              {display === "" ?
              text :
              text.concat(" (completed)")
            }
              
            </div>
        </div>
        <Cross no={no} setTodos={setTodos}/>
    </div>
  )
}

export default TodoItems