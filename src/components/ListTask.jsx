import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { toast } from "react-hot-toast";

export const ListTask = ({ tasks, setTasks }) => {
  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const ftodos = tasks?.filter((task) => task.status === "todo");
    const fInProgresse = tasks?.filter((task) => task.status === "inprogress");
    const fCompleted = tasks?.filter((task) => task.status === "completed");

    setTodo(ftodos);
    setInProgress(fInProgresse);
    setCompleted(fCompleted);
  }, [tasks]);

  const statuses = ["todo", "inprogress", "completed"];
  return (
    <div className="flex gap-16">
      {statuses.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          todo={todo}
          inProgress={inProgress}
          completed={completed}
        ></Section>
      ))}
    </div>
  );
};

const Section = ({
  status,
  key,
  tasks,
  setTasks,
  todo,
  inProgress,
  completed,
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let text = "Todo";
  let bg = "bg-red-500";
  let tasksToMap = todo;

  if (status === "inprogress") {
    text = "In Progress";
    bg = "bg-orange-500";
    tasksToMap = inProgress;
  }
  if (status === "completed") {
    text = "Completed";
    bg = "bg-green-500";
    tasksToMap = completed;
  }

  const addItemToSection = (id) => {
    setTasks(prev =>{
        const mTask = prev.map(t=>{
            if(t.id === id){
                return {...t, status:status}
            }
            return t;
        })

        localStorage.setItem("tasks", JSON.stringify(mTask))
        
        toast.success(`Task status changed to ${status}`, {duration: 2000})

        return mTask
    })
  };

  return (
    <div ref={drop} className={`w-64 rounded-md p-2 ${isOver? "bg-slate-500":""} border min-h-[200px]`}>
      <Header text={text} bg={bg} count={tasksToMap?.length} />
      {tasks?.length === 0? <div className="p-2 text-sm">There Are No Task To Do🥳</div>: ""}
      {tasksToMap?.map((task) => (
        <Task key={task.id} tasks={tasks} setTasks={setTasks} task={task} />
      ))}
    </div>
  );
};

const Header = ({ text, bg, count }) => {
  return (
    <div
      className={`${bg} flex items-center h-12 pl-4 text-black rounded-md uppercase text-sm `}
    >
      {text}{" "}
      <div className="ml-auto mr-5 bg-slate-800 w-5 h-5 rounded-full p-4 flex items-center justify-center text-white ">
        {count}
      </div>
    </div>
  );
};
const Task = ({ task, tasks, setTasks }) => {
  const handleRemove = (id) => {
    const fTasks = tasks?.filter((task) => task.id != id);
    setTasks(fTasks);
    localStorage.setItem("tasks", JSON.stringify(fTasks));
    toast.success("Task Deleted", { duration: 2000 });
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id, type: "TASK`" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  console.log(isDragging);

  return (
    <div
      ref={drag}
      className={`relative p-4 mt-8 shadow-md rounded-md ${
        isDragging ? "opacity-25" : "opacity-100"
      } cursor-grab bg-slate-300 text-black`}
    >
      <p>{task.name}</p>
      <button
        className="absolute top-4 right-1 text-red-400"
        onClick={() => handleRemove(task.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  );
};
