import { createSlice } from '@reduxjs/toolkit';

interface state {
    currentTool: string,
}

const initialState: state = {
    currentTool: '',
}

export const toolsSlice = createSlice({
    name: 'tools',
    initialState: initialState,
    reducers: {
        changeTool: (state: any, action: any) => {
            state.currentTool = action.payload;
        }
    }
})

export const {changeTool} = toolsSlice.actions;
export default toolsSlice.reducer;