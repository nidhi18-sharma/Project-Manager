import { useState } from "react";

export default function AddTask({onAddTask}) {
  const [enteredTask, setEnteredTask] = useState('');
  function handleChange(event) {
    setEnteredTask(event.target.value);
  }
  function handleClick(){
    onAddTask(enteredTask)
    setEnteredTask('')
  }
  return (
    <div className="flex items-center gap-4">
      <input
        className="w-64 px-2 py-1 rounded-sm bg-stone-300"
        type="text"
        onChange={handleChange}
        value={enteredTask}
      ></input>
      <button onClick={handleClick} className="text-stone-700 hover:text-stone-950">Add Task</button>
    </div>
  );
}
