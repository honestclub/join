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
