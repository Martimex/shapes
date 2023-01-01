import React, { useEffect } from "react";
import './workspace.css';
import { useAppSelector } from "../../store/hooks";
import fireAction from "../toolbox/addons/actionInitializers";
import { useAppDispatch } from "../../store/hooks";
import { setStep } from "../../store/features/tools/toolsSlice";
import { setTargetShape } from "../../store/features/shapes/shapesSlice";
function Workspace() {
    const dispatch = useAppDispatch();
    const action = useAppSelector(state => state.tools.currentTool);
    const stepNo = useAppSelector(state => state.tools.stepNo);
    const allTools = useAppSelector(state => state.tools.allTools);
    const shape_target = useAppSelector(state => state.shapes.targetShape);
    useEffect(() => {
        const currShape = document.querySelector(`.shape[data-id="${shape_target}"]`);
        if (currShape) {
            currShape.classList.add('target_shape');
        }
    }, [shape_target]);
    useEffect(() => {
        const [type, spec] = action;
        //console.warn('USE EFFECT IN USE')
        if (type === 'create') {
            const allShapes = document.querySelectorAll('.shape');
            allShapes.forEach(shape => shape.classList.add('untargetable'));
        }
        else if (type !== 'create') {
            const allShapes = document.querySelectorAll('.shape');
            allShapes.forEach(shape => shape.classList.remove('untargetable'));
        }
    }, [action[0]]);
    function detectAction(e) {
        const [type, spec] = action;
        //console.dir(e);
        // we need to get a cords of where click took place on the workspace
        const target = e.target;
        if (type === 'default' && target.matches('.shape')) {
            //dispatch(registerShape({id: target.dataset['id']}));
            detectTargetShape(target);
        }
        else if (type === 'create') {
            fireAction([type, spec], [e.clientX, e.clientY], stepNo);
            //(stepNo >= allTools[type][spec].showcase.steps.length)? dispatch(setStep({value: 0})) : dispatch(setStep({value: 1}));
        }
        else if (type === 'modify' || type === 'design') {
            if (target.matches('.shape')) {
                // do same as for type default
                detectTargetShape(target);
            }
            // Will not work if above if statement will not pass
            fireAction([type, spec], [e.clientX, e.clientY], stepNo, target);
        }
    }
    function detectTargetShape(target) {
        // Do the previous target shape style removals just before setting a new target 
        const oldTargetShape = document.querySelector(`.shape[data-id="${shape_target}"]`);
        if (oldTargetShape) {
            oldTargetShape.classList.remove('target_shape');
        }
        ;
        // Do not execute when previously targeted shape is same as the new one
        //console.log(oldTargetShape?.dataset.id, target.dataset['id']);
        ((oldTargetShape === null || oldTargetShape === void 0 ? void 0 : oldTargetShape.dataset.id) !== target.dataset['id']) ?
            changeTargetShape(target, true) : changeTargetShape(target, false);
        //dispatch(setTargetShape({id: target.dataset['id']})) : dispatch(setTargetShape({id: ''}));
    }
    function changeTargetShape(target, isNewTargetShape) {
        const allCreateButtons = document.querySelectorAll('.btn-tool[data-use="create"]');
        if (isNewTargetShape) {
            // First of all - dispatch !
            dispatch(setTargetShape({ id: target.dataset['id'] }));
            // Now block all Create type of buttons
            allCreateButtons.forEach(button => button.classList.add('btn-blocked'));
        }
        else if (!isNewTargetShape) {
            // First of all - dispatch !
            dispatch(setTargetShape({ id: '' }));
            // Unblock all Create type of buttons
            allCreateButtons.forEach(button => button.classList.remove('btn-blocked'));
        }
    }
    function modifyStep(e) {
        // This should be tested further
        //console.log('allowed to create shape')
        const x = stepNo;
        //console.warn(e.target, x);
        const [type, spec] = action;
        (stepNo >= allTools[type][spec].showcase.steps.length - 1) ? dispatch(setStep({ value: 0 })) : dispatch(setStep({ value: 1 }));
    }
    return (React.createElement("section", { className: "workspace-board", onClick: (e) => modifyStep(e) },
        React.createElement("div", { className: "workspace-board__map", onClick: (e) => detectAction(e) })));
}
export default Workspace;
//# sourceMappingURL=Workspace.js.map