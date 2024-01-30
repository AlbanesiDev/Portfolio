const $ball = document.querySelector('.cursor');
const $hoverables = document.querySelectorAll('a, button, input, textarea');

document.body.addEventListener('mousemove', onMouseMove);
document.body.addEventListener('mouseenter', onMouseHover, true);
document.body.addEventListener('mouseleave', onMouseHoverOut, true);

function onMouseMove(e) {
    if (e.target.matches('a, button, input, textarea')) {
        gsap.to($ball, {
            x: e.clientX - 5,
            y: e.clientY - 7 - window.scrollY
        });
    }
}


function onMouseMove(e) {
    gsap.to($ball, {
        duration: .1,
        x: e.pageX - 5,
        y: e.pageY - 7 - window.scrollY
    });
}

// Hover an element
function onMouseHover(e) {
    if (e.target.matches('a, button, input, textarea')) {
        gsap.killTweensOf($ball);
        gsap.to($ball, {
            duration: .25,
            scale: 3
        });
    }
}

function onMouseHoverOut(e) {
    if (e.target.matches('a, button, input, textarea')) {
        gsap.killTweensOf($ball);
        gsap.to($ball, {
            duration: .4,
            scale: 1
        });
    }
}