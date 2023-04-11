import React from 'react';
import {deleteTodo, toggleTodoComplete} from "../store/todoSlice"
import { useDispatch } from "react-redux";

const TodoItem = ({completed, id, title }) => {

    const dispatch = useDispatch();

    return (
        <li>
            <input 
            type="checkbox" 
            checked={completed} 
            onChange={() => dispatch(toggleTodoComplete({id}))} 
            />
            <span>{title}</span>
            <span 
            className='delete' 
            onClick={() => dispatch(deleteTodo({id}))} 
            >&times;</span>
        </li>
    );
};

export default TodoItem;