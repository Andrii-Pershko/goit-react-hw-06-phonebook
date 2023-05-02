import { configureStore } from '@reduxjs/toolkit';
import { tasksReducer } from './contactsSlice';
import { filterReducer } from './filterSlice';

export const store = configureStore({
  reducer: {
    contacts: tasksReducer,
    filters: filterReducer,
  },
});
