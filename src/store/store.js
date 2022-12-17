import { configureStore } from "@reduxjs/toolkit";
import toolsReducer from './features/tools/toolsSlice.js';
const store = configureStore({
    reducer: {
        tools: toolsReducer,
    }
});
export default store;
//# sourceMappingURL=store.js.map