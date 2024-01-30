const $ball = document.querySelector('.cursor');
const $hoverables = document.querySelectorAll('a, button');
document.body.addEventListener('mousemove', onMouseMove);
for (let i = 0; i < $hoverables.length; i++) {
    $hoverables[i].addEventListener('mouseenter', onMouseHover);
    $hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
}

function onMouseMove(e) {
    TweenMax.to($ball, .1, {
        x: e.pageX - 5,
        y: e.pageY - 7 - window.scrollY
    });
}

// Hover an element
function onMouseHover() {
    TweenMax.to($ball, .25, {
        scale: 3
    });
}

function onMouseHoverOut() {
    TweenMax.to($ball, .3, {
        scale: 1
    });
}
