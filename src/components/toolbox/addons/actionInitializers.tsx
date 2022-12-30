export default function fireAction([use_type, spec_name]: string[], [x, y]: number[], stepNo: number): void {
   // console.log('fire: ', use_type, spec_name, stepNo);

    switch(use_type) {
        case 'create': {
            switch(spec_name) {
                case 'square': {
                    if(stepNo === 0) {
                        createVertice(x, y);
                        getShapePreview(x, y, spec_name);
                    } if(stepNo === 1) {
                        removeVertice();
                        prepareShape(spec_name);
                    }
                    break;
                }
                case 'rectangle': {
                    if(stepNo === 0) {
                        createVertice(x, y);
                        getShapePreview(x, y, spec_name);
                    } if(stepNo === 1) {
                        removeVertice();
                        prepareShape(spec_name);
                    }
                    break;
                }
                case 'triangle': {
                    if(stepNo === 0) {
                        createVertice(x, y);
                        getShapePreview(x, y, spec_name);
                    } if(stepNo === 1) {
                        removeVertice();
                        prepareShape(spec_name);
                    }
                    break;
                }
                case 'circle': {
                    if(stepNo === 0) {
                        createVertice(x, y);
                        getShapePreview(x, y, spec_name);
                    } if(stepNo === 1) {
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

type cordObj = {
    vertice: [x:number, y:number];
    client: [x:number, y:number];
}

const cords: cordObj = {
    vertice: [0, 0],
    client: [0, 0],
}


function resizePreview(ev: MouseEventInit) {///* ev: MouseEventInit, [x, y]: number[], [clientX, clientY]: number[], preview: HTMLElement */) {
    //console.log(ev.clientX, ev.clientY);
    const preview = document.querySelector('.shape_preview') as HTMLDivElement | null;
    console.assert(preview, 'NO SHAPE PREVIEW FOUND !');

    !!preview && previewShape([cords.vertice[0], cords.vertice[1]], [ev.clientX!, ev.clientY!], preview);
}

function getShapePreview(x: number, y: number, spec_name: string) {
    const workspace = document.querySelector('.workspace-board__map');
    cords.vertice = [x, y];
    
    const preview = document.createElement('div');
    preview.classList.add('shape_preview', `shape_preview--${spec_name}`);
    preview.dataset.shape = `${spec_name}`;
    document.body.appendChild(preview);

    workspace?.addEventListener('mousemove', resizePreview);


   /*  workspace?.addEventListener('mousemove', (ev: MouseEventInit) => {
        previewShape([x, y], [ev.clientX!, ev.clientY!], preview);
    }) */
}


function previewShape([vertice_x, vertice_y]: number[], [mouseX, mouseY]: number[], preview: HTMLDivElement) {
/*    console.log(
        'verticeX: ', vertice_x, ' vs: ', ' mouseX: ', mouseX,
        'verticeY: ', vertice_y, ' vs: ', ' mouseY: ', mouseY,
    ); */

    // Get the substraction > 0 for calculating square total height and width
    const preview_height = (vertice_y > mouseY)? vertice_y - mouseY : mouseY - vertice_y;
    const preview_width =  (vertice_x > mouseX)? vertice_x - mouseX : mouseX - vertice_x;

    if(preview.dataset?.shape === 'square' || preview.dataset?.shape === 'circle') {
        const diameter = (preview_height > preview_width)? preview_height : preview_width;
        console.log('square or circle => ', preview.dataset.shape);
        // Set the values for our preview box
        preview.style.height = `${diameter.toString()}px`;
        preview.style.width = `${diameter.toString()}px`;
        preview.style.top = `${(vertice_y - diameter / 2)}px`;
        preview.style.left = `${(vertice_x - diameter / 2)}px`;
    }
    else if(preview.dataset?.shape === 'rectangle') {
        // Set the values for our preview box
        console.log('rect');
        preview.style.height = `${preview_height.toString()}px`;
        preview.style.width = `${preview_width.toString()}px`;
        preview.style.top = `${(vertice_y - preview_height / 2)}px`;
        preview.style.left = `${(vertice_x - preview_width / 2)}px`;
    }
    else if(preview.dataset?.shape === 'triangle') {
        console.warn('triangle');
        // Set the values for our preview box
        const diameter = (preview_height > preview_width)? preview_height : preview_width;

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

function createVertice(x: number, y: number) {
    const vertice = document.createElement('div');
    vertice.classList.add('vertice');
    vertice.style.top = `${y.toString()}px`;
    vertice.style.left = `${x.toString()}px`;
    document.body.appendChild(vertice);
    //console.warn(x, y);
}

function removeVertice() {
    const vertice = document.querySelector('.vertice') as HTMLDivElement | null;
    vertice?.remove();
}

function prepareShape(spec_name: string) {
    const workspace = document.querySelector('.workspace-board__map');
    //console.error('shape !', workspace);
    workspace?.removeEventListener('mousemove', resizePreview);
    const preview = document.querySelector('.shape_preview') as HTMLDivElement | null;
    preview?.classList.add('shape', `shape--${spec_name}`, 'untargetable');
    preview?.classList.remove('shape_preview');
}