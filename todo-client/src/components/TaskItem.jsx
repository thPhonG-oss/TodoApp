export default function TaskItem({ task, onEdit, onDelete }) {
  const normalizedStatus = task.status?.toLowerCase();

  const statusLabel = {
    todo: "To Do",
    inprogress: "In Progress",
    done: "Done",
  }[normalizedStatus];

  const isDone = task.status === "Done";

  return (
    <div className="p-4 bg-white shadow-sm rounded-xl flex justify-between items-center border">
      <div>
        <h3
          className={`font-semibold text-lg ${
            isDone ? "line-through text-gray-400" : ""
          }`}
        >
          {task.title}
        </h3>
        <p className="text-sm text-gray-600">{task.description}</p>
        <p className="text-sm text-gray-500">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
        <p className="text-sm font-medium">Status: {statusLabel}</p>
      </div>

      <div className="flex gap-3">
        <button
          className="text-blue-600 hover:underline"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>

        <button
          className="text-red-600 hover:underline"
          onClick={() => onDelete(task)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
