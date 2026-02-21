import axios from 'axios';

const API = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/tasks`,
});

// Attach auth token to every request
API.interceptors.request.use((config) => {
    const user = localStorage.getItem('user');
    if (user) {
        const { token } = JSON.parse(user);
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getTasks = (status) => {
    const params = status ? { status } : {};
    return API.get('/', { params });
};

export const createTask = (title, description) => {
    return API.post('/', { title, description });
};

export const completeTask = (id) => {
    return API.put(`/${id}`);
};

export const deleteTask = (id) => {
    return API.delete(`/${id}`);
};
