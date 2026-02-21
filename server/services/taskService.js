const Task = require('../models/Task');

// Get all tasks for a user, optionally filtered by status
const getAllTasks = async (userId, filter = {}) => {
    return await Task.find({ user: userId, ...filter }).sort({ created_at: -1 });
};

// Create a new task for a user
const createTask = async (userId, data) => {
    const task = new Task({ ...data, user: userId });
    return await task.save();
};

// Mark a task as completed (only if owned by user)
const markComplete = async (userId, id) => {
    return await Task.findOneAndUpdate(
        { _id: id, user: userId },
        { status: 'completed' },
        { new: true }
    );
};

// Delete a task (only if owned by user)
const removeTask = async (userId, id) => {
    return await Task.findOneAndDelete({ _id: id, user: userId });
};

module.exports = {
    getAllTasks,
    createTask,
    markComplete,
    removeTask,
};
