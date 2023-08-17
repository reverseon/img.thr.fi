import WebviewParams from "../primitives/function";
import foot__html from "./partials/foot__html";
import head__html from "./partials/head__html";

const not_found__html: WebviewParams = (ctx: any) => {
    return `
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]>      <html class="no-js"> <!--<![endif]-->
<html data-bs-theme="dark">
    <head>
    ${
        head__html({
            title: 'Not Found',
        })
    }
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
        <div class="px-4 py-5 my-5 text-center">
            <img class="d-block mx-auto mb-4" src="/static/img/not_found.png" alt="Not Found" width="100" height="100">
            <h1 class="display-5 fw-bold text-body-emphasis">404 - Not Found</h1>
            <div class="col-lg-6 mx-auto">
            <p class="lead mb-4">
                Sorry, but the page you were trying to view does not exist. Please make sure you have typed the URL correctly. If you think this is a server error, please try again later.
            </p>
            <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <a href="/" class="btn btn-primary btn-lg px-4 gap-3">Back to Home</a>
            </div>
            </div>
        </div> 
        ${foot__html({})}
    </body>
</html>
    `
}

export default not_found__html;