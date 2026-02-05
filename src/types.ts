export type Filter = "all" | "active" | "completed";

export type Task = {
  id: string;
  title: string;
  notes?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};
