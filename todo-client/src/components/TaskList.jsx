import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onEdit, onDelete }) {
  if (!tasks.length) {
    return <p className="text-gray-500">Chưa có task nào.</p>;
  }

  return (
    <div className="space-y-4 mt-6">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
