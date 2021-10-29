sessionStorage.setItem('size','');
sessionStorage.setItem('cover','');

//-----------------------------slick slider---------------------------------------

$(function () {
    $('.slider').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: false,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});
//-------------------------------------------------------------------------

//---------------------to order animated movement-------------------------
document.querySelector('.section_1__link').addEventListener('click', scrollToOrder);

function scrollToOrder(event) {

    const top = document.querySelector(event.currentTarget.dataset.href).offsetTop;
    $('body,html').animate({scrollTop: top}, 1000);

}

//------------------------------------size select-------------------------
function sizeSelect(event) {

    const button = event.currentTarget.dataset.number;
    const sizeSelectLink = document.getElementById('size_select');
    const sizeButtons = document.querySelectorAll('.size_select__button');

    sessionStorage.setItem('size', button);

    sizeButtons.forEach((element)=>{
        if (button === element.dataset.number) {
            element.classList.add('selected');
            sizeSelectLink.classList.remove('error');
        } else {
            element.classList.remove('selected');
        }
    });
}

addEventListenerToElements('.size_select__button',sizeSelect,'click');

// sizeSelect('small');

//-------------------------------------------------------------------------

//--------------------------------select skin of player--------------------

function coverSelect(event) {
    const selectCover = event.currentTarget.dataset.cover;
    const coverSelectLink = document.getElementById('cover_select');
    const coverSample = document.getElementById('cover_img');
    const coverSelectButtons = document.querySelectorAll('.cover_select__button');

    sessionStorage.setItem('cover', selectCover);

    coverSelectButtons.forEach((element)=>{
        if (selectCover === element.dataset.cover) {
            coverSample.src = element.dataset.src;
            element.classList.add('selected');
            coverSelectLink.classList.remove('error');
        } else {
            element.classList.remove('selected');
        }
    })
}

addEventListenerToElements('.cover_select__button',coverSelect,'click');

// coverSelect('apple');

//------------------------validation size and skin select------------------------

function toNextPage() {

    const sizeOfGift = sessionStorage.getItem('size');
    const cover = sessionStorage.getItem('cover');
    const continueButton = document.querySelector('.continue__link');
    const sizeSelectLink = document.getElementById('size_select');
    const coverSelectLink = document.getElementById('cover_select');

    if (sizeOfGift !== '' && cover !== '') {
        continueButton.setAttribute('href', 'order.html');
    } else if (sizeOfGift === '') {
        sizeSelectLink.classList.add('error');
        scrollToAnchor('.size_select');
    } else if (cover === '') {
        coverSelectLink.classList.add('error');
        scrollToAnchor('.cover_select');
    }
}

function scrollToAnchor(href) {

    const top = document.querySelector(href).offsetTop;
    $('body,html').animate({scrollTop: top}, 1000);

}


addEventListenerToElements('.continue__link',toNextPage,'click');

function addEventListenerToElements (elementsClass,functionName,typeOfListener='click') {

    const elements = document.querySelectorAll(elementsClass);

    if (elements.length > 1) {
        elements.forEach((element) => {
            element.addEventListener(typeOfListener, functionName);
        })
    }else {
        document.querySelector(elementsClass).addEventListener('click', functionName);
    }
}

