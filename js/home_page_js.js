//------------------------------------size select-------------------------
function sizeSelect(button) {

    let sizeSelectLink = document.getElementById('size_select');

    sizeOfGift = button;
    sessionStorage.setItem('size', sizeOfGift);

    for (let i = 0; i < sizeButtons.length; i++) {
        if (sizeOfGift === sizeButtons[i].dataset.number){
            sizeButtons[i].classList.add('selected');
            sizeSelectLink.classList.remove('error');
        } else {
            sizeButtons[i].classList.remove('selected');
        }
    }
}

let sizeButtons = document.querySelectorAll('.size_select__button');
let sizeOfGift = '';

//-------------------------------------------------------------------------

//--------------------------------select skin of player--------------------

function coverSelect(selectCover) {

    let coverSelectLink = document.getElementById('cover_select');
    let coverSample = document.getElementById('cover_img');

    cover = selectCover;
    sessionStorage.setItem('cover', cover);

    for (let i = 0; i < coverSelectButtons.length; i++) {
        if(cover === coverSelectButtons[i].dataset.cover){
            coverSample.src = coverSelectButtons[i].dataset.src;
            coverSelectButtons[i].classList.add('selected');
            coverSelectLink.classList.remove('error');
        }else {
            coverSelectButtons[i].classList.remove('selected');
        }
    }
}

let coverSelectButtons = document.querySelectorAll('.cover_select__button');
let cover = 'apple';

coverSelect('apple');

//------------------------validation size and skin select------------------------

function toNextPage() {

    let sizeSelectLink = document.getElementById('size_select');
    let coverSelectLink = document.getElementById('cover_select');

    if (sizeOfGift !== ''&& cover !== '') {
        continueButton.setAttribute('href','order.html');
    }else if (sizeOfGift === '') {
        sizeSelectLink.classList.add('error');
        continueButton.setAttribute('href','#size_select');
    }else if (cover === ''){
        coverSelectLink.classList.add('error');
        continueButton.setAttribute('href','#cover_select');
    }
}

let continueButton = document.querySelector('.continue__link');
continueButton.addEventListener('click', toNextPage);
