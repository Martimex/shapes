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
                        console.error('shape !');
                    }
                    break;
                }
            }
            break;
        }
        default: {
            console.log('none of the type detected');
        }
    }
}
function getShapePreview(x, y) {
    const preview = document.createElement('div');
    preview.classList.add('shape_preview');
    document.body.appendChild(preview);
    const workspace = document.querySelector('.workspace-board__map');
    workspace === null || workspace === void 0 ? void 0 : workspace.addEventListener('mousemove', (ev) => {
        console.log(ev.clientX);
        previewShape([x, y], [ev.clientX, ev.clientY], preview);
    });
}
function previewShape([vertice_x, vertice_y], [mouseX, mouseY], preview) {
    console.log('verticeX: ', vertice_x, ' vs: ', ' mouseX: ', mouseX, 'verticeY: ', vertice_y, ' vs: ', ' mouseY: ', mouseY);
    // Get the substraction > 0 for calculating square total height and width
    const preview_height = (vertice_y > mouseY) ? vertice_y - mouseY : mouseY - vertice_y;
    const preview_width = (vertice_x > mouseX) ? vertice_x - mouseX : mouseX - vertice_x;
    const diameter = (preview_height > preview_width) ? preview_height : preview_width;
    // Set the values for our preview box
    preview.style.height = `${diameter.toString()}px`;
    preview.style.width = `${diameter.toString()}px`;
    preview.style.top = `${(vertice_y - diameter / 2)}px`;
    preview.style.left = `${(vertice_x - diameter / 2)}px`;
    console.info('preview_height: ', preview_height, ' || ', ' preview_width: ', preview_width);
}
function createVertice(x, y) {
    const vertice = document.createElement('div');
    vertice.classList.add('vertice');
    vertice.style.top = `${y.toString()}px`;
    vertice.style.left = `${x.toString()}px`;
    document.body.appendChild(vertice);
    //console.warn(x, y);
}
//# sourceMappingURL=actionInitializers.js.map