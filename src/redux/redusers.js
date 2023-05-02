import { combineReducers } from 'redux';
import { tasksReducer } from './contactsSlice';
import { filterReducer } from './filterSlice';

export const rootReducer = combineReducers({
  contacts: tasksReducer,
  filters: filterReducer,
});
