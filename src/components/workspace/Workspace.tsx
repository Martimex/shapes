import React, { useEffect } from "react";
import './workspace.css';
import { useAppSelector } from "../../store/hooks";
import fireAction from "../toolbox/addons/actionInitializers";

import { useAppDispatch } from "../../store/hooks";
import { setStep } from "../../store/features/tools/toolsSlice";

function Workspace() {

    const dispatch = useAppDispatch();
    const action = useAppSelector(state => state.tools.currentTool);
    const stepNo = useAppSelector(state => state.tools.stepNo);
    const allTools = useAppSelector(state => state.tools.allTools);

    useEffect(() => {
        const [type, spec] = action;
        //console.warn('USE EFFECT IN USE')
        if(type === 'create') {
            const allShapes = document.querySelectorAll('shape');
            allShapes.forEach(shape => shape.classList.add('untargetable'))
        } else if(type !== 'create') {
            const allShapes = document.querySelectorAll('shape');
            allShapes.forEach(shape => shape.classList.remove('untargetable'))
        }

    }, [action[0]])

    function detectAction(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        const [type, spec] = action;

        // we need to get a cords of where click took place on the workspace

        if(type === 'create') {
            fireAction([type, spec], [e.clientX, e.clientY], stepNo);

            //(stepNo >= allTools[type][spec].showcase.steps.length)? dispatch(setStep({value: 0})) : dispatch(setStep({value: 1}));
        }
    }

    function modifyStep(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        // This should be tested further
        //console.log('allowed to create shape')
        const x = stepNo;
        //console.warn(e.target, x);
        const [type, spec] = action;
        (stepNo >= allTools[type][spec].showcase.steps.length - 1)? dispatch(setStep({value: 0})) : dispatch(setStep({value: 1}));
    }

    return (
        <section className="workspace-board" onClick={(e) => modifyStep(e)}>
            <div className="workspace-board__map" onClick={(e) => detectAction(e)}>
                
            </div>
        </section>
    )
}

export default Workspace;