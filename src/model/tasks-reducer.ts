import {createAction, createReducer, nanoid} from '@reduxjs/toolkit';
import type {Task, TasksState} from '../app/App.tsx';

const initialState: TasksState = {};

export const createTodolistAC = createAction<{ id: string }>('create_todolist');
export const deleteTodolistAC = createAction<{ id: string }>('delete_todolist');
export const deleteTaskAC = createAction<{ todolistId: string; taskId: string }>('delete_task');
export const createTaskAC = createAction<{ todolistId: string; title: string }>('create_task');
export const changeTaskStatusAC = createAction<{ todolistId: string; taskId: string; isDone: boolean }>('change_task_status');
export const changeTaskTitleAC = createAction<{ todolistId: string; taskId: string; title: string }>('change_task_title');

export const tasksReducer = createReducer(initialState, (builder) => {
  builder
      .addCase(createTodolistAC, (state, action) => {
        state[action.payload.id] = [];
      })
      .addCase(deleteTodolistAC, (state, action) => {
        delete state[action.payload.id];
      })
      .addCase(deleteTaskAC, (state, action) => {
        const tasks = state[action.payload.todolistId];
        if (tasks) {
          const index = tasks.findIndex(task => task.id === action.payload.taskId);
          if (index !== -1) tasks.splice(index, 1);
        }
      })
      .addCase(createTaskAC, (state, action) => {
        const newTask: Task = { title: action.payload.title, isDone: false, id: nanoid() };
        state[action.payload.todolistId]?.unshift(newTask);
      })
      .addCase(changeTaskStatusAC, (state, action) => {
        const task = state[action.payload.todolistId]?.find(task => task.id === action.payload.taskId);
        if (task) {
          task.isDone = action.payload.isDone;
        }
      })
      .addCase(changeTaskTitleAC, (state, action) => {
        const task = state[action.payload.todolistId]?.find(task => task.id === action.payload.taskId);
        if (task) {
          task.title = action.payload.title;
        }
      });
});
