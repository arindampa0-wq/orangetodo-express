import { useEffect, useState } from "react";
import { Plus, Check, Trash2, Flame } from "lucide-react";

type Todo = { id: string; text: string; done: boolean };

const STORAGE_KEY = "ember-todos";

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setTodos(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const add = () => {
    const t = text.trim();
    if (!t) return;
    setTodos((p) => [{ id: crypto.randomUUID(), text: t, done: false }, ...p]);
    setText("");
  };

  const toggle = (id: string) =>
    setTodos((p) => p.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const remove = (id: string) => setTodos((p) => p.filter((t) => t.id !== id));

  const remaining = todos.filter((t) => !t.done).length;

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-glow)]">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg grid place-items-center bg-[var(--gradient-ember)]">
            <Flame className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">Ember Tasks</h2>
            <p className="text-xs text-muted-foreground">
              {remaining} open · {todos.length} total
            </p>
          </div>
        </div>

        <div className="flex gap-2 mb-5">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="What needs to burn through today?"
            className="flex-1 rounded-lg bg-input border border-border px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            onClick={add}
            className="rounded-lg px-4 py-2.5 bg-[var(--gradient-ember)] text-primary-foreground font-medium text-sm inline-flex items-center gap-1.5 hover:opacity-90 transition"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>

        <ul className="space-y-2">
          {todos.length === 0 && (
            <li className="text-center text-sm text-muted-foreground py-8">
              No tasks yet. Add one above.
            </li>
          )}
          {todos.map((t) => (
            <li
              key={t.id}
              className="group flex items-center gap-3 rounded-lg border border-border bg-secondary/40 px-3 py-2.5 hover:border-primary/50 transition"
            >
              <button
                onClick={() => toggle(t.id)}
                aria-label="Toggle"
                className={`h-5 w-5 shrink-0 rounded-md border grid place-items-center transition ${
                  t.done
                    ? "bg-primary border-primary"
                    : "border-muted-foreground/40 hover:border-primary"
                }`}
              >
                {t.done && <Check className="h-3.5 w-3.5 text-primary-foreground" />}
              </button>
              <span
                className={`flex-1 text-sm ${
                  t.done ? "line-through text-muted-foreground" : "text-foreground"
                }`}
              >
                {t.text}
              </span>
              <button
                onClick={() => remove(t.id)}
                className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition"
                aria-label="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
