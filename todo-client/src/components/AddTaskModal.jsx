import { useState } from "react";
import taskApi from "../api/taskApi";
import { toast } from "react-hot-toast";

export default function AddTaskModal({ isOpen, onClose, onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "ToDo",
  });

  if (!isOpen) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) return toast.error("Title không được bỏ trống");

    try {
      await taskApi.create(form);
      toast.success("Thêm task thành công!");

      onSuccess();
      onClose();

      setForm({ title: "", description: "", dueDate: "", status: "ToDo" });
    } catch (err) {
      toast.error("Thêm task thất bại");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Thêm Task Mới</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <textarea
            name="description"
            placeholder="Description"
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

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 text-white rounded"
              style={{
                backgroundImage: "var(--background-image-button-gradient)",
              }}
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
