import React from 'react';
import {deleteTodo, toggleTodoComplete} from "../store/todoSlice"
import { useDispatch } from "react-redux";

const TodoItem = ({completed, id, text }) => {

    const dispatch = useDispatch();

    return (
        <li>
            <input 
            type="checkbox" 
            checked={completed} 
            onChange={() => dispatch(toggleTodoComplete({id}))} 
            />
            <span>{text}</span>
            <span 
            className='delete' 
            onClick={() => dispatch(deleteTodo({id}))} 
            >&times;</span>
        </li>
    );
};

export default TodoItem;