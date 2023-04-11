import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

export const fetchTodos = createAsyncThunk(
    "todos/fetchTodos",
    async function(_, {rejectWithValue}){
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
            
            if (!response.ok) throw new Error("Server Error!");

            const data = await response.json();
            return data;

        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
);

export const removeTodo = createAsyncThunk(
    "todos/removeTodo",
    async function(id, {rejectWithValue, dispatch}){
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: "DELETE",
            });
            
            if (!response.ok) throw new Error("Can\'t delete from server!");

            dispatch(deleteTodo({id}));

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const toggleStatus = createAsyncThunk(
    "todos/toggleStatus",
    async function(id, {rejectWithValue, dispatch, getState}){
        const todo = getState().todos.todos.find(todo => todo.id === id);

        try{
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                   completed: !todo.completed,
                })
            }); 

            if (!response.ok) throw new Error("Can\'t toggle status!");

            dispatch(toggleTodoComplete({id}));

        }catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addNewTodo = createAsyncThunk(
    'todos/addNewTodo',
    async function(title, {rejectWithValue, dispatch}){
        
        try{
            const todo = {
                title: title,
                userId: 1,
                completed: false,
            }


            const response = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify(todo)

            })

            if (!response.ok) throw new Error("Can\'t add a new task!");

            const data = await response.json();
            dispatch(addTodo(data));

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)



const setError = (state, action) => {
    state.status = "rejected";
    state.error = action.payload;
}


const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todos: [],
        status: null,
        error: null,
    },
    reducers: {
        addTodo(state, action){
            state.todos.push(action.payload)
        },
        deleteTodo(state, action){
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
        },
        toggleTodoComplete(state, action){
            const toggledTodo = state.todos.find(todo => todo.id === action.payload.id);
            toggledTodo.completed = !toggledTodo.completed;
        },
    },
    extraReducers: {
        [fetchTodos.pending]: (state) => {
            state.status = "loading";
            state.error = null;
        },
        [fetchTodos.fulfilled]: (state, action) => {
            state.status = "resolved";
            state.todos = action.payload;
        },
        [fetchTodos.rejected]: setError,
        [removeTodo.rejected]: setError,
        [toggleStatus.rejected]: setError,
        [addNewTodo.rejected]: setError,
    },
})

const {addTodo, deleteTodo, toggleTodoComplete} = todoSlice.actions;
export default todoSlice.reducer;