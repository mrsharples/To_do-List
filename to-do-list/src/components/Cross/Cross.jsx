import { useState } from "react"
import cross from '../assets/cross.png';
import cross_hover from '../assets/cross_hover.png';

import './Cross.css';

const Cross = ({no, todos, setTodos}) => {

    const deleteTask = (no) => {
        let data = JSON.parse(localStorage.getItem("todos"));
        data = data.filter(todo => todo.no !== no)
        let newList = [];
        for (let i = 0; i < data.length; i++) {
            newList.push({
                no: i,
                text:data[i].text,
                display:data[i].display
            })
            }
        setTodos(newList);
        localStorage.setItem("todos_count", todos.length - 1);
    }

    const [img, setImg] = useState(cross);

    const handleMouseEnter = () => {
        return () => {
            setImg(cross_hover);
        }
    }

    const handleMouseOut = () => {
        return () => {
            setImg(cross);
        }
    }

    return (
        <img className='todo-items-cross-icon' onClick={()=>{deleteTask(no)}} src={img} alt="cross.png" onMouseEnter={handleMouseEnter()} onMouseLeave={handleMouseOut()} />
    )
}

export default Cross;