const menuButton = document.getElementById("menuButton");
const mainNav = document.getElementById("mainNav");

if (menuButton && mainNav) {

    menuButton.addEventListener("click", () => {

        mainNav.classList.toggle("open");

        const isOpen = mainNav.classList.contains("open");

        menuButton.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });


    const navLinks = mainNav.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


const topbar = document.getElementById("topbar");

function updateHeader() {

    if (!topbar) {
        return;
    }

    if (window.scrollY > 20) {
        topbar.classList.add("scrolled");
    } else {
        topbar.classList.remove("scrolled");
    }

}

window.addEventListener("scroll", updateHeader);

updateHeader();


const revealElements = document.querySelectorAll(
    ".flow-node, .lesson-section, .variable-section, " +
    ".decision-layout, .loops-section, .functions-section, " +
    ".array-section, .forms-section, .reference-section, " +
    ".lab-section"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});


if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    document
        .querySelectorAll(".reveal")
        .forEach(element => {
            revealObserver.observe(element);
        });

} else {

    document
        .querySelectorAll(".reveal")
        .forEach(element => {
            element.classList.add("visible");
        });

}


document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        const headerHeight =
            topbar ? topbar.offsetHeight : 70;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

    });

});


const sections = document.querySelectorAll(
    "main section[id]"
);

const navigationLinks = document.querySelectorAll(
    ".main-nav a"
);

function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection =
                section.getAttribute("id");
        }

    });

    navigationLinks.forEach(link => {

        const href =
            link.getAttribute("href");

        link.classList.remove("active");

        if (href === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveNavigation
);

updateActiveNavigation();


const fakeFormButton =
    document.querySelector(".fake-form button");

const fakeInput =
    document.querySelector(".fake-input");

if (fakeFormButton && fakeInput) {

    fakeFormButton.addEventListener("click", () => {

        const originalText =
            fakeFormButton.textContent;

        fakeFormButton.textContent =
            "Submitted ✓";

        fakeInput.style.borderColor =
            "#FF7A00";

        setTimeout(() => {

            fakeFormButton.textContent =
                originalText;

            fakeInput.style.borderColor =
                "";

        }, 1600);

    });

}

const codeBlocks =
    document.querySelectorAll(
        ".code-content, .code-strip, " +
        ".function-code, .array-code, .form-code"
    );

codeBlocks.forEach(block => {

    block.addEventListener("dblclick", async () => {

        const pre = block.querySelector("pre");

        if (!pre) {
            return;
        }

        try {

            await navigator.clipboard.writeText(
                pre.innerText
            );

            showCopyMessage(block);

        } catch (error) {

            console.log(
                "Copy was not available."
            );

        }

    });

});


function showCopyMessage(parent) {

    const existing =
        parent.querySelector(".copy-message");

    if (existing) {
        existing.remove();
    }

    const message =
        document.createElement("span");

    message.className = "copy-message";

    message.textContent =
        "Copied";

    message.style.position = "absolute";
    message.style.top = "12px";
    message.style.right = "15px";
    message.style.padding = "6px 9px";
    message.style.background = "#FF7A00";
    message.style.color = "#FFFFFF";
    message.style.fontFamily = "DM Mono, monospace";
    message.style.fontSize = "9px";
    message.style.zIndex = "20";

    if (
        getComputedStyle(parent).position === "static"
    ) {
        parent.style.position = "relative";
    }

    parent.appendChild(message);

    setTimeout(() => {

        message.style.opacity = "0";

        message.style.transition =
            "opacity 0.25s ease";

        setTimeout(() => {
            message.remove();
        }, 250);

    }, 1000);

}

const orbitItems =
    document.querySelectorAll(".loop-orbit");

let orbitAngle = 0;

function animateOrbit() {

    if (orbitItems.length === 0) {
        return;
    }

    orbitAngle += 0.15;

    const radius = 105;

    const positions = [
        orbitAngle,
        orbitAngle + 120,
        orbitAngle + 240
    ];

    orbitItems.forEach((item, index) => {

        const angle =
            positions[index] *
            Math.PI /
            180;

        const x =
            Math.cos(angle) *
            radius;

        const y =
            Math.sin(angle) *
            radius;

        item.style.transform =
            `translate(${x}px, ${y}px)`;

    });

    requestAnimationFrame(animateOrbit);

}

if (orbitItems.length > 0) {
    animateOrbit();
}

const footerCopyright =
    document.querySelector(".footer-copy");

if (footerCopyright) {

    footerCopyright.textContent =
        "© Joana Marie Guibao: PHP//PULSE";

}

document.addEventListener(
    "DOMContentLoaded",
    () => {

        document.body.classList.add(
            "page-loaded"
        );

    }
);