import React from 'react';

const InputField = ({title, addTodo, handleInput}) => {
    return (
        <label> 
            <input value={title} onChange={handleInput}/>
            <button onClick={addTodo}>Add Todo</button>
        </label>
    );
};

export default InputField;