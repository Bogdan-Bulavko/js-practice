function slider({currentCounter, slide, next, prew, wrapper, field}) {
    const counter = document.querySelector(currentCounter),
          slides = document.querySelectorAll(slide),
          sliderNext = document.querySelector(next),
          sliderPrew = document.querySelector(prew),
          wrapSlider = document.querySelector(wrapper),
          inner = document.querySelector(field),
          width = window.getComputedStyle(wrapSlider).width;

    let total = document.querySelector("#total");
    let i = 0;
    let offset = 0;

    inner.style.width = 100 * slides.length + `%`;
    inner.style.display = "flex";
    inner.style.transition = '0.5s';

    wrapSlider.style.overflow = "hidden";
    slides.forEach(slide => {
        slide.style.width = width;
    });

    sliderPrew.addEventListener("click", () => {
        if(offset === 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        inner.style.transform = `translateX(-${offset}px)`;

        if(i > 0) {
            i--;
            showCounter();
            activeDot();
        } else if (i === 0) {
            i = slides.length - 1;
            showCounter();
            activeDot();
        }
    });

    sliderNext.addEventListener("click", () => {
        if(offset === +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }

        inner.style.transform = `translateX(-${offset}px)`;

        if(i < slides.length - 1) {
            i++;
            showCounter();
            activeDot();
        } else if (i === slides.length - 1) {
            i = 0;
            showCounter();
            activeDot();
        }
    });

    function activeDot() {
        dots.forEach(dot => {
            dot.style.cssText = 'opacity: 0.5';
        })
        dots[i].style.cssText = 'opacity: 1';
    }


    if(slides.length < 10) {
        total.innerText = `0${slides.length}`;
    } else {
        total.innerText = slides.length;
    }


    function showCounter() {
        if(i + 1 > 9) {
            counter.innerText = i + 1;
        } else {
            counter.innerText = `0${i + 1}`;
        }
    };

    const containerNav = document.createElement("div");

    containerNav.classList.add("carousel-indicators");
    wrapSlider.append(containerNav);

    for(let i = 0; i < slides.length; i++) {
        containerNav.insertAdjacentHTML("afterbegin", `<div class="dot"></div>`);
    };

    wrapSlider.style.position = "relative";
    const dots = document.querySelectorAll(".dot");

    dots[i].style.cssText = 'opacity: 1';

    containerNav.addEventListener("click", e => {
        if(e.target && e.target.className === "dot") {
            dots.forEach((dot, it) => {
                if(e.target === dot) {
                    offset = (it) * +width.slice(0, width.length - 2);
                    inner.style.transform = `translateX(-${offset}px)`;
                    i = it;
                    showCounter();
                    activeDot();
                }
            });
        }
    });
}

export default slider;