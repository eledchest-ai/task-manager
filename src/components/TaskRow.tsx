import { useEffect, useState } from "react";
import type { Task } from "../types";

type Props = {
  task: Task;
  isEditing: boolean;
  onToggle: (id: string) => void;
  onStartEdit: (id: string) => void;
  onCancelEdit: () => void;
  onUpdate: (id: string, title: string, notes?: string) => void;
  onDelete: (id: string) => void;
};

export default function TaskRow({
  task,
  isEditing,
  onToggle,
  onStartEdit,
  onCancelEdit,
  onUpdate,
  onDelete,
}: Props) {
  const [title, setTitle] = useState(task.title);
  const [notes, setNotes] = useState(task.notes ?? "");

  useEffect(() => {
    if (isEditing) {
      setTitle(task.title);
      setNotes(task.notes ?? "");
    }
  }, [isEditing, task.title, task.notes]);

  function save() {
    const t = title.trim();
    if (!t) return;
    onUpdate(task.id, t, notes);
  }

  return (
    <li className="row">
      <label className="check">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span />
      </label>

      <div className="content">
        {isEditing ? (
          <div className="edit">
            <input
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="input"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes"
            />
            <div className="row-actions">
              <button className="btn" type="button" onClick={save}>
                Save
              </button>
              <button className="btn btn-secondary" type="button" onClick={onCancelEdit}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className={task.completed ? "title done" : "title"}>
              {task.title}
            </div>
            {task.notes ? <div className="muted small">{task.notes}</div> : null}
            <div className="muted tiny">
              Updated: {new Date(task.updatedAt).toLocaleString()}
            </div>
          </>
        )}
      </div>

      {!isEditing ? (
        <div className="row-actions">
          <button className="btn btn-secondary" type="button" onClick={() => onStartEdit(task.id)}>
            Edit
          </button>
          <button className="btn btn-danger" type="button" onClick={() => onDelete(task.id)}>
            Delete
          </button>
        </div>
      ) : null}
    </li>
  );
}
