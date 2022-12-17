import React from "react";
import { useEffect, useState } from "react";
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
    const [showcase, setShowcase] = useState(React.createElement("div", null, " Nothing to showcase yet ! "));
    useEffect(() => {
        if (use === 'default' || spec === 'default')
            return;
        console.log(`NEW current tool: ${use} + ${spec}`);
        setShowcase(buildShowcase(buildParameters));
    }, [buildParameters]);
    return (React.createElement("section", { className: "option-box" },
        React.createElement("div", { "data-state": (use === 'default' || spec === 'default') ? "inactive" : "active", className: "option-box__content" }, showcase)));
}
export default Optionbox;
//# sourceMappingURL=Optionbox.js.map