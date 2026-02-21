import axios from 'axios';

const API = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/auth`,
});

export const registerUser = (name, email, password) => {
    return API.post('/register', { name, email, password });
};

export const loginUser = (email, password) => {
    return API.post('/login', { email, password });
};

export const getStoredUser = () => {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
};

export const saveUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

export const logout = () => {
    localStorage.removeItem('user');
};
