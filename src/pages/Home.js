import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addtodo, deletetodo, updatetodo, checktodo, reorderTodo } from "../component/redux/Slice";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Completed from "../component/Completed";

const Home = ({ theme }) => {
    const todoData = useSelector((state) => state.todo);
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [checkCount, setCheckCount] = useState(0);
    const [editId, setEditId] = useState(null);

    function generateRandomString(length) {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
        return result;
    }

    const changeHandler = (event) => {
        setName(event.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (name.trim() !== "") {
            if (editId) {
                dispatch(updatetodo({ id: editId, name }));
                setEditId(null);
                setName("");
            } else {
                const id = generateRandomString(5);
                dispatch(addtodo({ name, id, check: false }));
                setName("");
            }
        }
    };

    const deleteHandler = (id) => {
        dispatch(deletetodo(id));
        if (todoData.length) {
            setName("");
            setEditId(null);
        }
    };

    const editHandler = (id) => {
        const editName = todoData.find((data) => data.id === id);
        setName(editName.name);
        setEditId(id);
    };

    const checkHandler = (id) => {
        dispatch(checktodo(id));
    };

    useEffect(() => {
        const count = todoData.filter((data) => data.check === false).length;
        setCheckCount(count);
    }, [todoData]);

    const onDragEnd = (result) => {
        const { source, destination } = result;
    
        // If there's no destination, exit
        if (!destination) return;
    
        // Separate pending and completed tasks
        const pendingTodos = todoData.filter(task => !task.check); // Only unchecked tasks (to-do)
        const completedTodos = todoData.filter(task => task.check); // Checked tasks (completed)
    
        // Reorder only the pending tasks
        const [movedTodo] = pendingTodos.splice(source.index, 1); // Remove the dragged item
        pendingTodos.splice(destination.index, 0, movedTodo); // Insert it at the destination index
    
        // Merge reordered pending tasks with completed tasks
        const reorderedTodos = [...pendingTodos, ...completedTodos]; // Combine pending and completed
    
        // Dispatch the new order to the store
        dispatch(reorderTodo(reorderedTodos));
    };
    return (
        <div className={`${theme ? 'bg-gray-100' : 'bg-gray-900 text-white'} min-h-screen`}>
            <div className={`flex flex-col lg:flex-row ${theme ? 'bg-gray-100' : 'bg-gray-900 text-white'}`}>
                <div className="w-full lg:w-1/2 p-6">
                    <div className="max-w-2xl mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg rounded-lg p-6 space-y-6">
                        <h1 className="text-3xl font-bold text-center text-white">To-Do List</h1>
                        <form onSubmit={submitHandler} className="flex space-x-4">
                            <input
                                type="text"
                                value={name}
                                onChange={changeHandler}
                                placeholder="Enter a task"
                                className={`flex-grow p-3 rounded-lg border ${theme ? 'border-gray-300 bg-gray-100 text-gray-900' : 'border-gray-700 bg-gray-700 text-white'} focus:outline-none focus:ring-2 focus:ring-blue-300 transition`}
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-colors font-semibold transform hover:scale-105"
                            >
                                {editId ? "Update" : "Add"}
                            </button>
                        </form>

                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="todo-list">
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-4">
                                        {todoData.length > 0 ? (
                                            todoData.filter(task => !task.check).map((data, index) => (
                                                <Draggable key={data.id} draggableId={data.id} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`flex justify-between items-center p-4 rounded-lg shadow-sm ${theme ? 'bg-white border border-gray-300' : 'bg-gray-800 border-gray-700'} transition-all hover:scale-105`}
                                                        >
                                                            <p
                                                                onClick={() => checkHandler(data.id)}
                                                                className={`flex-grow ${data.check ? "line-through text-gray-500" : theme ? "text-gray-900" : "text-white"} cursor-pointer`}
                                                            >
                                                                {data.name}
                                                            </p>
                                                            <div className="flex items-center space-x-3">
                                                                <button
                                                                    onClick={() => deleteHandler(data.id)}
                                                                    className="text-red-500 hover:text-red-600 transition-colors"
                                                                >
                                                                    <MdDelete size={24} />
                                                                </button>
                                                                <button
                                                                    onClick={() => editHandler(data.id)}
                                                                    className="text-blue-500 hover:text-blue-600 transition-colors"
                                                                >
                                                                    <FiEdit size={24} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))
                                        ) : (
                                            <p className="text-center text-gray-500 dark:text-gray-400">There are no items in the list.</p>
                                        )}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 p-6">
                    <Completed theme={theme} />
                </div>
            </div>

            <div className=" flex justify-around space-x-4">
                <div className="task-count">
                    <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl shadow-md">
                        {todoData.length}
                    </div>
                    <p className="text-center mt-2 font-medium">All</p>
                </div>
                <div className="task-count">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl shadow-md">
                        {todoData.length - checkCount}
                    </div>
                    <p className="text-center mt-2 font-medium">Completed</p>
                </div>
                <div className="task-count">
                    <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center text-xl shadow-md">
                        {checkCount}
                    </div>
                    <p className="text-center mt-2 font-medium">Pending</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
