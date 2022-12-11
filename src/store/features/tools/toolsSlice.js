import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    currentTool: '',
};
export const toolsSlice = createSlice({
    name: 'tools',
    initialState: initialState,
    reducers: {
        changeTool: (state, action) => {
            state.currentTool = action.payload;
        }
    }
});
export const { changeTool } = toolsSlice.actions;
export default toolsSlice.reducer;
//# sourceMappingURL=toolsSlice.js.map