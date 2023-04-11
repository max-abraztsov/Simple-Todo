import { useState } from 'react'
import { useDispatch } from "react-redux";
import {addTodo} from "./store/todoSlice"
import './App.css'
import TodoList from './components/TodoList';
import InputField from './components/InputField';

function App() {
  
  const [text, setText] = useState("");

  const dispatch = useDispatch();
  const addTask = () => {
    dispatch(addTodo({text}));
    setText("");
  };

  return (
    <div className="App">
      <InputField 
        text={text} 
        addTodo={addTask}
        handleInput={(e) => {setText( e.target.value )}}
      />
      <TodoList/>
    </div>
  )
}

export default App
