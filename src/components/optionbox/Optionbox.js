import React from "react";
import { /* useEffect,  */ useLayoutEffect, useState } from "react";
import './optionbox.css';
import { useAppSelector } from "../../store/hooks";
import { buildShowcase } from './addons/buildShowcase';
/* import {
    doLog
} from '../../store/features/tools/toolsSlice.js';
 */
function Optionbox() {
    //const dispatch = useDispatch();
    const [use, spec] = useAppSelector(state => state.tools.currentTool);
    const buildParameters = useAppSelector(state => state.tools.allTools[use][spec].showcase);
    const [showcase, setShowcase] = useState(React.createElement("div", null,
        " ",
        " "));
    const shape_target = useAppSelector(state => state.shapes.targetShape);
    useLayoutEffect(() => {
        (use === 'default' || spec === 'default') ?
            setShowcase(React.createElement("div", null, " Nothing to showcase yet ! "))
            :
                setShowcase(buildShowcase(buildParameters, shape_target));
    }, [buildParameters]);
    useLayoutEffect(() => {
        if (use === 'modify' || use === 'design') {
            setShowcase(buildShowcase(buildParameters, shape_target));
        }
    }, [shape_target]);
    return (React.createElement("section", { className: "option-box" },
        React.createElement("div", { "data-state": (use === 'default' || spec === 'default') ? "inactive" : "active", className: "option-box__content" }, showcase)));
}
export default Optionbox;
//# sourceMappingURL=Optionbox.js.map