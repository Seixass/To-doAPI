import { Router } from "express";
import { getAllTasks, getTaskById, getMetrics, createTask, updateTask, deleteTask } from "../controllers/tasksController";

export const router = Router();

router.get('/tasks', getAllTasks);
router.get('/tasks/:id', getTaskById);
router.get('/tasks/metrics', getMetrics);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);
