import { configureStore } from '@reduxjs/toolkit'

import frameReducer from './frameSlice';
import functionReducer from './functionSlice';

export default configureStore({
  reducer: {
    frame:frameReducer,
    function:functionReducer
  }
});