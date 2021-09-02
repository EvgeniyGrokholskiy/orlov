//------------show skin of player------------------------------

let skinImg = document.getElementById('player_theme');

function showSkin() {
    let cover = document.querySelector('.cover').value;
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
    } else if (cover === 'vk') {
        skinImg.src = 'img/vk_w_o_text.jpg';
        prefix = 'vk'
    }

    textBlock.className = `order_construction__user_text order_construction__user_text-${prefix}`;
    trackNameSpan.className = `user_text user_text-track user_text-track-${prefix}`;
    performerSpan.className = `user_text user_text-performer user_text-performer-${prefix}`;
    lowerTextSpan.className = `user_text user_text-lower user_text-lower-${prefix}`;
}

//showSkin('spotify');

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

// let positionX = document.querySelector('.pos-x');
// let positionY = document.querySelector('.pos-y');
// let magnification = document.querySelector('.magnification');
// let coverType = document.querySelector('.cover');

function manualPositionSet(el) {
    console.log(el.className);
    if (el.className === 'pos-x') {
        document.querySelector('#user_image').setAttribute('style', `left: ${el.value}px`);
    } else if (el.className === 'pos-y') {
        document.querySelector('#user_image').setAttribute('style', `top: ${el.value}px`);
    } else if (el.className === 'magnification') {
        document.querySelector('#user_image').setAttribute('style', `height: ${el.value}%`);
    }
}