// localStorage.js

const LOCAL_STORAGE_KEY = 'todos';

// Load tasks from localStorage
export const loadState = () => {
    try {
        const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
        return {
            todo: serializedState ? JSON.parse(serializedState) : [] // Correctly structured as an object
        };
    } catch (err) {
        return { todo: [] }; // Return an empty array for todos
    }
};

// Save tasks to localStorage
export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
    } catch (err) {
        // Handle errors if needed
    }
};
