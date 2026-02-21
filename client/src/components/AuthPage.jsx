import { useState } from 'react';
import { registerUser, loginUser } from '../services/authService';

function AuthPage({ onAuth }) {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            let res;
            if (isLogin) {
                res = await loginUser(email, password);
            } else {
                if (!name.trim()) {
                    setError('Name is required');
                    setLoading(false);
                    return;
                }
                res = await registerUser(name.trim(), email, password);
            }
            onAuth(res.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const toggle = () => {
        setIsLogin(!isLogin);
        setError('');
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(129,140,248,0.08)_0%,transparent_70%),var(--color-bg)]">
            <div className="w-full max-w-[400px]">
                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-[2.1rem] font-extrabold tracking-tight bg-gradient-to-br from-indigo-100 to-accent bg-clip-text text-transparent">
                        <span className="inline-block mr-0.5 animate-pulse-fade">✦</span> Task Manager
                    </h1>
                    <p className="text-muted text-sm mt-1">
                        {isLogin ? 'Welcome back' : 'Create your account'}
                    </p>
                </div>

                {/* Form */}
                <form
                    className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-4 backdrop-blur-lg"
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-lg font-bold text-text text-center">
                        {isLogin ? 'Sign In' : 'Sign Up'}
                    </h2>

                    {error && (
                        <div className="bg-danger/[0.1] border border-danger/20 text-danger text-sm px-4 py-2.5 rounded-xl">
                            {error}
                        </div>
                    )}

                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-border rounded-xl text-text placeholder-muted font-sans text-sm outline-none transition-all duration-200 focus:border-accent focus:ring-[3px] focus:ring-accent-glow"
                        />
                    )}

                    <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-border rounded-xl text-text placeholder-muted font-sans text-sm outline-none transition-all duration-200 focus:border-accent focus:ring-[3px] focus:ring-accent-glow"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-border rounded-xl text-text placeholder-muted font-sans text-sm outline-none transition-all duration-200 focus:border-accent focus:ring-[3px] focus:ring-accent-glow"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-accent hover:bg-accent-hover text-white font-semibold text-sm py-2.5 rounded-xl transition-all duration-200 hover:shadow-[0_4px_20px_var(--color-accent-glow)] active:scale-[0.96] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
                    </button>

                    <p className="text-center text-muted text-sm">
                        {isLogin ? "Don't have an account? " : 'Already have an account? '}
                        <button
                            type="button"
                            onClick={toggle}
                            className="text-accent hover:underline cursor-pointer font-medium"
                        >
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default AuthPage;
