import WebviewParams from "../primitives/function";
import foot__html from "./partials/foot__html";
import head__html from "./partials/head__html";


const index__html: WebviewParams = (
    ctx?
) => {
    return `
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]>      <html class="no-js"> <!--<![endif]-->
<html lang="en" data-bs-theme="dark">
    <head>
        ${head__html({
            title: ctx.title,
        })}
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
        <div class="container col-xxl-8 px-4 pt-5">
            <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div class="col-10 col-sm-8 col-lg-6 mx-auto">
                <img src="/static/img/cover.jpg" class="d-block mx-lg-auto img-fluid rounded" alt="Cover Image" loading="lazy">
            </div>
            <div class="col-lg-6">
                <h1 class="display-5 fw-bold lh-1 mb-3">Image Hosting Services</h1>
                <p class="lead">
                    Quickly host your images with simple and easy steps for free, no registration required!
                    We also provide an API for you to integrate with your favourite applications.
                </p>
                <div class="d-grid gap-2 mb-3 d-md-flex justify-content-md-start">
                <a href="#image-form" class="btn btn-primary btn-lg px-4 mb-3 mb-md-0 me-md-2">Start Uploading</a>
                <a href="#api" type="button" class="btn btn-outline-light btn-lg px-4">API Docs</a>
                </div>
                <a href="https://blog.naj.one">
                    How it works?
                </a>
            </div>
            </div>
            <small>Served completely serverless using <a href="https://workers.cloudflare.com/" class="text-warning">Cloudflare Workers</a> and <a href="https://www.cloudflare.com/developer-platform/r2/" class="text-warning">Cloudflare R2</a>.</small>
            <hr class="mt-5"/>
        </div>
        <div class="container col-xxl-8 px-4 pt-4" id="image-form">
            ${ !ctx.url_result ? '\
            <h3>Upload Your Image</h3>\
            <p class="lead">or use our <a href="#api">API</a> to do so</p>' 
            : ''}
            <div class="alert ${ ctx.server_notification ? ctx.server_notification.alert_type! : 'd-none' }" role="alert">
                <i class="bi bi-exclamation-triangle-fill"></i>
                <span class="ms-2">${
                    ctx.server_notification?.message ? ctx.server_notification.message : 'Something Went Wrong'
                }</span>
            </div>
            <div class="alert alert-danger d-none" role="alert" id="form-dismissible-alert">
                <i class="bi bi-exclamation-triangle-fill"></i>
                <span class="ms-2">Please do not upload any sensitive images as they are publicly accessible.</span>
            </div>
            ${ctx.url_result ? `
            <div class="result">
                <h3 class="text-success-emphasis">Success! Here is your URL</h3>
                <p>
                <span class="me-2 lh-lg">${ctx.url_result}</span>
                <button class="btn btn-primary btn-sm" id="copy-url" onclick="
                    const url = '${ctx.url_result}';
                    navigator.clipboard.writeText(url);
                    const btn = document.getElementById('copy-url');
                    btn.innerHTML = 'Copied!';
                    setTimeout(() => {
                        btn.innerHTML = 'Copy URL';
                    }, 1500);
                ">Copy URL</button>
                </p>
            </div>
            ` : ''}
            <form method="POST" action="/#image-form" enctype="multipart/form-data">
                <label for="image" class="form-label rounded file-drag-drop px-5 py-5 text-center">
                    <span class="form-label-text fs-5 fw-bold">Select or Drag an Image</span>
                    <i class="bi bi-cloud-arrow-up-fill drag-icons fs-1 mt-3"></i> 
                    <span class="form-label-text">Maximum file size: 10MB</span>
                    <span class="form-label-text">Accepted file types: JPG, PNG, or GIF</span>
                    <span class="form-label-text els">Selected File: <span id="filename-text" class="fw-bold">None</span></span>
                    <input class="form-control file-chosen" id="image" type="file" name="image" accept="image/jpeg,image/png,image/gif" />
                </label>
                <button type="submit" class="btn btn-lg btn-primary mt-3 w-100" >Upload</button>
            </form>
            <hr class="mt-5"/>
        </div>
        <div class="container col-xxl-8 px-4 pt-4" id="api">
            <h3>API</h3>
            <p class="lead">Use our API to upload your images through POST request</p>
            <div class="card">
                <div class="px-4 py-3">
                    <div class="row">
                        <span class="col-md-2 col-12">Endpoint</span> <code class="col-md-10 col-12">${ctx.base_url}/img/create</code>
                    </div>
                    <div class="row">
                        <span class="col-md-2 col-12">Method</span> <code class="col-md-10 col-12">POST</code>
                    </div>
                    <div class="row">
                        <span class="col-md-2 col-12">Content-Type</span> <code class="col-md-10 col-12">multipart/form-data;</code>
                    </div>
                    <p class="mt-2">
                        You can send a POST request to the endpoint with the image file in the body with the key <code>image</code>.
                        Make sure that your image is less than 10MB and is of type JPG, PNG or GIF. Below is an example of a request using Postman.
                    </p>
                    <h3 class="text-success-emphasis">Successful Request</h3>
                    <p>
                        <h5>Request</h5>
                        <pre>
User-Agent: PostmanRuntime/7.32.3
Accept: */*
Cache-Control: no-cache
Postman-Token: ...
Host: https://img.thr.fi
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Content-Type: multipart/form-data; boundary=--------------------------791398935748019206849110
Content-Length: 32261

image: ...
                        </pre>
                        <h5>Response</h5>
                        <pre>
Content-Length: 71
Content-Type: application/json
Access-Control-Allow-Origin: null
Access-Control-Allow-Methods: GET, POST
Access-Control-Max-Age: 86400

{
    "url": ...
}
                        </pre>
                    <p>
                    <h3 class="text-danger-emphasis">Failed Request</h3>
                    <p>
                        <h5>Request</h5>
                        <pre>
User-Agent: PostmanRuntime/7.32.3
Accept: */*
Cache-Control: no-cache
Postman-Token: ...
Host: https://img.thr.fi
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Content-Type: multipart/form-data; boundary=--------------------------045718419904143887365714
Content-Length: 248951

image: ...
                        </pre>
                        <h5>Response</h5>
                        <pre>
Content-Length: 54
Content-Type: application/json; charset=utf-8
Access-Control-Allow-Origin: null
Access-Control-Allow-Methods: GET, POST
Access-Control-Max-Age: 86400

{
    "status": 400,
    "error": "Only jpg, png, or gif allowed"
}
                        </pre>
                    <p>
                </div>
            </div>
            <hr class="mt-5"/>
        </div>
        <div class="container col-xxl-8 px-4 py-4 text-center">
            <p>Created by <a href="https://www.naj.one">Thirafi Najwan</a></p>
        </div>
        ${
            foot__html({})
        }
        <script src="/static/js/home.js"></script>
    </body>
</html>
    `
}

export default index__html;