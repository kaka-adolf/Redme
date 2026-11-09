/* =========================================================
   MARDA.6045
   3D INTERACTION
========================================================= */


const card =
    document.getElementById("card");

const cursorLight =
    document.querySelector(".cursor-light");

const backgroundPhoto =
    document.querySelector(".background-photo");

const snapButton =
    document.querySelector(".snap-button");


/* =========================================================
   DESKTOP 3D EFFECT
========================================================= */

const isDesktop =
    window.matchMedia(
        "(min-width: 701px)"
    ).matches;


if (isDesktop) {

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;


    /* =====================================================
       CURSOR LIGHT
    ====================================================== */

    document.addEventListener(
        "mousemove",
        (event) => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;

        }
    );


    function animateCursor() {

        currentX +=
            (mouseX - currentX) * 0.12;

        currentY +=
            (mouseY - currentY) * 0.12;


        cursorLight.style.left =
            currentX + "px";

        cursorLight.style.top =
            currentY + "px";


        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();


    /* =====================================================
       CARD 3D
    ====================================================== */

    document.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                card.getBoundingClientRect();


            const centerX =
                rect.left +
                rect.width / 2;


            const centerY =
                rect.top +
                rect.height / 2;


            const mouseRelativeX =
                event.clientX -
                centerX;


            const mouseRelativeY =
                event.clientY -
                centerY;


            const rotateY =
                mouseRelativeX / 45;


            const rotateX =
                -mouseRelativeY / 45;


            card.style.transform = `

                perspective(1300px)

                rotateX(${rotateX}deg)

                rotateY(${rotateY}deg)

            `;


            /* =================================================
               BACKGROUND PARALLAX
            ================================================== */

            const x =
                (
                    event.clientX /
                    window.innerWidth -
                    0.5
                ) * 15;


            const y =
                (
                    event.clientY /
                    window.innerHeight -
                    0.5
                ) * 10;


            backgroundPhoto.style.transform = `

                scale(1.08)

                translate(
                    ${x}px,
                    ${y}px
                )

            `;

        }
    );


    /* =====================================================
       RESET
    ====================================================== */

    document.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = `
                perspective(1300px)
                rotateX(0deg)
                rotateY(0deg)
            `;

            backgroundPhoto.style.transform =
                "scale(1.05)";

        }
    );

}


/* =========================================================
   MOBILE 3D TOUCH
========================================================= */

if (!isDesktop) {

    document.addEventListener(
        "touchmove",
        (event) => {

            const touch =
                event.touches[0];

            if (!touch) return;


            const x =
                touch.clientX /
                window.innerWidth;


            const y =
                touch.clientY /
                window.innerHeight;


            const rotateY =
                (x - 0.5) * 6;


            const rotateX =
                (0.5 - y) * 6;


            card.style.transform = `

                perspective(900px)

                rotateX(${rotateX}deg)

                rotateY(${rotateY}deg)

            `;


            const backgroundX =
                (x - 0.5) * 7;


            const backgroundY =
                (y - 0.5) * 5;


            backgroundPhoto.style.transform = `

                scale(1.07)

                translate(
                    ${backgroundX}px,
                    ${backgroundY}px
                )

            `;

        },

        {
            passive: true
        }
    );


    document.addEventListener(
        "touchend",
        () => {

            card.style.transform = `

                perspective(900px)

                rotateX(0deg)

                rotateY(0deg)

            `;


            backgroundPhoto.style.transform =
                "scale(1.05)";

        }
    );

}


/* =========================================================
   BUTTON RIPPLE
========================================================= */

if (snapButton) {

    snapButton.addEventListener(
        "pointerdown",
        (event) => {

            const ripple =
                document.createElement("span");


            ripple.style.position =
                "absolute";

            ripple.style.left =
                event.offsetX + "px";

            ripple.style.top =
                event.offsetY + "px";

            ripple.style.width =
                "10px";

            ripple.style.height =
                "10px";

            ripple.style.borderRadius =
                "50%";

            ripple.style.background =
                "rgba(255,255,255,0.3)";

            ripple.style.pointerEvents =
                "none";

            ripple.style.transform =
                "translate(-50%, -50%) scale(1)";

            ripple.style.transition =
                "transform .7s ease, opacity .7s ease";


            snapButton.appendChild(
                ripple
            );


            requestAnimationFrame(
                () => {

                    ripple.style.transform =
                        "translate(-50%, -50%) scale(25)";

                    ripple.style.opacity =
                        "0";

                }
            );


            setTimeout(
                () => {

                    ripple.remove();

                },
                750
            );

        }
    );

}


/* =========================================================
   RANDOM PARTICLE SPEED
========================================================= */

const stars =
    document.querySelectorAll(
        ".stars span"
    );


stars.forEach(
    (star) => {

        const duration =
            5 +
            Math.random() * 6;

        const delay =
            Math.random() * 8;


        star.style.animationDuration =
            duration + "s";

        star.style.animationDelay =
            delay + "s";

    }
);


/* =========================================================
   VISIBILITY
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        const state =
            document.hidden
                ? "paused"
                : "running";


        stars.forEach(
            (star) => {

                star.style.animationPlayState =
                    state;

            }
        );

    }
);


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "%c MARDA.6045 ",
    `
        background:#fffc00;
        color:#000;
        padding:8px 16px;
        border-radius:8px;
        font-weight:900;
    `
);

console.log(
    "Snapchat: marda.6045"
);