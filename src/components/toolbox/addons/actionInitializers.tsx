const workspace = document.querySelector('.workspace-board__map');

export default function fireAction([use_type, spec_name]: string[], [x, y]: number[], stepNo: number): void {
   // console.log('fire: ', use_type, spec_name, stepNo);

    switch(use_type) {
        case 'create': {
            switch(spec_name) {
                case 'square': {
                    if(stepNo === 0) {
                        createVertice(x, y);
                        getShapePreview(x, y);
                    } if(stepNo === 1) {
                        console.error('shape !');
                        //workspace?.removeEventListener('mousemove', resizePreview);
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

/* function resizePreview(ev: MouseEventInit, [x, y]: number[], [clientX, clientY]: number[], preview: HTMLElement) {
    
} */

function getShapePreview(x: number, y: number) {
    const preview = document.createElement('div');
    preview.classList.add('shape_preview');
    document.body.appendChild(preview);

    workspace?.addEventListener('mousemove', (ev: MouseEventInit) => {
        previewShape([x, y], [ev.clientX!, ev.clientY!], preview);
    })
}

function previewShape([vertice_x, vertice_y]: number[], [mouseX, mouseY]: number[], preview: HTMLElement) {
    console.log(
        'verticeX: ', vertice_x, ' vs: ', ' mouseX: ', mouseX,
        'verticeY: ', vertice_y, ' vs: ', ' mouseY: ', mouseY,
    );

    // Get the substraction > 0 for calculating square total height and width
    const preview_height = (vertice_y > mouseY)? vertice_y - mouseY : mouseY - vertice_y;
    const preview_width =  (vertice_x > mouseX)? vertice_x - mouseX : mouseX - vertice_x;

    const diameter = (preview_height > preview_width)? preview_height : preview_width;

    // Set the values for our preview box
    preview.style.height = `${diameter.toString()}px`;
    preview.style.width = `${diameter.toString()}px`;
    preview.style.top = `${(vertice_y - diameter / 2)}px`;
    preview.style.left = `${(vertice_x - diameter / 2)}px`;

    console.info('preview_height: ', preview_height, ' || ', ' preview_width: ', preview_width);
}

function createVertice(x: number, y: number) {
    const vertice = document.createElement('div');
    vertice.classList.add('vertice');
    vertice.style.top = `${y.toString()}px`;
    vertice.style.left = `${x.toString()}px`;
    document.body.appendChild(vertice);
    //console.warn(x, y);
}