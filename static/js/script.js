const counter = document.getElementById("value");
const numParticipants = document.getElementById("num_participants").value;

function main() {
    unhideAnimation();
    let pathEls = document.querySelectorAll("path");
    for (let i = 0; i < pathEls.length; i++) {
        let pathEl = pathEls[i];
        let offset = anime.setDashoffset(pathEl);
        pathEl.setAttribute("stroke-dashoffset", offset);
        anime({
            targets: pathEl,
            strokeDashoffset: [offset, 0],
            duration: anime.random(1000, 3000),
            delay: anime.random(0, 2000),
            loop: true,
            direction: "alternate",
            easing: "easeInOutSine",
            autoplay: true
        });
    }
}

function unhideAnimation() {
    document.getElementsByClassName('anim')[0].removeAttribute('hidden')
}

document.addEventListener("DOMContentLoaded", main)


function isElementInViewport(el) {

    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    let rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
}


function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}


function onVisibilityChange(el, callback) {
    let old_visible;
    return function () {
        let visible = isElementInViewport(el);
        if (visible !== old_visible) {
            old_visible = visible;
            if (typeof callback == 'function') {
                callback();
            }
        }
    }
}

let handler = onVisibilityChange(counter, function () {
    animateValue(counter, 0, numParticipants, 3000);
});

function sendMail(subject, element) {
    element.href = `mailto:contact.gtahacks@gmail.com?subject=${subject}`
}


$(window).on('DOMContentLoaded load resize scroll', handler);
