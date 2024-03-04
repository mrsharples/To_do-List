import { useEffect, useState } from 'react';
import './Completed.css';
import star from '../assets/star.png';
import tick2 from '../assets/tick2.png';


const Completed = ({ todos }) => {

    const [showMsg, setShowMsg] = useState("");

    const checkTicked = (task) => {
        return task.display === "ticked";
      } 

    useEffect(() => {
        todos.every(checkTicked) ? setShowMsg('show-msg') : setShowMsg("");
    }, [todos])

    return (
        <div className={`all-tasks-completed ${showMsg}`}>
            <img src={star} alt="star.png" />
            <h2>All Tasks Completed!</h2>
            <img src={star} alt="star.png" />
        </div>
    )
    }

export default Completed;