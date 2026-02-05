import type { Task } from "../types";
import TaskRow from "./TaskRow";

type Props = {
  tasks: Task[];
  editingId: string | null;
  onToggle: (id: string) => void;
  onStartEdit: (id: string) => void;
  onCancelEdit: () => void;
  onUpdate: (id: string, title: string, notes?: string) => void;
  onDelete: (id: string) => void;
};

export default function TaskList({
  tasks,
  editingId,
  onToggle,
  onStartEdit,
  onCancelEdit,
  onUpdate,
  onDelete,
}: Props) {
  if (tasks.length === 0) {
    return <div className="empty muted">No tasks found.</div>;
  }

  return (
    <ul className="list">
      {tasks.map((t) => (
        <TaskRow
          key={t.id}
          task={t}
          isEditing={editingId === t.id}
          onToggle={onToggle}
          onStartEdit={onStartEdit}
          onCancelEdit={onCancelEdit}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
