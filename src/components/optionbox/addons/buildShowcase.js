import React from "react";
export const buildShowcase = function (buildParameters, shape_target) {
    //console.warn(shape_target, shape_target.length);
    //console.log(buildParameters);
    return (React.createElement("div", { className: "option-box__message" },
        React.createElement("h3", { className: "option-box__text--large" },
            " ",
            buildParameters.title,
            " "),
        shape_target.length ?
            (buildParameters.options &&
                React.createElement(React.Fragment, null,
                    React.createElement("div", null, " Implement options for this tool "))) : (React.createElement(React.Fragment, null,
            React.createElement("p", { className: "option-box__text option-box__text--framed" },
                " ",
                buildParameters.description,
                " "),
            React.createElement("div", { className: "option-box__steps" }, Array.from(Array(buildParameters.steps.length)).map((value, index) => React.createElement("p", { key: 'step_' + index.toString(), className: "option-box__text--small option-box__step" },
                " ",
                `${index + 1}. ` + buildParameters.steps[index],
                " ")))))));
};
//# sourceMappingURL=buildShowcase.js.map