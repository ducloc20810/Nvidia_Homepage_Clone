const sliderDiv = document.querySelector(".slider");
const sliders = document.querySelectorAll(".slider__inner");
let activeSlide = document.querySelector(".slider__inner--active");

const pages = document.querySelectorAll(".slider__paginate li");

let activePage = document.querySelector(".active-page");

//Slide handle
function changeSlide(index) {
    clearInterval(autoTime);
    activeSlide.classList.remove("slider__inner--active");
    activeSlide = sliders[index];
    sliders[index].classList.add("slider__inner--active");

    activePage.classList.remove("active-page");
    activePage = pages[index];
    pages[index].classList.add("active-page");
    autoTime = setInterval(() => {
        autoChangeSlide();
    }, 6000);
}

Array.from(pages).forEach(
    (page, index) =>
        (page.onclick = function () {

            changeSlide(index);

        })
);

function autoChangeSlide(opt = "forward") {
    let activeIndex = Array.from(pages).findIndex((page) => page === activePage);

    if (opt === "forward") {
        if (activeIndex === 4) {
            changeSlide(0);
        } else {
            changeSlide(activeIndex + 1);
        }
    } else if (opt === "backward") {
        if (activeIndex === 0) {
            changeSlide(4);
        } else {
            changeSlide(activeIndex - 1);
        }
    }
}

let autoTime = setInterval(() => {
    autoChangeSlide();
}, 6000);


//Handle swipe
sliderDiv.addEventListener('touchstart', handleTouchStart, false);
sliderDiv.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;
let yDown = null;

function getTouches(evt) {
    return evt.touches;          // browser API

}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff))
        //Horizontal swipe
    {/*most significant*/
        if (xDiff > 0) {
            /* right to left swipe */
            autoChangeSlide();

        } else {
            /* left to right swipe */
            autoChangeSlide("backward");


        }
    } else
        //Verical swipe
    {
        if (yDiff > 0) {
            /* down swipe */
        } else {
            /* up swipe */
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
}


// Handle list scroll
const list = document.querySelectorAll(".section__list-container ul");
const item = document.querySelector(".card");
const btnLefts = document.querySelectorAll(".btn-left");
const btnRights = document.querySelectorAll(".btn-right");

console.log(list);
console.log(btnLefts);
console.log(btnRights);

Array.from(btnLefts).forEach((btn, index) => {
    btn.onclick = function () {
        scrollToRight(index);
    };
});

Array.from(btnRights).forEach((btn, index) => {
    btn.onclick = function () {
        scrollToLeft(index);
    };
});

function scrollToLeft(index) {
    const leftOffSet = list[index].scrollLeft;

    const maxScrollWidth = list[index].scrollWidth;

    const listWidth = list[index].clientWidth;

    const items = list[index].querySelectorAll(".card");
    let activeItem = list[index].querySelector(".card.active");
    const activeIndex = Array.from(items).findIndex(item => item === activeItem);
    activeItem.classList.remove("active");
    activeItem = items[activeIndex + 1];

    activeItem.classList.add("active");


    const newLeftOffSet = activeItem.offsetLeft;


    if (leftOffSet < maxScrollWidth - listWidth) {
        btnLefts[index].classList.remove("hide");
    }

    list[index].scroll({
        left: newLeftOffSet,
        behavior: "smooth",
    });

    if (newLeftOffSet >= maxScrollWidth - listWidth) {
        btnRights[index].classList.add("hide");
    }
}

function scrollToRight(index) {
    const leftOffSet = list[index].scrollLeft;

    const items = list[index].querySelectorAll(".card");
    let activeItem = list[index].querySelector(".card.active");
    const activeIndex = Array.from(items).findIndex(item => item === activeItem);
    activeItem.classList.remove("active");
    activeItem = items[activeIndex - 1];
    activeItem.classList.add("active");


    const newLeftOffSet = activeIndex === 1 ? 0 : activeItem.offsetLeft;

    if (leftOffSet > 0) {
        btnRights[index].classList.remove("hide");
    }

    list[index].scroll({
        left: newLeftOffSet,
        behavior: "smooth",
    });

    if (newLeftOffSet <= 0) {
        btnLefts[index].classList.add("hide");
    }
}

// Handle mobile header

// Search
const layout = document.querySelector(".layout");
const searchDivs = document.querySelectorAll(".search__input");
const searchBtns = document.querySelectorAll(".search-btn");
const closeSearchBtns = document.querySelectorAll(".close-search-btn");
const searchLinks = document.querySelectorAll(".search");

Array.from(searchBtns).forEach(
    (btn, index) =>
        (btn.onclick = function openSearch() {
            closeNavSide();
            searchLinks[index].classList.add("search--open");
            searchDivs[index].classList.remove("hide");
            closeSearchBtns[index].classList.remove("hide");
            btn.classList.add("hide");
            layout.classList.remove("hide");
        })
);

function closeSearch(index) {
    searchLinks[index].classList.remove("search--open");
    searchDivs[index].classList.add("hide");
    closeSearchBtns[index].classList.add("hide");
    searchBtns[index].classList.remove("hide");
    layout.classList.add("hide");
}

Array.from(closeSearchBtns).forEach((btn, index) => {
    btn.onclick = function () {
        closeSearch(index);
    };
});

layout.addEventListener("click", function () {
    closeSearch(0);
    closeSearch(1);

    closeNavSide();
});

// Nav
const navBtn = document.querySelector("#navbar-btn");
const navSide = document.querySelector(".navbar__side");
const closeNavBtn = document.querySelector(".close-navbar-side");

navBtn.addEventListener("click", function openNav() {
    closeSearch(0);
    closeSearch(1);
    closeNavBtn.classList.remove("hide");
    layout.classList.remove("hide");
    navSide.classList.add("navbar__side--open");
    navBtn.classList.add("hide");
});

function closeNavSide() {
    closeNavBtn.classList.add("hide");
    layout.classList.add("hide");
    navSide.classList.remove("navbar__side--open");
    navBtn.classList.remove("hide");
}

closeNavBtn.addEventListener("click", closeNavSide);
