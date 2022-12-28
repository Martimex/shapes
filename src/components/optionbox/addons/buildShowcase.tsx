import React from "react";
import { showcaseSet } from "../../../store/features/tools/toolsSlice";

export const buildShowcase = function(buildParameters: showcaseSet) {
    //console.log(buildParameters);
    return (
        <div className="option-box__message">
            <h3 className="option-box__text--large"> {buildParameters.title} </h3>
                <p className="option-box__text option-box__text--framed"> {buildParameters.description} </p>
                <div className="option-box__steps">
                    {Array.from(Array(buildParameters.steps.length)).map((value, index) =>
                        <p key={'step_' + index.toString()} className="option-box__text--small option-box__step"> {`${index + 1}. ` + buildParameters.steps[index]} </p>
                    )}
                </div>
        </div>
    )
        
}