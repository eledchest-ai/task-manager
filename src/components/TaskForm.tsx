import { useState } from "react";

type Props = {
  onAdd: (title: string, notes?: string) => void;
};

export default function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;
    onAdd(t, notes);
    setTitle("");
    setNotes("");
  }

  return (
    <form className="form" onSubmit={submit}>
      <input
        className="input"
        placeholder="Task title (required)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="input"
        placeholder="Notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button className="btn" type="submit">Add</button>
    </form>
  );
}
