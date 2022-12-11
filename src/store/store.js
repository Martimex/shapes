import { configureStore } from "@reduxjs/toolkit";
import toolsReducer from './features/tools/toolsSlice.js';

export default configureStore({
    reducer: {
        tools: toolsReducer,
    }
})