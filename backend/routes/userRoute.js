import express from "express";
import { create, deleteUser, getAll, getOne, update } from "../controller/usercontroller.js";

const router = express.Router();

/**
 * @route POST /api/create
 * @desc Create a new user
 * @access Public
 */
router.post("/create", create);

/**
 * @route GET /api/getall
 * @desc Retrieve all users
 * @access Public
 */
router.get("/getall", getAll);

/**
 * @route GET /api/getone/:id
 * @desc Retrieve a single user by ID
 * @access Public
 */
router.get("/getone/:id", getOne);

/**
 * @route PUT /api/update/:id
 * @desc Update a user by ID
 * @access Public
 */
router.put("/update/:id", update);

/**
 * @route DELETE /api/delete/:id
 * @desc Delete a user by ID
 * @access Public
 */
router.delete("/delete/:id", deleteUser);

export default router;
