import { createSlice } from "@reduxjs/toolkit";

type state = {
    targetShape: string,
    allShapes: object[],
}

const initialState: state = {
    targetShape: '',
    allShapes: [],
}

export const shapesSlice = createSlice({
    name: 'shapes',
    initialState: initialState,
    reducers: {
        setTargetShape: (state, action) => {
            const {id} = action.payload;
            state.targetShape = id;
        },
        registerShape: (state, action) => {
            const {id} = action.payload;
            state.allShapes.push({id: id});
            console.log('SHAPE ADDED');
        }
    }
})

export const { setTargetShape, registerShape } = shapesSlice.actions;
export default shapesSlice.reducer;