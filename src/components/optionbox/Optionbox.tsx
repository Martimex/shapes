import React from "react";
import { /* useEffect,  */useLayoutEffect, useState } from "react";
import './optionbox.css';
import { useAppSelector } from "../../store/hooks";
import { buildShowcase } from './addons/buildShowcase';
import { showcaseSet } from "../../store/features/tools/toolsSlice";
/* import {
    doLog
} from '../../store/features/tools/toolsSlice.js';
 */
function Optionbox() {
    //const dispatch = useDispatch();
    const [use, spec]: string[] = useAppSelector(state => state.tools.currentTool);
    const buildParameters: showcaseSet = useAppSelector(state => state.tools.allTools[use][spec].showcase) 
    const [showcase, setShowcase] = useState(<div> {/* Nothing to showcase yet ! */} </div>);

    useLayoutEffect(() => {
        (use === 'default' || spec === 'default')?  
            setShowcase(<div> Nothing to showcase yet ! </div>)
            :
            setShowcase(buildShowcase(buildParameters));
    }, [buildParameters]);

    return(
        <section className="option-box">
            <div data-state={(use === 'default' || spec === 'default')? "inactive" : "active"} className="option-box__content">  
                {showcase}
            </div>
        </section>
    )
}

export default Optionbox;