export default function fireAction([use_type, spec_name], [x, y], stepNo, target) {
    // console.log('fire: ', use_type, spec_name, stepNo);
    switch (use_type) {
        case 'create': {
            switch (spec_name) {
                case 'square':
                case 'rectangle':
                case 'triangle':
                case 'circle':
                    {
                        if (stepNo === 0) {
                            createVertice(x, y);
                            getShapePreview(x, y, spec_name);
                        }
                        if (stepNo === 1) {
                            removeVertice();
                            prepareShape(spec_name);
                        }
                        break;
                    }
                default: {
                    console.error(`SHAPE ${spec_name} DOES NOT EXIST !`);
                }
            }
            break;
        }
        case 'modify': {
            switch (spec_name) {
                case 'move': {
                    if (stepNo === 0) {
                        if (target === null || target === void 0 ? void 0 : target.matches('.shape')) {
                            console.warn('match !');
                            //detectTargetShape(target);
                        }
                    }
                    break;
                }
                default: {
                    console.error(`FEATURE NOT IMPLEMENTED: ${spec_name}`);
                }
            }
            break;
        }
        default: {
            console.warn('none of the type detected');
        }
    }
}
const cords = {
    vertice: [0, 0],
    client: [0, 0],
};
function resizePreview(ev) {
    //console.log(ev.clientX, ev.clientY);
    const preview = document.querySelector('.shape_preview');
    console.assert(preview, 'NO SHAPE PREVIEW FOUND !');
    // We need to get the Toolbox height, in order to properly calculate top position for newly created shapes
    const toolbox = document.querySelector('.toolbox-container');
    const toolbox_height = toolbox.getBoundingClientRect().height;
    !!preview && previewShape([cords.vertice[0], (cords.vertice[1] - toolbox_height)], [ev.clientX, (ev.clientY - toolbox_height)], preview);
}
function getShapePreview(x, y, spec_name) {
    const workspace = document.querySelector('.workspace-board__map');
    cords.vertice = [x, y];
    const preview = document.createElement('div');
    preview.classList.add('shape_preview', `shape_preview--${spec_name}`);
    preview.dataset.shape = `${spec_name}`;
    workspace === null || workspace === void 0 ? void 0 : workspace.appendChild(preview);
    workspace === null || workspace === void 0 ? void 0 : workspace.addEventListener('mousemove', resizePreview);
    /*  workspace?.addEventListener('mousemove', (ev: MouseEventInit) => {
         previewShape([x, y], [ev.clientX!, ev.clientY!], preview);
     }) */
}
function previewShape([vertice_x, vertice_y], [mouseX, mouseY], preview) {
    /*    console.log(
            'verticeX: ', vertice_x, ' vs: ', ' mouseX: ', mouseX,
            'verticeY: ', vertice_y, ' vs: ', ' mouseY: ', mouseY,
        ); */
    //console.log('vertice_y: ', vertice_y, ' mouseY: ', mouseY);
    var _a, _b, _c, _d;
    // Get the substraction > 0 for calculating square total height and width
    const preview_height = (vertice_y > mouseY) ? vertice_y - mouseY : mouseY - vertice_y;
    const preview_width = (vertice_x > mouseX) ? vertice_x - mouseX : mouseX - vertice_x;
    if (((_a = preview.dataset) === null || _a === void 0 ? void 0 : _a.shape) === 'square' || ((_b = preview.dataset) === null || _b === void 0 ? void 0 : _b.shape) === 'circle') {
        const diameter = (preview_height > preview_width) ? preview_height : preview_width;
        //console.log('square or circle => ', 'verticeY: ', vertice_y, ' diameter: ', diameter, ' toolbox_height: ', toolbox_height);
        // Set the values for our preview box
        preview.style.height = `${diameter.toString()}px`;
        preview.style.width = `${diameter.toString()}px`;
        preview.style.top = `${(vertice_y - diameter / 2)}px`;
        preview.style.left = `${(vertice_x - diameter / 2)}px`;
    }
    else if (((_c = preview.dataset) === null || _c === void 0 ? void 0 : _c.shape) === 'rectangle') {
        // Set the values for our preview box
        console.log('rect');
        preview.style.height = `${preview_height.toString()}px`;
        preview.style.width = `${preview_width.toString()}px`;
        preview.style.top = `${(vertice_y - preview_height / 2)}px`;
        preview.style.left = `${(vertice_x - preview_width / 2)}px`;
    }
    else if (((_d = preview.dataset) === null || _d === void 0 ? void 0 : _d.shape) === 'triangle') {
        console.warn('triangle');
        // Set the values for our preview box
        const diameter = (preview_height > preview_width) ? preview_height : preview_width;
        preview.style.width = '0px';
        preview.style.height = '0px';
        preview.style.background = '#0002';
        preview.style.borderLeft = `${diameter.toString()}px solid #0000`;
        preview.style.borderRight = `${diameter.toString()}px solid #0000`;
        preview.style.borderBottom = `${diameter.toString()}px solid lightgray`;
        preview.style.top = `${(vertice_y - diameter / 2)}px`;
        preview.style.left = `${(vertice_x - diameter / 2)}px`;
    }
    //console.info('preview_height: ', preview_height, ' || ', ' preview_width: ', preview_width);
}
function createVertice(x, y) {
    const vertice = document.createElement('div');
    vertice.classList.add('vertice');
    vertice.style.top = `${y.toString()}px`;
    vertice.style.left = `${x.toString()}px`;
    document.body.appendChild(vertice);
    //console.warn(x, y);
}
function removeVertice() {
    const vertice = document.querySelector('.vertice');
    vertice === null || vertice === void 0 ? void 0 : vertice.remove();
}
function prepareShape(spec_name) {
    const workspace = document.querySelector('.workspace-board__map');
    //console.error('shape !', workspace);
    workspace === null || workspace === void 0 ? void 0 : workspace.removeEventListener('mousemove', resizePreview);
    const preview = document.querySelector('.shape_preview');
    preview.dataset.id = generateId();
    preview.classList.add('shape', `shape--${spec_name}`, 'untargetable');
    preview.classList.remove('shape_preview', `shape_preview--${spec_name}`);
    // Append a preview element to the Workspace
    preview && (workspace === null || workspace === void 0 ? void 0 : workspace.appendChild(preview)); // - commented out, because it causes bugs
}
function generateId() {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const idLength = 16;
    let idString = '';
    for (let id_no = 0; id_no < idLength; id_no++) {
        idString += letters[Math.floor(Math.random() * letters.length)];
    }
    return idString;
}
//# sourceMappingURL=actionInitializers.js.map