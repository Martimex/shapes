import React from "react";
import './toolbox.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation, faSquare, faCircle, faRectangleXmark, faRotate, faExpand, faUpDownLeftRight, faFill, faPalette, faBorderTopLeft, } from '@fortawesome/free-solid-svg-icons';
const toolbox_sections = [
    /*     new ToolboxSection('Create shape', [{name: 'square', icon: 'sq'}, {name: 'rectangle', icon: 'rect'}, {name: 'triangle', icon: 'tri'}, {name: 'circle', icon: 'circ'}]),
        new ToolboxSection('Design shape', [{name: 'color', icon: 'col'}, {name: 'gradient', icon: 'grad'}, {name: 'borders', icon: 'bord'}]),
        new ToolboxSection('Modify shape', [{name: 'resize', icon: 'res'}, {name: 'rotate', icon: 'rot'}, {name: 'scale', icon: 'sc'}]), */
    { title: 'Modify shape', elements: [{ name: 'resize', icon: faUpDownLeftRight }, { name: 'rotate', icon: faRotate }, { name: 'scale', icon: faExpand }] },
    { title: 'Create shape', elements: [{ name: 'square', icon: faSquare }, { name: 'rectangle', icon: faRectangleXmark }, { name: 'triangle', icon: faTriangleExclamation }, { name: 'circle', icon: faCircle }] },
    { title: 'Design shape', elements: [{ name: 'color', icon: faFill }, { name: 'gradient', icon: faPalette }, { name: 'borders', icon: faBorderTopLeft }] },
];
function Toolbox() {
    console.log(toolbox_sections);
    const allToolboxSections = toolbox_sections.map((value, index) => {
        let allButtons = Array.from(Array(value.elements.length)).map((val, ind) => React.createElement("button", { className: 'btn btn-tool', key: `btn-${index}-${ind}` },
            React.createElement(FontAwesomeIcon, { className: "icon", icon: value.elements[ind].icon }),
            value.elements[ind].name));
        return (React.createElement("div", { className: "toolbox", key: index.toString() },
            React.createElement("p", { className: "toolbox__paragraph" },
                " ",
                value.title,
                " "),
            React.createElement("div", { className: "toolbox__button-box" }, allButtons)));
    });
    return (React.createElement("section", { className: "toolbox-container" }, allToolboxSections));
}
export default Toolbox;
//# sourceMappingURL=Toolbox.js.map