const profileName = document.querySelector(".profile__name");
const profileAboutName = document.querySelector(".profile__about-name");

const profileButtonEdit = document.querySelector(".profile__button-edit");
const profileButtonAdd = document.querySelector(".profile__button-add");

const popupAdd = document.querySelector(".popup-add");
const popupAddForm = popupAdd.querySelector('.popup__form');
const popupFieldTitle = popupAdd.querySelector(".popup__field-title");
const popupFieldUrl = popupAdd.querySelector(".popup__field-url");

const popupEdit = document.querySelector('.popup-edit');
const popupEditForm = popupEdit.querySelector('.popup__form');
const popupFieldName = popupEdit.querySelector(".popup__field-name");
const popupFieldAboutName = popupEdit.querySelector(".popup__field-about-name");

const popup = document.querySelectorAll(".popup");
const popupImg = document.querySelector(".popup_img");

function createCard(cardData) {
  const elementsTemplate = document.querySelector(".elements__template").content;
  const elementsElement = elementsTemplate.querySelector(".elements__element").cloneNode(true);  
  const elementImage = elementsElement.querySelector(".elements__img");
  const elementsTitle = elementsElement.querySelector(".elements__title");
  elementImage.src = cardData.link;
  elementImage.alt = cardData.name;  
  elementsTitle.textContent = cardData.name;
  elementsElement.querySelector(".elements__icon-like").addEventListener("click", likeButton);
  elementsElement.querySelector(".elements__icon-delete").addEventListener("click", removeButton); 
  elementImage.addEventListener("click", () => imgElement(cardData));  
  return elementsElement;
}

function likeButton(evt) {
  evt.target.classList.toggle("elements__icon-like_mod_active");
}

function removeButton(evt) {
  evt.target.closest(".elements__element").remove();
}

//popup картнки
function imgElement(cardData) {
  const popupImages = document.querySelector(".popup__images");
  const popupTitleImg = document.querySelector(".popup__title-img");    
  popupImages.src = cardData.link;
  popupImages.alt = cardData.name;
  popupTitleImg.textContent = cardData.name;
  openPopup(popupImg);
}

function renderCard(cardData) {
  const elementsList = document.querySelector(".elements__list");
  elementsList.prepend(createCard(cardData));
}

//дефолтные карточки
initialCards.forEach(cardData => {
  renderCard(cardData);
});

//закрытие всех попапов
function setlistenerClosePopup() {
  popup.forEach(item => {
    item.addEventListener('click', evt => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-close'))
      closePopup(evt.target.closest('.popup'));
    })
  })
}
setlistenerClosePopup();

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.addEventListener('keydown', closeEsc);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");  
  document.addEventListener('keydown', closeEsc);
}

function openPopupEdit() {
  openPopup(popupEdit);
  popupFieldName.value = profileName.textContent;
  popupFieldAboutName.value = profileAboutName.textContent;
}

//редактирования профиля
popupEditForm.addEventListener("submit", evt => {
  evt.preventDefault();
  profileName.textContent = popupFieldName.value;
  profileAboutName.textContent = popupFieldAboutName.value;
  closePopup(popupEdit);    
});

//добавления карточки
popupAddForm.addEventListener("submit", evt => {
  evt.preventDefault();    
  const submitBtn = evt.target.querySelector('.popup__button')
  const cardData = {
    name: popupFieldTitle.value,
    link: popupFieldUrl.value,
  };   
  renderCard(cardData);     
  popupAddForm.reset();
  closePopup(popupAdd);   
  disablePopupButton(submitBtn, settings.inactiveButtonClass)
});

//закрытие попапа нажатием на Esc
function closeEsc(evt) {
  if (evt.key === 'Escape')
    closePopup(document.querySelector('.popup_opened'));
}

profileButtonAdd.addEventListener("click", () => openPopup(popupAdd));

profileButtonEdit.addEventListener("click", openPopupEdit);