export default function fireAction([use_type, spec_name], [x, y], stepNo) {
    // console.log('fire: ', use_type, spec_name, stepNo);
    switch (use_type) {
        case 'create': {
            switch (spec_name) {
                case 'square': {
                    if (stepNo === 0) {
                        createVertice(x, y);
                        getShapePreview(x, y);
                    }
                    if (stepNo === 1) {
                        removeVertice();
                        prepareShape(spec_name);
                    }
                    break;
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
    !!preview && previewShape([cords.vertice[0], cords.vertice[1]], [ev.clientX, ev.clientY], preview);
}
function getShapePreview(x, y) {
    const workspace = document.querySelector('.workspace-board__map');
    cords.vertice = [x, y];
    const preview = document.createElement('div');
    preview.classList.add('shape_preview');
    document.body.appendChild(preview);
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
    // Get the substraction > 0 for calculating square total height and width
    const preview_height = (vertice_y > mouseY) ? vertice_y - mouseY : mouseY - vertice_y;
    const preview_width = (vertice_x > mouseX) ? vertice_x - mouseX : mouseX - vertice_x;
    const diameter = (preview_height > preview_width) ? preview_height : preview_width;
    // Set the values for our preview box
    preview.style.height = `${diameter.toString()}px`;
    preview.style.width = `${diameter.toString()}px`;
    preview.style.top = `${(vertice_y - diameter / 2)}px`;
    preview.style.left = `${(vertice_x - diameter / 2)}px`;
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
    preview === null || preview === void 0 ? void 0 : preview.classList.add('shape', `shape--${spec_name}`, 'untargetable');
    preview === null || preview === void 0 ? void 0 : preview.classList.remove('shape_preview');
}
//# sourceMappingURL=actionInitializers.js.map