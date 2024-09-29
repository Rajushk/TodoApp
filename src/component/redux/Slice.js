import { createSlice } from "@reduxjs/toolkit";

export const todo = createSlice({
    name: "todo",
    initialState: [],
    reducers: {
        addtodo: (state, actions) => {
            const { name, id,check } = actions.payload;
            state.push({ name, id, check});
        },
        deletetodo: (state, actions) => {
            return state.filter((data) => data.id !== actions.payload);
        },
        updatetodo: (state, actions) => {
            return state.map((data) =>
                data.id === actions.payload.id ? { ...data, name: actions.payload.name } : data
            );
        },
        checktodo:(state,actions)=>{
            return state.map((data)=>
                data.id===actions.payload ? {...data, check:!data.check}: data
            );
        },
        reorderTodo: (state, action) => {
            return action.payload; // Update state with the new order
        }
    },
});

export const { addtodo, deletetodo, updatetodo ,checktodo,reorderTodo} = todo.actions;
export default todo.reducer;
