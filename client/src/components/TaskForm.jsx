import { useState } from 'react';

function TaskForm({ onAdd }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        onAdd(title.trim(), description.trim());
        setTitle('');
        setDescription('');
    };

    return (
        <form
            className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-3 backdrop-blur-lg transition-colors duration-200 focus-within:border-accent-glow/30"
            onSubmit={handleSubmit}
        >
            <input
                id="task-title"
                type="text"
                placeholder="Task title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-border rounded-xl text-text placeholder-muted font-sans text-sm outline-none transition-all duration-200 focus:border-accent focus:ring-[3px] focus:ring-accent-glow"
            />
            <textarea
                id="task-description"
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-border rounded-xl text-text placeholder-muted font-sans text-sm outline-none transition-all duration-200 focus:border-accent focus:ring-[3px] focus:ring-accent-glow resize-y"
            />
            <button
                id="add-task-btn"
                type="submit"
                className="self-end inline-flex items-center gap-1.5 bg-accent hover:bg-accent-hover text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-[0_4px_20px_var(--color-accent-glow)] active:scale-[0.96] cursor-pointer"
            >
                <span className="text-lg leading-none">+</span> Add Task
            </button>
        </form>
    );
}

export default TaskForm;
