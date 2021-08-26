;
//--------------------get data from homepage-----------------------------

let size = sessionStorage.getItem('size'); //data from home-page: size of glass

let cover = sessionStorage.getItem('cover'); //data from home-page: player skin

//------------------------------------------------------------


//------------show skin of player------------------------------

let skinImg = document.getElementById('player_theme');

function showSkin() {
    let textBlock = document.querySelector('.order_construction__user_text');
    let trackNameSpan = document.getElementById('track_name_span');
    let performerSpan = document.getElementById('performer_name_span');
    let lowerTextSpan = document.getElementById('lower_text_span');
    let prefix;

    if (cover === 'apple') {
        skinImg.src = 'img/apple_w_o_text.jpg';
        prefix = 'apple';
    } else if (cover === 'spotify') {
        skinImg.src = 'img/spotify_w_o_text.jpg';
        prefix = 'spotify';
    } else if (cover === 'vkMusic') {
        skinImg.src = 'img/vk_w_o_text.jpg';
        prefix = 'vk'
    }

    textBlock.classList.add('order_construction__user_text-' + prefix);
    trackNameSpan.classList.add('user_text-track-' + prefix);
    performerSpan.classList.add('user_text-performer-' + prefix);
    lowerTextSpan.classList.add('user_text-lower-' + prefix);
}

showSkin();

//------------working with uploaded image--------------------

let uploadFileURL;
let imgTest = document.getElementById('upload_file_miniature_img')
let imgInCover = document.getElementById('user_image');
let file;

//let userImgBackground = document.querySelector('.order_construction__user_img');

function readFile(input) {

    file = input.files[0];

    //let reader = new FileReader();

    //reader.readAsBinaryString(file);

    uploadFileURL = URL.createObjectURL(file);

    imgTest.src = uploadFileURL;
    imgInCover.src = uploadFileURL;

    let top = document.getElementById('player_theme').offsetTop + 100; //Getting Y of target element


    $('body,html').animate({scrollTop: top}, 1500); //Animated movement to target element


    //window.location.hash="player_theme";
    //userImgBackground.setAttribute('style',`background-image: url("${uploadFileURL}");`);

}

//------------------------------------------------------------------

//------------------Text on player cover-----------------------------------------

let userTrackNameSpan = document.getElementById('track_name_span');
let userTrackNameInput = document.getElementById('track_name');
let userPerformerNameSpan = document.getElementById('performer_name_span');
let userPerformerNameInput = document.getElementById('performer_name');
let userLowerTextSpan = document.getElementById('lower_text_span');
let userLowerTextInput = document.getElementById('addition_text_input');
let checkbox = document.getElementById('addition_text');
checkbox.onclick = onOffLowerText;

function onOffLowerText() {
    if (checkbox.checked) {
        userLowerTextInput.attributes.removeNamedItem('disabled');
    } else {
        userLowerTextInput.setAttribute('disabled', '');
        userLowerTextInput.value = '';
        userLowerTextSpan.innerText = '';
    }
}

userTrackNameInput.oninput = changeText;
userPerformerNameInput.oninput = changeText;
userLowerTextInput.oninput = changeText;


function changeText() {

    let trackNameLabel = document.getElementById('input_for_track_name');
    let performerLabel = document.getElementById('input_for_performer_name');

    if (userTrackNameInput.value === '') {
        userTrackNameSpan.innerText = 'Название трека';
    } else {
        userTrackNameSpan.innerText = userTrackNameInput.value;
        trackNameLabel.classList.remove('error');
        trackNameLabel.textContent = 'Название трека';
    }
    if (userPerformerNameInput.value === '') {
        userPerformerNameSpan.innerText = 'Исполнитель';
    } else {
        userPerformerNameSpan.innerText = userPerformerNameInput.value;
        performerLabel.classList.remove('error');
        performerLabel.textContent = 'Исполнитель';
    }
    userLowerTextSpan.innerText = userLowerTextInput.value;
}

//-------------------------------------------------------------------------------

//-----------------------------changing uploaded image----------------------------

//----------------------scaling image---------------------------------------------

function scaling(id) {
    if (id === 'increase') {
        magnificationRatio += 5;
        uploadedFileMiniature.style.height = magnificationRatio + '%';
        imgInCover.style.height = magnificationRatio + '%';
    } else if (id === 'reduction') {
        magnificationRatio -= 5;
        uploadedFileMiniature.style.height = magnificationRatio + '%';
        imgInCover.style.height = magnificationRatio + '%';
    }
    document.getElementById('magnification').value = magnificationRatio;
}

