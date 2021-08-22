let imagesArray = document.querySelectorAll('.section_1__slider div');
let positionArray = [0, 50, 100, 150, 200];
let sliderIndex = 0;


let nextButton = document.querySelector('.section_1__next_btn');
let nextButtonSvg = document.querySelector('.icon_next');
addEventListener('next_slide_button', 'click', nextSlide);

let prevButton = document.querySelector('.section_1__prev_btn');
let prevButtonSvg = document.querySelector('.icon_prev');
addEventListener('prev_slide_button', 'click', prevSlide);


function addEventListener(id, type, functionName) {
    document.getElementById(id).addEventListener(type, functionName);
}


function setPositionForImg() {
    for (let i = 0; i < imagesArray.length; i++) {
        imagesArray[i].setAttribute('style', 'left: '+positionArray[i]+'%;');
    }
}


function nextSlide() {
    prevButton.removeAttribute('disabled');
    prevButtonSvg.setAttribute('style', 'fill: black');
    sliderIndex += 1;
    if (sliderIndex <= 3) {

        for (let i = 0; i < positionArray.length; i++) {
            positionArray[i] -= 50;
        }
    }
    if (sliderIndex === 3) {
        nextButton.setAttribute('disabled', '');
        nextButtonSvg.setAttribute('style', 'fill: gray');
    }
    setPositionForImg();
}

function prevSlide() {
    nextButton.removeAttribute('disabled');
    nextButtonSvg.setAttribute('style', 'fill: black');
    if (sliderIndex > 0) {
        sliderIndex -= 1;
        for (let i = 0; i < positionArray.length; i++) {
            positionArray[i] += 50;
        }
    }
    if (sliderIndex === 0){
        prevButton.setAttribute('disabled', '');
        prevButtonSvg.setAttribute('style', 'fill: gray');
    }
    setPositionForImg();
}