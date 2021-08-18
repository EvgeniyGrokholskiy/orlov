function addEventListener(className,listenerType,functionName){
    let el = document.querySelectorAll(className);

    for (let i = 0; i < el.length; i++) {
        el[i].addEventListener(listenerType, functionName);
    }
}

function sizeSelect(e) {
    sizeOfGift = e.target.dataset.number;
    sessionStorage.setItem('size', sizeOfGift);

    for (let i = 0; i < sizeButtons.length; i++) {
        if (sizeOfGift === sizeButtons[i].dataset.number){
            sizeButtons[i].classList.add('selected');
        } else {
            sizeButtons[i].classList.remove('selected');
        }
    }
}

function coverSelect(e) {
    cover = e.target.dataset.cover;
    sessionStorage.setItem('cover', cover);
    console.log(e.target.dataset.src);

    for (let i = 0; i < coverSelectButtons.length; i++) {
        if(cover === coverSelectButtons[i].dataset.cover){
            coverSelectButtons[i].classList.add('selected');
        }else {
            coverSelectButtons[i].classList.remove('selected');
        }
    }
}

let sizeButtons = document.querySelectorAll('.size_select__button');
let sizeOfGift = '';

addEventListener('.size_select__button', 'click', sizeSelect);


let coverSelectButtons = document.querySelectorAll('.cover_select__button');
let cover = '';

addEventListener('.cover_select__button', 'click', coverSelect);

function toNextPage() {
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
let coverSelectLink = document.getElementById('cover_select');
let sizeSelectLink = document.getElementById('size_select');
continueButton.addEventListener('click', toNextPage);
