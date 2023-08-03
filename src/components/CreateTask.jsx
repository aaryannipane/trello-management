import React, { useState } from "react";
import { toast } from "react-hot-toast";
import {v4 as uuid4} from "uuid"
export const CreateTask = ({ tasks, setTasks }) => {
  const [task, setTask] = useState({
    id: uuid4(),
    name: "",
    status: "todo",
  });

  console.log(task)

  const handleSubmit = (e)=>{
    e.preventDefault()

    if(task.name.length < 4){
        return toast.error("Task should have more than 3 characters", {duration: 2000})
    }
    if(task.name.length > 100){
        return toast.error("Task should not have more than 100 characters", {duration: 2000})
    }

    setTasks((prev)=> {
        if (!prev) {
            prev = []; // If prev is null or undefined, initialize it as an empty array
          }
          const list = [...prev, task];
          localStorage.setItem("tasks", JSON.stringify(list));
          return list;
    })
    toast.success("Task Created", {duration: 2000})
    setTask({
        id: uuid4(),
        name: "",
        status: "todo",
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter new Task"
        className="border-2 border-white bg-slate-800 rounded-md mr-4 h-12 w-64 px-1  "
        value={task.name}
        onChange={(e) => {
            setTask({...task, name: e.target.value})
        }}
      />
      <button className="bg-lime-600 px-4 h-12 rounded-md">Create Task</button>
    </form>
  );
};
