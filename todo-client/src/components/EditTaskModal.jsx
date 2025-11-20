import { useEffect, useState } from "react";
import taskApi from "../api/taskApi";
import { toast } from "react-hot-toast";

export default function EditTaskModal({ isOpen, onClose, task, onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "ToDo",
  });

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate?.substring(0, 10),
        status: task.status,
      });
    }
  }, [task]);

  if (!isOpen || !task) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await taskApi.update(task.id, form);
      toast.success("Cập nhật thành công!");

      onSuccess();
      onClose();
    } catch (err) {
      toast.error("Cập nhật thất bại");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Chỉnh sửa Task</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="ToDo">To Do</option>
            <option value="InProgress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <div className="flex justify-end gap-3 pt-3">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 rounded border"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded text-white"
              style={{
                backgroundImage: "var(--background-image-button-gradient)",
              }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
