import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    targetShape: '',
    allShapes: [],
};
export const shapesSlice = createSlice({
    name: 'shapes',
    initialState: initialState,
    reducers: {
        setTargetShape: (state, action) => {
            const { id } = action.payload;
            state.targetShape = id;
        },
        registerShape: (state, action) => {
            const { id } = action.payload;
            state.allShapes.push({ id: id });
            console.log('SHAPE ADDED');
        }
    }
});
export const { setTargetShape, registerShape } = shapesSlice.actions;
export default shapesSlice.reducer;
//# sourceMappingURL=shapesSlice.js.map