import { configureStore } from "@reduxjs/toolkit";
import toolsReducer from './features/tools/toolsSlice.js';

const store = configureStore({
    reducer: {
        tools: toolsReducer,
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;