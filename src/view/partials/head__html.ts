import WebviewParams from "../../primitives/function"

const cssline = (csses: string[]): string => {
    let ret = ''
    for (const css of csses) {
        ret += `<link rel="stylesheet" href="${css}">\n`
    }
    return ret
}

const head__html: WebviewParams = (
    ctx?
) => {
    return `
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>${ctx.title ? ctx.title + ' - Image Hosting' : 'Image Hosting'}</title>
    <meta name="description" content="An Image File Hosting Service">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="/static/img/favicon.ico" type="image/x-icon">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
    <link rel="stylesheet" href="/static/css/style.css">

    `
}

export default head__html;