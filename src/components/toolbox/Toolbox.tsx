import React, { useEffect, useState } from "react";
import './toolbox.css';
//import fireAction from "./addons/actionInitializers"; uncomment later when working with design and modify parts !!!
import { useAppDispatch } from "../../store/hooks";
import { 
    changeTool,
    setStep
} from "../../store/features/tools/toolsSlice";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faTriangleExclamation, faSquare, faCircle, faRectangleXmark,
    faRotate, faExpand, faUpDownLeftRight,
    faFill, faPalette, faBorderTopLeft,
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
//import ToolboxSection from "./addons/toolboxSectionGenerator";

function detectButton(e: React.MouseEvent<HTMLElement, MouseEvent>, dispatch: any, [actionButton, setActionButton]: [HTMLElement, any]): void {
    //console.log(typeof(e.target), e.target.hasOwnProperty("dataset['use']"), e.target.dataset, e.target)
    if(!(e.target instanceof HTMLElement)) return;
    if(!e.target.dataset['use'] || !e.target.dataset['spec']) return;

    // Now we know that we are 100% working only with Action buttons
    actionButton.classList.remove('active');

    // Check if previously clicked button is the same as clicked now !
    if(e.target === actionButton) { 
        console.warn('equal');
        dispatch(changeTool( {use: 'default', spec: 'default' }));
        setActionButton(document.createElement('div'));
    } else {
        dispatch(changeTool( {use: e.target.dataset['use'], spec: e.target.dataset['spec'] }));
        setActionButton(e.target);
    }

    //fireAction([e.target.dataset['use'], e.target.dataset['spec']]); uncomment later when working with design and modify parts !!!
}


type ToolboxElement = {
    readonly title: string,
    readonly data: string,
    readonly elements: Element[],
}

type Element = {
    readonly name: string,
    readonly pseudoname? : string,
    readonly icon: IconDefinition,
}

const toolbox_sections: ToolboxElement[] = [
/*     new ToolboxSection('Create shape', [{name: 'square', icon: 'sq'}, {name: 'rectangle', icon: 'rect'}, {name: 'triangle', icon: 'tri'}, {name: 'circle', icon: 'circ'}]),
    new ToolboxSection('Design shape', [{name: 'color', icon: 'col'}, {name: 'gradient', icon: 'grad'}, {name: 'borders', icon: 'bord'}]),
    new ToolboxSection('Modify shape', [{name: 'resize', icon: 'res'}, {name: 'rotate', icon: 'rot'}, {name: 'scale', icon: 'sc'}]), */
    {title: 'Modify shape', data: "modify", elements: [{name: 'move', icon: faUpDownLeftRight}, {name: 'rotate', icon: faRotate}, {name: 'resize', icon: faExpand}]},
    {title: 'Create shape', data: "create", elements: [{name: 'square', pseudoname: 'sq', icon: faSquare}, {name: 'rectangle', pseudoname: 'rect', icon: faRectangleXmark}, {name: 'triangle', pseudoname: 'tri', icon: faTriangleExclamation}, {name: 'circle', pseudoname: 'circ', icon: faCircle}]},
    {title: 'Design shape', data: "design", elements: [{name: 'color', icon: faFill}, {name: 'gradient', icon: faPalette}, {name: 'borders', icon: faBorderTopLeft}]},
];

function Toolbox() {

    const dispatch = useAppDispatch();
    const [actionButton, setActionButton] = useState(document.createElement('div'));

    useEffect(() => {
        dispatch(setStep({value: 0}));
        actionButton.classList.contains('active')?
            actionButton.classList.remove('active')
            :    
            actionButton.classList.add('active');
    }, [actionButton])

    //console.log(toolbox_sections);
    const allToolboxSections = toolbox_sections.map((value: ToolboxElement, index: number) => {
        let allButtons = Array.from(Array(value.elements.length)).map((val: Element, ind: number) =>
            <button type={`button`} data-use={`${value.data}`} data-spec={`${value.elements[ind].name}`} className={'btn btn-tool'} key={`btn-${index}-${ind}`}>
                <div className="btn-tool__container">
                    <FontAwesomeIcon className="icon icon-tool" icon={value.elements[ind].icon}></FontAwesomeIcon>
                    <p className="btn-tool__paragraph">  {(value.elements[ind].pseudoname)? value.elements[ind].pseudoname : value.elements[ind].name}  </p>
                </div>  
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
        <section className="toolbox-container" onClick={(e) => { detectButton(e, dispatch, [actionButton, setActionButton]); } }>
            {allToolboxSections}
        </section>
    )
}

export default Toolbox;
