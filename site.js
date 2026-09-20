/* Shared behavior for every Honest Club page:
   hero background fade-in, image fade-in, scroll reveals. */
// Trigger hero background fade-in once everything's in
requestAnimationFrame(function () {
    document.body.classList.add("loaded");
});

// Image fade-in on load (the stacked about-photo faces manage
// their own opacity for the easter egg)
document.querySelectorAll("img:not(.about-face)").forEach(function (img) {
    img.classList.add("img-fade");
    if (img.complete && img.naturalHeight !== 0) {
        img.classList.add("loaded");
    } else {
        img.addEventListener(
            "load",
            function () {
                img.classList.add("loaded");
            },
            { once: true }
        );
        img.addEventListener(
            "error",
            function () {
                img.classList.add("loaded");
            },
            { once: true }
        );
    }
});

// Scroll-triggered reveals
var revealObserver = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
    }
);

document
    .querySelectorAll(".reveal, .reveal-stagger")
    .forEach(function (el) {
        revealObserver.observe(el);
    });

// Whole-card tap target. The CSS stretches each card's link over the
// card where :has() is supported; this covers browsers that lack it,
// so tapping the card body always follows the same link.
document.addEventListener("click", function (event) {
    if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
    ) {
        return;
    }
    if (event.target.closest("a, button, input, textarea, select, label")) {
        return;
    }
    var card = event.target.closest(".package-card, .ideal-card, .offer-wide");
    if (!card) return;
    var link = card.querySelector(".btn-card, .card-link");
    if (!link) return;
    var selection = window.getSelection && window.getSelection();
    if (selection && selection.type === "Range" && String(selection).length) {
        return;
    }
    link.click();
});

// Quote cards. The row already scrolls on its own (CSS scroll-snap); this
// adds the arrow buttons, moves one card per press, and fades an arrow
// out when there is nothing further that way. It also advances a card at
// a time on its own while on screen, holds while hovered or focused, and
// stops for good once the visitor scrolls or presses anything themselves.
document.querySelectorAll(".quotes").forEach(function (root) {
    var track = root.querySelector(".quotes-track");
    var controls = root.querySelector(".quotes-controls");
    var prev = root.querySelector("[data-quotes-prev]");
    var next = root.querySelector("[data-quotes-next]");
    if (!track || !controls || !prev || !next) return;

    var reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    function update() {
        var max = track.scrollWidth - track.clientWidth;
        controls.hidden = max <= 2;
        prev.setAttribute("aria-disabled", String(track.scrollLeft <= 2));
        next.setAttribute("aria-disabled", String(track.scrollLeft >= max - 2));
    }

    function move(direction) {
        var cards = track.children;
        if (cards.length < 2) return;
        var step = cards[1].offsetLeft - cards[0].offsetLeft;
        track.scrollBy({
            left: direction * step,
            behavior: reduceMotion ? "auto" : "smooth",
        });
    }

    var HOLD = 3500; // time between automatic moves (ms)
    var timer = null;
    var inView = false;
    var held = false;
    var stopped = reduceMotion;

    function schedule() {
        clearInterval(timer);
        timer = null;
        if (stopped || held || !inView) return;
        timer = setInterval(function () {
            var max = track.scrollWidth - track.clientWidth;
            if (max <= 2) return;
            if (track.scrollLeft >= max - 2) {
                track.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                move(1);
            }
        }, HOLD);
    }

    function stop() {
        if (stopped) return;
        stopped = true;
        schedule();
    }

    function hold(state) {
        return function () {
            held = state;
            schedule();
        };
    }

    prev.addEventListener("click", function () {
        stop();
        move(-1);
    });
    next.addEventListener("click", function () {
        stop();
        move(1);
    });
    // Only a sideways gesture counts as taking over. A vertical swipe or
    // wheel that happens to start on a card is just the page scrolling.
    var touchX = 0;
    var touchY = 0;
    track.addEventListener(
        "touchstart",
        function (event) {
            touchX = event.touches[0].clientX;
            touchY = event.touches[0].clientY;
        },
        { passive: true }
    );
    track.addEventListener(
        "touchmove",
        function (event) {
            var dx = Math.abs(event.touches[0].clientX - touchX);
            var dy = Math.abs(event.touches[0].clientY - touchY);
            if (dx > 10 && dx > dy) stop();
        },
        { passive: true }
    );
    track.addEventListener(
        "wheel",
        function (event) {
            if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) stop();
        },
        { passive: true }
    );
    track.addEventListener("keydown", function (event) {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") stop();
    });
    root.addEventListener("mouseenter", hold(true));
    root.addEventListener("mouseleave", hold(false));
    root.addEventListener("focusin", hold(true));
    root.addEventListener("focusout", hold(false));
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    new IntersectionObserver(
        function (entries) {
            inView = entries[0].isIntersecting;
            schedule();
        },
        { threshold: 0.5 }
    ).observe(root);
});
