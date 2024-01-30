const $ball = document.querySelector('.cursor');
const linkCursor = document.querySelector('.cursor-link');
const sizeCursor = document.querySelector('.cursor-size');

document.body.addEventListener('mousemove', onMouseMove);
document.body.addEventListener('mouseenter', onMouseHover, true);
document.body.addEventListener('mouseleave', onMouseHoverOut, true);

document.body.addEventListener('mouseenter', function(e) {
    const imgHover = e.target.closest('.img-hover');
    if (imgHover) {
        onMouseHover(e, imgHover);
    }
}, true);

document.body.addEventListener('mouseleave', function(e) {
    const imgHover = e.target.closest('.img-hover');
    if (imgHover) {
        onMouseHoverOut(e, imgHover);
    }
}, true);

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

function onMouseHover(e, imgHover) {
    if (e.target.matches('button, input, textarea')) {
        gsap.killTweensOf($ball);
        gsap.to($ball, {
            duration: .25,
            scale: 2
        });
    } else if (e.target.matches('a')) {
        gsap.killTweensOf($ball);
        gsap.to($ball, {
            duration: .25,
            scale: 3
        });
        linkCursor.style.opacity = 1;
    } else if (imgHover) {
        gsap.killTweensOf($ball);
        gsap.to($ball, {
            duration: .25,
            scale: 4
        });
        sizeCursor.style.opacity = 1;
    }
}

function onMouseHoverOut(e, imgHover) {
    if (e.target.matches('button, input, textarea')) {
        gsap.killTweensOf($ball);
        gsap.to($ball, {
            duration: .25,
            scale: 1
        });
    } else if (e.target.matches('a')) {
        gsap.killTweensOf($ball);
        gsap.to($ball, {
            duration: .25,
            scale: 1
        });
        linkCursor.style.opacity = 0;
    } else if (imgHover) {
        gsap.killTweensOf($ball);
        gsap.to($ball, {
            duration: .25,
            scale: 1
        });
        sizeCursor.style.opacity = 0;
    }
}