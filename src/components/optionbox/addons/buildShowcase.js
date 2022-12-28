import React from "react";
export const buildShowcase = function (buildParameters) {
    //console.log(buildParameters);
    return (React.createElement("div", { className: "option-box__message" },
        React.createElement("h3", { className: "option-box__text--large" },
            " ",
            buildParameters.title,
            " "),
        React.createElement("p", { className: "option-box__text option-box__text--framed" },
            " ",
            buildParameters.description,
            " "),
        React.createElement("div", { className: "option-box__steps" }, Array.from(Array(buildParameters.steps.length)).map((value, index) => React.createElement("p", { key: 'step_' + index.toString(), className: "option-box__text--small option-box__step" },
            " ",
            `${index + 1}. ` + buildParameters.steps[index],
            " ")))));
};
//# sourceMappingURL=buildShowcase.js.map