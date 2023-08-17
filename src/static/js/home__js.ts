import WebviewParams from "../../primitives/function";

const home__js: WebviewParams = (ctx?) => {
    return `
        const fileDragDrop = document.querySelector('.file-drag-drop');
        const fileChosen = document.querySelector('.file-chosen');
        const filename_text = document.querySelector('#filename-text');
        const form_dismissible_alert = document.querySelector('#form-dismissible-alert');
        const alert_msg = document.querySelector('#form-dismissible-alert .ms-2');

        fileDragDrop.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileDragDrop.classList.add('file-drag-drop--active');
        });

        fileDragDrop.addEventListener('dragleave', (e) => {
            e.preventDefault();
            fileDragDrop.classList.remove('file-drag-drop--active');
        });

        fileDragDrop.addEventListener('drop', (e) => {
            e.preventDefault();
            fileDragDrop.classList.remove('file-drag-drop--active');
            fileChosen.files = null;
            filename_text.innerText = 'None';
            if (e.dataTransfer.files.length > 1) {
                form_dismissible_alert.classList.remove('d-none');
                alert_msg.innerText = 'Please only upload one file at a time.';
                return;
            } else if (e.dataTransfer.files[0].size > 10485760) {
                form_dismissible_alert.classList.remove('d-none');
                alert_msg.innerText = 'Please only upload files smaller than 10MB.';
                return;
            } else if (!e.dataTransfer.files[0].type.match(/image\\/(jpeg|png|gif)/)) {
                form_dismissible_alert.classList.remove('d-none');
                alert_msg.innerText = 'Please only upload files with the following extensions: JPG, PNG, GIF.';
                return;
            }
            form_dismissible_alert.classList.add('d-none');
            fileChosen.files = e.dataTransfer.files;
            filename_text.innerText = e.dataTransfer.files[0].name;
        });

        fileChosen.addEventListener('change', (e) => {
            fileChosen.files = null;
            filename_text.innerText = 'None';
            if (e.target.files.length < 1) {
                filename_text.innerText = 'None';
                return;
            } 
            if (e.target.files.length > 1) {
                form_dismissible_alert.classList.remove('d-none');
                alert_msg.innerText = 'Please only upload one file at a time.';
                return;
            } else if (e.target.files[0].size > 10485760) {
                form_dismissible_alert.classList.remove('d-none');
                alert_msg.innerText = 'Please only upload files smaller than 10MB.';
                return;
            } else if (!e.target.files[0].type.match(/image\\/(jpeg|png|gif)/)) {
                form_dismissible_alert.classList.remove('d-none');
                alert_msg.innerText = 'Please only upload files with the following extensions: JPG, PNG, GIF.';
                return;
            }
            form_dismissible_alert.classList.add('d-none');
            filename_text.innerText = e.target.files[0].name;
        });
    `
}

export default home__js;