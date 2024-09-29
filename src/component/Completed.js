import React from 'react';
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { checktodo, deletetodo} from "../component/redux/Slice";

const Completed = ({ theme }) => {
    const todoData = useSelector((state) => state.todo);
    const completedTasks = todoData.filter((data) => data.check); // Filter completed tasks
    const dispatch=useDispatch();
    function deleteHandler(id){
        dispatch(deletetodo(id));
    }
    // <div className="w-full lg:w-1/2 p-6">
    function checkComHandler(id){
        dispatch(checktodo(id));
    }


    return (
        <div className={` w-full  ${theme ? 'bg-gray-100' : 'bg-gray-900 text-white'} transition-colors`}>
            <div className={`max-w-2xl mx-auto shadow-lg rounded-lg p-6 ${theme ? 'bg-white' : 'bg-gray-800'} transition-all duration-300`}>
                <h1 className={`text-3xl font-bold text-center mb-6 ${theme ? 'text-gray-800' : 'text-white'}`}>Completed Tasks</h1>

                {completedTasks.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                        {completedTasks.map((data) => (
                            <div
                                key={data.id}
                                className={`p-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 flex justify-between ${theme
                                        ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'  // Light theme styling
                                        : 'bg-purple-700 text-white hover:bg-purple-600' // Dark theme styling
                                    }`}
                            >
                                <p className="text-lg font-semibold  line-through cursor-pointer" onClick={()=>checkComHandler(data.id)}>{data.name}</p>
                                <div className="flex items-center space-x-3">
                                    <button
                                        onClick={() => deleteHandler(data.id)}
                                        className="text-red-500 hover:text-red-600 transition-colors"
                                    >
                                        <MdDelete size={24} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No tasks completed yet.</p>
                )}
            </div>
        </div>
    );
};

export default Completed;
