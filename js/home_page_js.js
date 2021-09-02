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

    let top = document.querySelector(event.currentTarget.dataset.href).offsetTop;
    $('body,html').animate({scrollTop: top}, 1000);

}

//------------------------------------size select-------------------------
function sizeSelect(button) {

    let sizeSelectLink = document.getElementById('size_select');

    sizeOfGift = button;
    sessionStorage.setItem('size', sizeOfGift);

    for (let i = 0; i < sizeButtons.length; i++) {
        if (sizeOfGift === sizeButtons[i].dataset.number) {
            sizeButtons[i].classList.add('selected');
            sizeSelectLink.classList.remove('error');
        } else {
            sizeButtons[i].classList.remove('selected');
        }
    }
}

let sizeButtons = document.querySelectorAll('.size_select__button');
let sizeOfGift = '';

// sizeSelect('small');

//-------------------------------------------------------------------------

//--------------------------------select skin of player--------------------

function coverSelect(selectCover) {

    let coverSelectLink = document.getElementById('cover_select');
    let coverSample = document.getElementById('cover_img');

    cover = selectCover;
    sessionStorage.setItem('cover', cover);

    for (let i = 0; i < coverSelectButtons.length; i++) {
        if (cover === coverSelectButtons[i].dataset.cover) {
            coverSample.src = coverSelectButtons[i].dataset.src;
            coverSelectButtons[i].classList.add('selected');
            coverSelectLink.classList.remove('error');
        } else {
            coverSelectButtons[i].classList.remove('selected');
        }
    }
}

let coverSelectButtons = document.querySelectorAll('.cover_select__button');
let cover = '';

// coverSelect('apple');

//------------------------validation size and skin select------------------------

function toNextPage() {

    let sizeSelectLink = document.getElementById('size_select');
    let coverSelectLink = document.getElementById('cover_select');

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

    let top = document.querySelector(href).offsetTop;
    $('body,html').animate({scrollTop: top}, 1000);

}

let continueButton = document.querySelector('.continue__link');
continueButton.addEventListener('click', toNextPage);
