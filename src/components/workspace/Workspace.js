import React from "react";
import './workspace.css';
import { useAppSelector } from "../../store/hooks";
import fireAction from "../toolbox/addons/actionInitializers";
import { useAppDispatch } from "../../store/hooks";
import { increaseStep } from "../../store/features/tools/toolsSlice";
function Workspace() {
    const dispatch = useAppDispatch();
    const action = useAppSelector(state => state.tools.currentTool);
    const stepNo = useAppSelector(state => state.tools.stepNo);
    function detectAction(e) {
        const [type, spec] = action;
        // we need to get a cords of where click took place on the workspace
        if (type === 'create') {
            fireAction([type, spec], [e.clientX, e.clientY], stepNo);
            dispatch(increaseStep(1));
        }
    }
    return (React.createElement("section", { className: "workspace-board" },
        React.createElement("div", { className: "workspace-board__map", onClick: (e) => detectAction(e) })));
}
export default Workspace;
//# sourceMappingURL=Workspace.js.map