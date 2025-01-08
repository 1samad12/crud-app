import User from "../model/userModle.js";

// Create a new user
export const create = async (req, res) => {
    try {
        const userData = new User(req.body);
        if (!userData) {
            return res.status(400).json({ message: "Invalid user data" });
        }
        const savedData = await userData.save();
        res.status(201).json({ message: "User created successfully", data: savedData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all users
export const getAll = async (req, res) => {
    try {
        const users = await User.find();
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single user by ID
export const getOne = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a user by ID
export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const updatedData = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: "User updated successfully", data: updatedData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
