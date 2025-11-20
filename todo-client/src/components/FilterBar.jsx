export default function FilterBar({ filter, onChange }) {
  const buttonStyle = (value) =>
    `px-4 py-1 rounded border ${
      filter === value ? "bg-blue-600 text-white border-blue-600" : "bg-white"
    }`;

  return (
    <div className="flex gap-3 mb-4">
      <button onClick={() => onChange("All")} className={buttonStyle("All")}>
        All
      </button>

      <button onClick={() => onChange("ToDo")} className={buttonStyle("ToDo")}>
        To Do
      </button>

      <button
        onClick={() => onChange("InProgress")}
        className={buttonStyle("InProgress")}
      >
        In Progress
      </button>

      <button onClick={() => onChange("Done")} className={buttonStyle("Done")}>
        Done
      </button>
    </div>
  );
}
