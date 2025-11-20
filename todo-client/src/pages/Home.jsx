import { useState, useEffect } from "react";
import taskApi from "../api/taskApi";
import TaskList from "../components/TaskList";
import FilterBar from "../components/FilterBar";
import AddTaskModal from "../components/AddTaskModal";
import EditTaskModal from "../components/EditTaskModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { toast } from "react-hot-toast";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  const [showAddModal, setShowAddModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [deleteTask, setDeleteTask] = useState(null);

  const loadTasks = async () => {
    try {
      const res = await taskApi.getAll();
      setTasks(res.data);
    } catch {
      toast.error("Không thể tải tasks");
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const filteredTasks = tasks.filter((t) =>
    filter === "All" ? true : t.status.toLowerCase() === filter.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-montserrat">
      <div className="max-w-4xl mx-auto bg-white shadow-custom rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Personal Task Manager</h1>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded text-white"
            style={{
              backgroundImage: "var(--background-image-button-gradient)",
            }}
          >
            + Add Task
          </button>
        </div>

        <FilterBar filter={filter} onChange={setFilter} />

        <TaskList
          tasks={filteredTasks}
          onEdit={(t) => setEditTask(t)}
          onDelete={(t) => setDeleteTask(t)}
        />

        <AddTaskModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSuccess={loadTasks}
        />

        <EditTaskModal
          isOpen={!!editTask}
          task={editTask}
          onClose={() => setEditTask(null)}
          onSuccess={loadTasks}
        />

        <ConfirmDeleteModal
          isOpen={!!deleteTask}
          task={deleteTask}
          onClose={() => setDeleteTask(null)}
          onSuccess={loadTasks}
        />
      </div>
    </div>
  );
}
