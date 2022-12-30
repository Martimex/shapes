import { createSlice } from '@reduxjs/toolkit';

/* interface Figure {
    readonly showcase: object,

} */

interface state {
    currentTool: string[],
    stepNo: number,
    allTools: {
        [key: string]: {
            [key: string]: {
                readonly showcase: showcaseSet,
            }
        }
    }
}

type showcaseSet = {
    readonly title: string,
    readonly description? : string,
    readonly steps: Array<string>[],
}

const initialState: state = {
    currentTool: ['default', 'default'],
    stepNo: 0,
    allTools: {
        'default': { 'default': { showcase: { title: 'Nothing to showcase yet!', steps: [] }}}, // before user takes any action
        'modify': {
            'resize': {
                showcase: {
                    title: 'Resize a shape',
                    description: 'Modify height and width of a shape',
                    steps: [
                        ['Click onto a shape that you want to resize'],
                    ]
                }
            },
            'rotate': {
                showcase: {
                    title: 'Rotate a shape',
                    description: 'Change rotation for a given shape',
                    steps: [
                        ['Click onto a shape that you want to rotate'],
                    ]
                }
            },
            'scale': {
                showcase: {
                    title: 'Scale a shape',
                    description: 'Relatively scale for all shape vertices',
                    steps: [
                        ['Click onto a shape that you want to scale'],
                    ]
                }
            },
        },
        'create': {
            'square': {
                showcase: {
                    title: 'Create square',
                    description: 'Create a new square object',
                    steps: [
                        ['Click to set up a central point for a new square'],
                        ['Set another point to define a square size'],
                    ]
                },
               /*  properties: {
                    size: 1, // just a starting - default - value
                    posX: 0,
                    posY: 0,

                } */
            },
            'rectangle': {
                showcase: {
                    title: 'Create rectangle',
                    description: 'Create a new rectangle object',
                    steps: [
                        ['Click to set up a central point for a new rectangle'],
                        ['Set another point to define rectangle size'],
                    ]
                }
            },
            'triangle': {
                showcase: {
                    title: 'Create triangle',
                    description: 'Create a new triangle object',
                    steps: [
                        ['Click to set up a central point for a new triangle'],
                        ['Set another point to define rectangle size'],
                    ]
                }
            },
            'circle': {
                showcase: {
                    title: 'Create circle',
                    description: 'Create a new triangle object',
                    steps: [
                        ['Click to set up a central point for a new circle'],
                        ['Set the another point to define circle radius'],
                    ]
                }
            },
        },
        'design': {
            'color': {
                showcase: {
                    title: 'Add color',
                    description: 'Apply a new color to a shape',
                    steps: [
                        ['Click onto a shape to add a color'],
                    ]
                }
            },
            'gradient': {
                showcase: {
                    title: 'Add gradient',
                    description: 'Apply a multi-color background for a shape',
                    steps: [
                        ['Click onto a shape to add a gradient'],
                    ]
                }
            },
            'borders': {
                showcase: {
                    title: 'Style borders',
                    description: 'Customize the border style for a shape',
                    steps: [
                        ['Click onto a shape to style the borders'],
                    ]
                }
            },
        },
    }
}

export const toolsSlice = createSlice({
    name: 'tools',
    initialState: initialState,
    reducers: {
        changeTool: (state, action) => {
            const {use, spec} = action.payload;
            state.currentTool = [use, spec];
        },
        doLog: (state, action) => {
            console.log('xD');
        },
        setStep: (state, action) => {
            const {value} = action.payload;
            value === 0 ?
            state.stepNo = value 
            :
            state.stepNo += value;
        }
    }
})

export const {changeTool, doLog, setStep} = toolsSlice.actions;
export { showcaseSet };
export default toolsSlice.reducer;