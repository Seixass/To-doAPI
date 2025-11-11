import { Request, Response } from 'express';
import { Task } from '../models/tasksModels';
import { v4 as uuidv4 } from 'uuid';

let tasks: Task[] = [];

export const getAllTasks = (_req: Request, res: Response) => {
  res.json(tasks);
};

export const getTaskById = (req: Request, res: Response) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
};

export const getMetrics = (_req: Request, res: Response) => {
  const completedCount = tasks.filter(t => t.completed).length;
  const openCount = tasks.length - completedCount;
  res.json({ completed: completedCount, open: openCount });
}; //Não consegui efetuar a conclusão desta rota.

export const createTask = (req: Request, res: Response) => {
  const { title, description, completed } = req.body;

  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required and must be a non-empty string' });
  }
  if (typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Completed is required and must be a boolean' });
  }

  const newTask: Task = {
    id: uuidv4(),
    title,
    description,
    completed,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};

export const updateTask = (req: Request, res: Response) => {
  const index = tasks.findIndex(t => t.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const { title, description, completed } = req.body;

  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required and must be a non-empty string' });
  }
  if (typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Completed is required and must be a boolean' });
  }

  tasks[index] = { id: req.params.id, title, description, completed };
  res.json(tasks[index]);
};

export const deleteTask = (req: Request, res: Response) => {
  const index = tasks.findIndex(t => t.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(index, 1);
  res.status(204).send();
};