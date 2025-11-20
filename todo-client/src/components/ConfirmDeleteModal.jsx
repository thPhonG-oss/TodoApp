import taskApi from "../api/taskApi";
import { toast } from "react-hot-toast";

export default function ConfirmDeleteModal({
  isOpen,
  task,
  onClose,
  onSuccess,
}) {
  if (!isOpen || !task) return null;

  const handleDelete = async () => {
    try {
      await taskApi.delete(task.id);
      toast.success("Xóa thành công!");

      onSuccess();
      onClose();
    } catch {
      toast.error("Xóa thất bại");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-red-600">
          Xác nhận xóa
        </h2>

        <p className="mb-6">
          Bạn có chắc muốn xóa task: <b>{task.title}</b>?
        </p>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-2 text-white rounded bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
