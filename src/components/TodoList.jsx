import React from 'react';
import { useSelector } from "react-redux";
import TodoItem from './TodoItem';

const TodoList = () => {
    const todos = useSelector(state => state.todos.todos);

    return ( 
        <ul>
            {todos.map(todo => 
            <TodoItem 
                key={todo.id}
                id={todo.id}
                completed={todo.completed}
                title={todo.title} 
            />)}
        </ul>
    );
};

export default TodoList;