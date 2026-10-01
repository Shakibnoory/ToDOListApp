import { useState } from "react";
// STATES

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Learn React", completed: false },
    { id: 2, title: "Practice JavaScript", completed: false },
    { id: 3, title: "Build a project", completed: false },
  ]);
  
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("All");

  // ADD NEW TASK TO THE LIST FUNCTION
  function addTask() {
    if (task.trim() === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      title: task,
      completed: false,
    };
// CREATE NEW ARRAY 
    setTasks([...tasks, newTask]);
    setTask("");
  }

  // CONPLETED && INCOMPLETED TASKS SECTION 
  function toggleTask(id) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed,
        };
      }

      return task;
    });

    setTasks(updatedTasks);
  }
  //  DELETE TASK SECTION
  function deleteTask(id) {
    const updatedTask = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(updatedTask);
  }

  // FILTER SECTION 
  const filteredTasks = tasks.filter((task) => {
    if (filter === "Active") {
      return !task.completed;
    }
    if (filter === "Completed") {
      return task.completed;
    }
    return true;
  });

  return (
    // JSX SECTION 
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 px-4 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-2xl rounded-2xl bg-white p-5 shadow-xl sm:p-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
          My To-Do List
        </h1>

        <p className="mb-8 text-sm leading-6 text-slate-500 sm:text-base ">
          Organize your day and get things done!
        </p>

      {/* INPUT SECTION  */}

        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <input
            className="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-3 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            type="text"
            placeholder="Enter a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
          />

          <button
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-95"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>

        {/* FILTER SECTON */}

        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("All")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              filter === "All"
                ? "bg-blue-600 text-white shadow"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("Active")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              filter === "Active"
                ? "bg-blue-600 text-white shadow"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Active
          </button>

          <button
            onClick={() => setFilter("Completed")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              filter === "Completed"
                ? "bg-blue-600 text-white shadow"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Completed
          </button>
        </div>

        {/* TASK LIST  */}

        <div>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-slate-800">My Tasks</h2>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
              {filteredTasks.length} tasks
            </span>
          </div>
          {filteredTasks.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center">
              <p className="mb-2 text-lg font-semibold text-slate-700">
                No tasks found
              </p>

              <p className="text-sm text-slate-500">
                Add a new task or choose another filter.
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center gap-3 rounded-xl border p-4 transition ${
                  task.completed
                    ? "border-green-200 bg-green-50"
                    : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm"
                }`}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="h-5 w-5 shrink-0 cursor-pointer accent-blue-600"
                />

                <span
                  className={`min-w-0 flex-1 break-words ${
                    task.completed
                      ? "text-slate-400 line-through"
                      : "text-slate-700"
                  }`}
                >
                  {task.title}
                </span>

                <button
                  className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 active:scale-95"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        {/* FOOTER SECTION */}

        <p className="mt-8 border-t border-slate-100 pt-5 text-center text-sm text-slate-400">
          Keep going! You are doing great.
        </p>
      </div>
    </div>
  );
}

export default App;
