;
//--------------------get data from homepage-----------------------------

let size = sessionStorage.getItem('size'); //data from home-page: size of glass

let cover = sessionStorage.getItem('cover'); //data from home-page: player skin

//------------------------------------------------------------


//------------show skin of player------------------------------

let skinImg = document.getElementById('player_theme');

function showSkin() {
    const textBlock = document.querySelector('.order_construction__user_text');
    const trackNameSpan = document.getElementById('track_name_span');
    const performerSpan = document.getElementById('performer_name_span');
    const lowerTextSpan = document.getElementById('lower_text_span');
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
        userTrackNameSpan.innerText = '???????????????? ??????????';
    } else {
        userTrackNameSpan.innerText = userTrackNameInput.value;
        trackNameLabel.classList.remove('error');
        trackNameLabel.textContent = '???????????????? ??????????';
    }
    if (userPerformerNameInput.value === '') {
        userPerformerNameSpan.innerText = '??????????????????????';
    } else {
        userPerformerNameSpan.innerText = userPerformerNameInput.value;
        performerLabel.classList.remove('error');
        performerLabel.textContent = '??????????????????????';
    }
    userLowerTextSpan.innerText = userLowerTextInput.value;
}

//-------------------------------------------------------------------------------

//-----------------------------changing uploaded image----------------------------

//----------------------scaling image---------------------------------------------

function scaling(id) {
    if (id === 'increase') {
        magnificationRatio += 5;
        //uploadedFileMiniature.style.height = magnificationRatio + '%';
        imgInCover.style.height = magnificationRatio + '%';
    } else if (id === 'reduction') {
        magnificationRatio -= 5;
        //uploadedFileMiniature.style.height = magnificationRatio + '%';
        imgInCover.style.height = magnificationRatio + '%';
    }
    document.getElementById('magnification').value = magnificationRatio;
}

//let uploadedFileMiniature = document.getElementById('upload_file_miniature_img');
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

    //uploadedFileMiniature.style.top = positionTop + 'px';
    //uploadedFileMiniature.style.left = positionLeft + 'px';
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

    const spanForShowPrice = document.querySelector('.price__js');
    const spanForShowPriceInMobile = document.querySelector('.price_for_mobile');
    let totalPrice =  0;
    optionPrice = 0;

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
    totalPrice = +price + +optionPrice;
    spanForShowPrice.textContent = (totalPrice).toString();//price on page
    spanForShowPriceInMobile.textContent = '??????????: ' + (totalPrice) + ' ??.';
    priceToEmail = totalPrice;        //adding price in hiding input in order form
}


const optionInputs = document.querySelectorAll('.checkbox_to_hide');
let optionPriceArray = [];
let optionPrice = 0;
let price = 0;
let priceToEmail;

priceChange();
listenerToInputOption();

//------------------------------------------------------------------------------------------

function prepareToSendForm(event) {

    const sendToEmail = document.querySelector('.form_to_email_container');
    const labelForTrackName = document.getElementById('input_for_track_name');
    const labelForPerformerName = document.getElementById('input_for_performer_name');
    //let button = document.getElementById('link');
    const price = document.getElementById('price');
    const sizeOfGlass = document.getElementById('size_of_glass');
    const playerCover = document.getElementById('cover');


    if (userTrackNameInput.value !== '' && userPerformerNameInput.value !== '') {

        event.preventDefault()

        labelForTrackName.classList.remove('error');
        labelForTrackName.innerHTML = '???????????????? ??????????';
        labelForPerformerName.classList.remove('error');
        labelForPerformerName.textContent = '??????????????????????';
        price.value = priceToEmail;
        sizeOfGlass.value = size;
        playerCover.value = cover;

        sendToEmail.classList.remove('hidden');
        //document.getElementById('link').setAttribute('href', '');
        //console.log(price.value, sizeOfGlass.value, playerCover.value);

    } else if (userTrackNameInput.value === '') {

        event.preventDefault()

        labelForTrackName.classList.add('error');
        labelForTrackName.textContent = '???????????? ???????????????? ??????????';

        //button.setAttribute('href', '#horder_constructor');
        scrollToAnchor('#order_constructor');

    } else if (userPerformerNameInput.value === '') {

        event.preventDefault()

        labelForTrackName.classList.remove('error');
        labelForTrackName.textContent = '???????????????? ??????????';
        labelForPerformerName.classList.add('error');
        labelForPerformerName.textContent = '?????????????? ?????? ??????????????????????';

        //button.setAttribute('href', '#order_constructor');

        scrollToAnchor('#order_constructor');
    }

    function scrollToAnchor(href) {

        let top = document.querySelector(href).offsetTop;
        $('body,html').animate({scrollTop: top}, 1000);

    }
}


function closeForm() {
    const sendToEmail = document.querySelector('.form_to_email_container');
    sendToEmail.classList.add('hidden');
}

const close = document.getElementById('close');
close.addEventListener('click', closeForm);

const formSubmit = document.getElementById('button');
formSubmit.addEventListener('click', prepareToSendForm);