import WebviewParams from "../../primitives/function";

const style__css: WebviewParams = (
    ctx?
) => {
    return `
    .file-drag-drop {
        width: 100%;
        border: 2px dashed #ccc;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease-in-out;
    }
    .file-drag-drop:hover, .file-drag-drop--active {
        background-color: #2f2f2f;
    }
    .file-drag-drop * {
        display: block;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 100%;
    }
    .file-drag-drop .file-chosen {
        opacity: 0;
        position: absolute;
        width: 0;
        height: 0;
    }
    `
}

export default style__css;