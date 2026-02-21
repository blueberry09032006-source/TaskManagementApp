import TaskItem from './TaskItem';

function TaskList({ tasks, onComplete, onDelete }) {
    if (tasks.length === 0) {
        return (
            <div className="text-center py-12 text-muted">
                <div className="text-4xl mb-3 opacity-50">📋</div>
                <p className="font-semibold text-base text-text mb-1">No tasks found</p>
                <span className="text-sm">Add a new task to get started!</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2.5">
            {tasks.map((task) => (
                <TaskItem
                    key={task._id}
                    task={task}
                    onComplete={onComplete}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

export default TaskList;
