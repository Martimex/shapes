import React from "react";
import './toolbox.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faTriangleExclamation, faSquare, faCircle, faRectangleXmark,
    faRotate, faExpand, faUpDownLeftRight,
    faFill, faPalette, faBorderTopLeft,
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
//import ToolboxSection from "./addons/toolboxSectionGenerator";

type ToolboxElement = {
    readonly title: string,
    readonly elements: Element[],
}

type Element = {
    readonly name: string,
    readonly icon: IconDefinition,
}

const toolbox_sections: ToolboxElement[] = [
/*     new ToolboxSection('Create shape', [{name: 'square', icon: 'sq'}, {name: 'rectangle', icon: 'rect'}, {name: 'triangle', icon: 'tri'}, {name: 'circle', icon: 'circ'}]),
    new ToolboxSection('Design shape', [{name: 'color', icon: 'col'}, {name: 'gradient', icon: 'grad'}, {name: 'borders', icon: 'bord'}]),
    new ToolboxSection('Modify shape', [{name: 'resize', icon: 'res'}, {name: 'rotate', icon: 'rot'}, {name: 'scale', icon: 'sc'}]), */
    {title: 'Modify shape', elements: [{name: 'resize', icon: faUpDownLeftRight}, {name: 'rotate', icon: faRotate}, {name: 'scale', icon: faExpand}]},
    {title: 'Create shape', elements: [{name: 'square', icon: faSquare}, {name: 'rectangle', icon: faRectangleXmark}, {name: 'triangle', icon: faTriangleExclamation}, {name: 'circle', icon: faCircle}]},
    {title: 'Design shape', elements: [{name: 'color', icon: faFill}, {name: 'gradient', icon: faPalette}, {name: 'borders', icon: faBorderTopLeft}]},
];

function Toolbox() {

    console.log(toolbox_sections);
    const allToolboxSections = toolbox_sections.map((value: ToolboxElement, index: number) => {
        let allButtons = Array.from(Array(value.elements.length)).map((val: Element, ind: number) =>
            <button className={'btn btn-tool'} key={`btn-${index}-${ind}`}>  
                <FontAwesomeIcon className="icon" icon={value.elements[ind].icon}></FontAwesomeIcon>
                {value.elements[ind].name} 
            </button>
        )
        return(
            <div className="toolbox" key={index.toString()}>
                <p className="toolbox__paragraph"> {value.title} </p>
                <div className="toolbox__button-box">
                    {allButtons}
                </div>
            </div>
        )
    })

    return (
        <section className="toolbox-container">
            {allToolboxSections}
        </section>
    )
}

export default Toolbox;