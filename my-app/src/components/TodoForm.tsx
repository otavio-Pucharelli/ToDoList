import React, {useEffect} from "react";
import { ApiClient } from "../services/httpClient";


function TodoForm() {
  const [task, setTask] = React.useState("");

  interface ITask {
    id: number;
    name: string;
  }


  const handleSubmit = async(e : any) => {
        const objTask: ITask = { id: -1, name: task };
        e.preventDefault();
        if (!task.trim()) return;

        const apiClient = new ApiClient();
        await apiClient.postTasks("/tasks", objTask);
    }
    console.log(task);
    return (
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            onChange={(e) => setTask(e.target.value)}
            value={task}
        />
        
        <button type="submit">Add</button>
        </form>
    );
}

export default TodoForm;