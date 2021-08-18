let imagesArray = document.querySelectorAll('.section_1__slider div');
let positionArray = [0, 250, 500, 750, 1000];
let sliderIndex = 0;


let nextButton = document.querySelector('.section_1__next_btn');
let nextButtonSvg = document.querySelector('.icon_next');
addEventListener('next_slide_button', 'click', nextSlide);

let prevButton = document.querySelector('.section_1__prev_btn');
let prevButtonSvg = document.querySelector('.icon_prev');
addEventListener('prev_slide_button', 'click', prevSlide);


function addEventListener(id, type, functionName) {
    let item = document.getElementById(id);
    item.addEventListener(type, functionName);
}


function setPositionForImg() {
    for (let i = 0; i < imagesArray.length; i++) {
        imagesArray[i].setAttribute('style', `left: ${positionArray[i]}px;`);
    }
}

function nextSlide() {
    prevButton.removeAttribute('disabled');
    prevButtonSvg.classList.remove('icon_prev-disabled')
    sliderIndex += 1;
    if (sliderIndex <= 3) {

        for (let i = 0; i < positionArray.length; i++) {
            positionArray[i] -= 250;
        }
    }
    if (sliderIndex === 3) {
        nextButton.setAttribute('disabled', '');
        nextButtonSvg.classList.add('icon_next-disabled')
    }
    setPositionForImg();
}

function prevSlide() {
    nextButton.removeAttribute('disabled');
    nextButtonSvg.classList.remove('icon_next-disabled');
    if (sliderIndex > 0) {
        sliderIndex -= 1;
        for (let i = 0; i < positionArray.length; i++) {
            positionArray[i] += 250;
        }
    }
    if (sliderIndex === 0){
        prevButton.setAttribute('disabled', '');
        prevButtonSvg.classList.add('icon_prev-disabled');
    }
    setPositionForImg();
}