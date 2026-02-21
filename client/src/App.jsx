import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import AuthPage from './components/AuthPage';
import { getTasks, createTask, completeTask, deleteTask } from './services/taskService';
import { getStoredUser, saveUser, logout } from './services/authService';
import './App.css';

function App() {
  const [user, setUser] = useState(getStoredUser());
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await getTasks(filter);
      setTasks(data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
      // If 401 → token expired, force logout
      if (err.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchTasks();
  }, [filter, user]);

  const handleAuth = (userData) => {
    saveUser(userData);
    setUser(userData);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setTasks([]);
    setFilter('');
  };

  const handleAdd = async (title, description) => {
    try {
      await createTask(title, description);
      fetchTasks();
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

  const handleComplete = async (id) => {
    try {
      await completeTask(id);
      fetchTasks();
    } catch (err) {
      console.error('Failed to complete task:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  // ── Not authenticated → show auth page ──
  if (!user) {
    return <AuthPage onAuth={handleAuth} />;
  }

  // ── Authenticated → show tasks ──
  return (
    <div className="min-h-screen flex justify-center px-4 py-8 pb-16 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(129,140,248,0.08)_0%,transparent_70%),var(--color-bg)]">
      <div className="w-full max-w-[620px]">
        {/* Header */}
        <header className="text-center mb-8 relative">
          <h1 className="text-[2.1rem] font-extrabold tracking-tight bg-gradient-to-br from-indigo-100 to-accent bg-clip-text text-transparent">
            <span className="inline-block mr-0.5 animate-pulse-fade">✦</span> Task Manager
          </h1>
          <p className="text-muted text-sm mt-1">
            Hello, <span className="text-text font-medium">{user.name}</span>
          </p>
          <button
            onClick={handleLogout}
            className="absolute top-0 right-0 text-muted hover:text-danger text-xs font-medium px-3 py-1.5 rounded-lg border border-border hover:border-danger/30 transition-all duration-200 cursor-pointer"
          >
            Logout
          </button>
        </header>

        <TaskForm onAdd={handleAdd} />
        <FilterBar active={filter} onChange={setFilter} />

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-7 h-7 border-3 border-border border-t-accent rounded-full animate-spin-custom"></div>
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onComplete={handleComplete}
            onDelete={handleDelete}
          />
        )}

        {/* Footer */}
        <footer className="text-center mt-8 text-muted text-xs">
          <p>
            {tasks.length} task{tasks.length !== 1 ? 's' : ''} · {tasks.filter((t) => t.status === 'completed').length} completed
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
