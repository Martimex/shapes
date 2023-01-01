import { configureStore } from "@reduxjs/toolkit";
import toolsReducer from './features/tools/toolsSlice.js';
import shapesReducer from './features/shapes/shapesSlice.js';

const store = configureStore({
    reducer: {
        tools: toolsReducer,
        shapes: shapesReducer,
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;