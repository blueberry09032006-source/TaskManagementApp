function TaskItem({ task, onComplete, onDelete }) {
    const isCompleted = task.status === 'completed';

    return (
        <div
            className={`flex items-start gap-3 bg-surface border border-border rounded-2xl px-4.5 py-4 transition-all duration-200 animate-slide-in hover:border-white/[0.12] hover:-translate-y-px ${isCompleted ? 'opacity-60' : ''}`}
        >
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className={`text-[0.95rem] font-semibold leading-snug ${isCompleted ? 'line-through decoration-muted' : ''}`}>
                        {task.title}
                    </h3>
                    <span
                        className={`text-[0.7rem] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wide whitespace-nowrap ${isCompleted
                                ? 'bg-completed-bg text-completed-text'
                                : 'bg-pending-bg text-pending-text'
                            }`}
                    >
                        {task.status}
                    </span>
                </div>
                {task.description && (
                    <p className="text-muted text-[0.84rem] mt-1 leading-relaxed">{task.description}</p>
                )}
                <span className="block text-muted text-xs mt-1.5 opacity-70">
                    {new Date(task.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                    })}
                </span>
            </div>
            <div className="flex gap-1.5 shrink-0 pt-0.5">
                {!isCompleted && (
                    <button
                        className="inline-flex items-center justify-center bg-success/[0.12] text-success px-2.5 py-1.5 rounded-xl text-base font-semibold transition-all duration-200 hover:bg-success/[0.22] hover:shadow-[0_2px_12px_var(--color-success-glow)] active:scale-[0.96] cursor-pointer"
                        onClick={() => onComplete(task._id)}
                        title="Mark as completed"
                    >
                        ✓
                    </button>
                )}
                <button
                    className="inline-flex items-center justify-center bg-danger/[0.1] text-danger px-2.5 py-1.5 rounded-xl text-base font-semibold transition-all duration-200 hover:bg-danger/[0.2] hover:shadow-[0_2px_12px_var(--color-danger-glow)] active:scale-[0.96] cursor-pointer"
                    onClick={() => onDelete(task._id)}
                    title="Delete task"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}

export default TaskItem;
