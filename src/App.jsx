import { useEffect, useState } from "react";
import "./App.css";
import { CreateTask } from "./components/CreateTask";
import { ListTask } from "./components/ListTask";
import toast, { Toaster } from 'react-hot-toast';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(()=>{
    if(JSON.parse(localStorage.getItem("tasks"))){
      setTasks(JSON.parse(localStorage.getItem("tasks")))
    }
  }, [])
  console.log(tasks)
  return (
    <DndProvider backend={HTML5Backend}>
    <Toaster /> 
    <div className="bg-slate-800 text-white w-full min-h-screen flex flex-col items-center pt-32 gap-16  pb-32 relative">
      <h1 className="w-full text-center text-5xl">Trello Management</h1>
      <CreateTask tasks={tasks} setTasks={setTasks}/>
      <ListTask tasks={tasks} setTasks={setTasks}/>
      <div className="absolute bottom-3 text-white">website by Aryan Nipane</div>
    </div>
    </DndProvider>
  );
}

export default App;