let uploadedFileMiniature = document.getElementById('upload_file_miniature_img');
let magnificationRatio = 100;

//---------------------------moving image----------------------------------------

function addListenerToMoveButtons() {
    let buttons = document.querySelectorAll('.move_button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', moveImg);
    }
}

let positionTop = 0;
let positionLeft = 0;

function moveImg(event) {

    let button = event.target.id;

    if (button === 'right') {
        positionLeft += 5;
    } else if (button === 'left') {
        positionLeft -= 5;
    } else if (button === 'up') {
        positionTop -= 5;
    } else if (button === 'down') {
        positionTop += 5;
    }

    uploadedFileMiniature.style.top = positionTop + 'px';
    uploadedFileMiniature.style.left = positionLeft + 'px';
    imgInCover.style.top = positionTop + 'px';
    imgInCover.style.left = positionLeft + 'px';
    document.getElementById('pos_y').value = positionTop;
    document.getElementById('pos_x').value = positionLeft;
}

addListenerToMoveButtons();

//---------------------------------------------------price calculate------------------------

function listenerToInputOption() {
    for (let i = 0; i < optionInputs.length; i++) {
        optionInputs[i].onchange = priceChange;
    }
}

function priceChange() {

    let showPrice = document.querySelector('.price__js');
    let showPriceMobile = document.querySelector('.price_for_mobile');
    optionPrice = 0

    if (size === 'small') {
        price = 990;
    } else if (size === 'medium') {
        price = 1490;
    } else if (size === 'large') {
        price = 3990;
    } else if (size === 'trinket') {
        price = 490;
    }

    for (let i = 0; i < optionInputs.length; i++) {
        if (optionInputs[i].checked) {
            optionPriceArray[i] = optionInputs[i].dataset.price;
        } else {
            optionPriceArray[i] = '0';
        }
    }

    for (let i = 0; i < optionPriceArray.length; i++) {
        optionPrice += +optionPriceArray[i];
    }
    showPrice.textContent = +price + +optionPrice;//price on page
    showPriceMobile.textContent = 'Итого: ' + (+price + +optionPrice) + ' р.';
    priceToEmail = +price + +optionPrice;        //adding price in hiding input in order form
}


let optionInputs = document.querySelectorAll('.checkbox_to_hide');
let optionPriceArray = [];
let optionPrice = 0;
let price = 0;
let priceToEmail;

priceChange();
listenerToInputOption();

//------------------------------------------------------------------------------------------

function prepareToSendForm(e) {

    let sendToEmail = document.querySelector('.form_to_email_container');
    let labelForTrackName = document.getElementById('input_for_track_name');
    let labelForPerformerName = document.getElementById('input_for_performer_name');
    let button = document.getElementById('link');
    let price = document.getElementById('price');
    let sizeOfGlass = document.getElementById('size_of_glass');
    let playerCover = document.getElementById('cover');


    if (userTrackNameInput.value !== '' && userPerformerNameInput.value !== '') {
        e.preventDefault()
        labelForTrackName.classList.remove('error');
        labelForTrackName.innerHTML = 'Название трека';
        labelForPerformerName.classList.remove('error');
        labelForPerformerName.textContent = 'Исполнитель';
        price.value = priceToEmail;
        sizeOfGlass.value = size;
        playerCover.value = cover;
        sendToEmail.classList.remove('hidden');
        document.getElementById('link').setAttribute('href', '');
        console.log(price.value, sizeOfGlass.value, playerCover.value);
    } else if (userTrackNameInput.value === '') {
        labelForTrackName.classList.add('error');
        labelForTrackName.textContent = 'Ведите название трека';
        button.setAttribute('href', '#h123');
    } else if (userPerformerNameInput.value === '') {
        labelForTrackName.classList.remove('error');
        labelForTrackName.textContent = 'Название трека';
        labelForPerformerName.classList.add('error');
        labelForPerformerName.textContent = 'Укажите имя исполнителя';
        button.setAttribute('href', '#h123');
    }
}

function closeForm() {
    let sendToEmail = document.querySelector('.form_to_email_container');
    sendToEmail.classList.add('hidden');
}

let close = document.getElementById('close');
close.addEventListener('click', closeForm);

let formSubmit = document.getElementById('button');
formSubmit.addEventListener('click', prepareToSendForm);