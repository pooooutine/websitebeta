var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}
// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}
function scrollWin() {
  window.scrollBy(0, 100);
}
window.onload = disableScroll;
setTimeout(enableScroll, 7500);
history.scrollRestoration = "manual";
$(function() {
        $("#myImg").hover(
            function() {
                $(this).attr("src", "hi.gif");
            },
            function() {
                $(this).attr("src", "wave.jpg");
            }                         
        );                  
    });

function bigImg(x) {
  x.style.height = "86px";
  x.style.width = "86px";
}
function normalImg(x) {
  x.style.height = "64px";
  x.style.width = "64px";
}
function freezeGif(img) {
    var width = img.width,
    height = img.height,
    canvas = createElement('canvas', function(clone) {
        clone.width = width;
        clone.height = height;
    }),
    attr,
    i = 0;

    var freeze = function() {
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);

        for (i = 0; i < img.attributes.length; i++) {
            attr = img.attributes[i];

            if (attr.name !== '"') { // test for invalid attributes
                canvas.setAttribute(attr.name, attr.value);
            }
        }

        canvas.style.position = 'absolute';

        img.parentNode.insertBefore(canvas, img);
        img.style.opacity = 0;
    };

    if (img.complete) {
        freeze();
    } else {
        img.addEventListener('load', freeze, true);
    }
}

	