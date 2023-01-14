document.querySelector('.popup')
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
let formElement = popupElement.querySelector('.form');  
let nameInput = formElement.querySelector('.form__input_type_name');
let jobInput = formElement.querySelector('.form__input_type_description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
 
//ОТКРЫТИЕ ПОПАПА
const openPopup = function() {
    popupElement.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
};

//ЗАКРЫТИЕ ПОПАПА
function closePopup() {
    popupElement.classList.remove('popup_opened');
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

//ЗАПОЛНЕНИЕ ФОРМЫ

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
}

formElement.addEventListener('submit', handleFormSubmit); 
popupElement.addEventListener('submit', closePopup);
