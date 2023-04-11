import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {addTodo, fetchTodos} from "./store/todoSlice"
import './App.css'
import TodoList from './components/TodoList';
import InputField from './components/InputField';

function App() {
  
  const [title, setTitle] = useState("");

  const {status, error} = useSelector( state => state.todos);

  const dispatch = useDispatch();
  const addTask = () => {
    dispatch(addTodo({title}));
    setTitle("");
  };

  useEffect( () => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className="App">
      <InputField 
        title={title} 
        addTodo={addTask}
        handleInput={(e) => {setTitle( e.target.value )}}
      />

      {status === "loading" && <h2>Loading...</h2>}
      {error && <h2>An error occured: {error} </h2>}

      <TodoList/>
    </div>
  )
}

export default App
