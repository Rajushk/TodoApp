import { configureStore } from '@reduxjs/toolkit'
import todoReducer from "../redux/Slice"
import { loadState, saveState } from "../localStore/localStorage"

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    todo:todoReducer,
  },
  preloadedState,
})

store.subscribe(() => {
  saveState(store.getState().todo);
});