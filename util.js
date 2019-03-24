export function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function httpGetAsync(url, callback, arg) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && (xmlHttp.status == 200 || xmlHttp.status == 404))
            callback(xmlHttp.responseText, arg);
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}

export function AddOnload(func) {
    if (window.addEventListener)
        window.addEventListener('load', func, false);
    else if (window.attachEvent)
        window.attachEvent('onload', func);
}