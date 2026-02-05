import { useEffect, useMemo, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import type { Filter, Task } from "./types";
import { loadTasks, saveTasks } from "./utils/storage";
import { uid } from "./utils/uid";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return tasks.filter((t) => {
      const matchesQuery =
        q.length === 0 ||
        t.title.toLowerCase().includes(q) ||
        (t.notes ?? "").toLowerCase().includes(q);

      const matchesFilter =
        filter === "all" ||
        (filter === "active" && !t.completed) ||
        (filter === "completed" && t.completed);

      return matchesQuery && matchesFilter;
    });
  }, [tasks, filter, query]);

  function addTask(title: string, notes?: string) {
    const newTask: Task = {
      id: uid(),
      title,
      notes: notes?.trim() ? notes.trim() : undefined,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  }

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, completed: !t.completed, updatedAt: new Date().toISOString() }
          : t
      )
    );
  }

  function startEdit(id: string) {
    setEditingId(id);
  }

  function cancelEdit() {
    setEditingId(null);
  }

  function updateTask(id: string, title: string, notes?: string) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              title,
              notes: notes?.trim() ? notes.trim() : undefined,
              updatedAt: new Date().toISOString(),
            }
          : t
      )
    );
    setEditingId(null);
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    if (editingId === id) setEditingId(null);
  }

  function clearCompleted() {
    setTasks((prev) => prev.filter((t) => !t.completed));
  }

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const active = total - completed;
    return { total, active, completed };
  }, [tasks]);

  return (
    <div className="page">
      <div className="card">
        <header className="header">
          <div>
            <h1>Task Manager</h1>
            <p className="muted">
              CRUD + LocalStorage • Total: {stats.total} • Active: {stats.active} • Done:{" "}
              {stats.completed}
            </p>
          </div>

          <div className="header-actions">
            <input
              className="input"
              placeholder="Search tasks..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select className="select" value={filter} onChange={(e) => setFilter(e.target.value as any)}>
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
            <button className="btn btn-secondary" onClick={clearCompleted} disabled={stats.completed === 0}>
              Clear done
            </button>
          </div>
        </header>

        <TaskForm onAdd={addTask} />

        <TaskList
          tasks={filtered}
          editingId={editingId}
          onToggle={toggleTask}
          onStartEdit={startEdit}
          onCancelEdit={cancelEdit}
          onUpdate={updateTask}
          onDelete={deleteTask}
        />
      </div>

      <footer className="footer muted">
        Tip: Your tasks are saved automatically (LocalStorage).
      </footer>
    </div>
  );
}
