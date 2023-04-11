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


const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todos: [],
        status: null,
        error: null,
    },
    reducers: {
        addTodo(state, action){
            state.todos.push({
                id: Date.now(), 
                title: action.payload.title, 
                completed: false,
            })
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
        [fetchTodos.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        },
    },
})

export const {addTodo, deleteTodo, toggleTodoComplete} = todoSlice.actions;
export default todoSlice.reducer;