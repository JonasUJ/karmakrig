import * as util from './util.js';

let imgleft, imgright;
let barleft, barright;
let karmaleft, karmaright;

function update(inp) {
    util.httpGetAsync(`https://www.reddit.com/user/${inp.value}/about.json`, setImgAndPer, inp);
}

function setImgAndPer(json, inp) {
    console.log(json);
    var resp = JSON.parse(json);
    if (resp.error == 404) {
        if (inp.id === "rightInput") {
            imgright.src = "./none.png";
            karmaright.innerHTML = "0";
        } else {
            imgleft.src = "./none.png";
            karmaleft.innerHTML = "0";
        }
        setKarma(parseInt(karmaleft.innerHTML), parseInt(karmaright.innerHTML));
        return;
    }

    var data = resp.data;
    inp.value = data.name;

    if (inp.id === "rightInput") {
        karmaright.innerHTML = data.comment_karma + data.link_karma;
        imgright.src = data.icon_img.replace('&amp;', '&');
    } else {
        karmaleft.innerHTML = data.comment_karma + data.link_karma;
        imgleft.src = data.icon_img.replace('&amp;', '&');
    }
    setKarma(parseInt(karmaleft.innerHTML), parseInt(karmaright.innerHTML));
}

function setKarma(left, right) {
    var per = 50;
    if (left == right) {
        per = 50;
    } else if (left == 0) {
        per = 0;
    } else if (right == 0) {
        per = 100;
    } else if (left > right) {
        per = 100 - right/2/left * 100;
    } else if (left < right) {
        per = left/2/right * 100;
    }
    console.log(per, left, right, left>right);
    document.documentElement.style.setProperty('--percent', `${per}%`);
}

function getColor(img) {
    var vibrant = new Vibrant(img);
    var swatches = vibrant.swatches();
    return swatches["Vibrant"].getHex();
}

function onload() {    
    karmaleft = document.querySelector('.karmaleft');
    karmaright = document.querySelector('.karmaright');
    
    barleft = document.querySelector('.barInner');
    barright = document.querySelector('.bar');

    imgleft = document.querySelector('.left .profileImage');
    imgleft.onload = () => {barleft.style.backgroundColor = getColor(imgleft)};
    imgright = document.querySelector('.right .profileImage');
    imgright.onload = () => {barright.style.backgroundColor = getColor(imgright)};

    init();
}

function init() {
    document.getElementById("leftInput").value = "NendDudes64";
    document.getElementById("rightInput").value = "surtshow";

    document.getElementById("leftInput").onchange();
    document.getElementById("rightInput").onchange();

}

window.update = update;
util.AddOnload(onload);