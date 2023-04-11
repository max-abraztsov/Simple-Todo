import React from 'react';

const InputField = ({text, addTodo, handleInput}) => {
    return (
        <label> 
            <input value={text} onChange={handleInput}/>
            <button onClick={addTodo}>Add Todo</button>
        </label>
    );
};

export default InputField;