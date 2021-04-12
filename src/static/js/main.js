const { gsap, imagesLoaded } = window;

const buttons = {
    prev: document.querySelector(".slider__btn__left"),
    next: document.querySelector(".slider__btn__right"),
};
const cardsContainerEl = document.querySelector(".cards__wrapper");
const cardInfosContainerEl = document.querySelector(".info__wrapper");
const wrapperTopContainerEl = document.querySelector(".wrapper__top");
const currentCardEl = cardsContainerEl.querySelector(".current__card");
const previousCardEl = cardsContainerEl.querySelector(".previous__card");
const nextCardEl = cardsContainerEl.querySelector(".next__card");

buttons.next.addEventListener("click", () => swapCards("right"));

buttons.prev.addEventListener("click", () => swapCards("left"));

window.addEventListener("scroll", () => {
    if (window.pageYOffset > wrapperTopContainerEl.offsetTop) {
        currentCardEl.classList.add("card");
        previousCardEl.classList.add("card");
        nextCardEl.classList.add("card");
    }
});

function swapCards(direction) {
    const currentCardEl = cardsContainerEl.querySelector(".current__card");
    const previousCardEl = cardsContainerEl.querySelector(".previous__card");
    const nextCardEl = cardsContainerEl.querySelector(".next__card");

    changeInfo(direction);
    swapCardsClass();

    removeCardEvents(currentCardEl);

    function swapCardsClass() {
        currentCardEl.classList.remove("current__card");
        previousCardEl.classList.remove("previous__card");
        nextCardEl.classList.remove("next__card");

        currentCardEl.style.zIndex = "50";

        if (direction === "right") {
            previousCardEl.style.zIndex = "20";
            nextCardEl.style.zIndex = "30";

            currentCardEl.classList.add("previous__card");
            previousCardEl.classList.add("next__card");
            nextCardEl.classList.add("current__card");
        } else if (direction === "left") {
            previousCardEl.style.zIndex = "30";
            nextCardEl.style.zIndex = "20";

            currentCardEl.classList.add("next__card");
            previousCardEl.classList.add("current__card");
            nextCardEl.classList.add("previous__card");
        }
    }
}

function changeInfo(direction) {
    let currentInfoEl = cardInfosContainerEl.querySelector(".current__info");
    let previousInfoEl = cardInfosContainerEl.querySelector(".previous__info");
    let nextInfoEl = cardInfosContainerEl.querySelector(".next__info");

    gsap.timeline()
        .to([buttons.prev, buttons.next], {
            duration: 0.2,
            opacity: 0.5,
            pointerEvents: "none",
        })
        .to(
            currentInfoEl.querySelectorAll(".card__text"),
            {
                duration: 0.4,
                stagger: 0.1,
                translateY: "-120px",
                opacity: 0,
            },
            "-="
        )
        .call(() => {
            swapInfosClass(direction);
        })
        .call(() => initCardEvents())
        .fromTo(
            direction === "right"
                ? nextInfoEl.querySelectorAll(".card__text")
                : previousInfoEl.querySelectorAll(".card__text"),
            {
                opacity: 0,
                translateY: "40px",
            },
            {
                duration: 0.4,
                stagger: 0.1,
                translateY: "0px",
                opacity: 1,
            }
        )
        .to([buttons.prev, buttons.next], {
            duration: 0.2,
            opacity: 1,
            pointerEvents: "all",
        });

    function swapInfosClass() {
        currentInfoEl.classList.remove("current__info");
        previousInfoEl.classList.remove("previous__info");
        nextInfoEl.classList.remove("next__info");

        if (direction === "right") {
            currentInfoEl.classList.add("previous__info");
            nextInfoEl.classList.add("current__info");
            previousInfoEl.classList.add("next__info");
        } else if (direction === "left") {
            currentInfoEl.classList.add("next__info");
            nextInfoEl.classList.add("previous__info");
            previousInfoEl.classList.add("current__info");
        }
    }
}

function updateCard(e) {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const centerPosition = {
        x: box.left + box.width / 2,
        y: box.top + box.height / 2,
    };
    let angle = Math.atan2(e.pageX - centerPosition.x, 0) * (35 / Math.PI);
    gsap.set(card, {
        "--current__card-rotation-offset": `${angle}deg`,
    });
    const currentInfoEl = cardInfosContainerEl.querySelector(".current__info");
    gsap.set(currentInfoEl, {
        rotateY: `${angle}deg`,
    });
}

function resetCardTransforms(e) {
    const card = e.currentTarget;
    const currentInfoEl = cardInfosContainerEl.querySelector(".current__info");
    gsap.set(card, {
        "--current__card-rotation-offset": 0,
    });
    gsap.set(currentInfoEl, {
        rotateY: 0,
    });
}

function initCardEvents() {
    const currentCardEl = cardsContainerEl.querySelector(".current__card");
    currentCardEl.addEventListener("pointermove", updateCard);
    currentCardEl.addEventListener("pointerout", (e) => {
        resetCardTransforms(e);
    });
}

initCardEvents();

function removeCardEvents(card) {
    card.removeEventListener("pointermove", updateCard);
}

function init() {

    let tl = gsap.timeline();

    tl.to(cardsContainerEl.children, {
        delay: 0.15,
        duration: 0.5,
        stagger: {
            ease: "power4.inOut",
            from: "right",
            amount: 0.1,
        },
        "--card-translateY-offset": "0%",
    })
        .to(cardInfosContainerEl.querySelector(".current__info").querySelectorAll(".card__text"), {
            delay: 0.5,
            duration: 0.4,
            stagger: 0.1,
            opacity: 1,
            translateY: 0,
        })
        .to(
            [buttons.prev, buttons.next],
            {
                duration: 0.4,
                opacity: 1,
                pointerEvents: "all",
            },
            "-=0.4"
        );
}

init();