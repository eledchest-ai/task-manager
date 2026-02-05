import type { Task } from "../types";

const KEY = "task_manager_v1";

export function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function saveTasks(tasks: Task[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(tasks));
  } catch {
    // ignore
  }
}
