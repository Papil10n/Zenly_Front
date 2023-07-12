import { utils } from "./utils.js"
import { usersData } from "./main.js";
import { generalInfo } from "./generalInfo.js";
import { API } from "./api.js";




const settingsBtn = document.querySelector(".settingBtn");
const titleBlock = document.querySelector(".popup-title");
const infoBlock = document.querySelector(".popup-info");
const userEditBtn = document.querySelector(".userEditBtn");
const coordCorrectBtn = document.querySelector(".coordsCorrect");
const closePopupButton = document.getElementById('closePopup');
const imageContainer = document.querySelector('.userImgCont');
const image = document.querySelector('.userImg');
const userImg = document.querySelector(".userImg");
let userName = document.querySelector(".userName");
let userStatus = document.querySelector(".userStatus");
let newImageFile;


const updatePopupContent = () => {
  titleBlock.innerHTML = `Ваш девайс находится под ID:${utils.getDeviceIdFromLocalStorage()}`;
  infoBlock.innerHTML = `На координатах: ${utils.getCoordinatesFromLocalStorage()}`;
  userName.innerHTML = `${utils.getNameFromLocalStorage()}`;
  userStatus.innerHTML = `${utils.getStatusFromLocalStorage()}`;
  userImg.src = `${utils.getImgFromLocalStorage()}`;
};

const handleEditButtonClick = () => {
  const userNameValue = userName.textContent;
  const userStatusValue = userStatus.textContent;

  if (userEditBtn.innerHTML === "Edit") {
    const userNameInput = document.createElement('input');
    userNameInput.type = 'text';
    userNameInput.id = 'userNameInput';
    userNameInput.value = userNameValue;

    const userStatusInput = document.createElement('input');
    userStatusInput.type = 'text';
    userStatusInput.id = 'userStatusInput';
    userStatusInput.value = userStatusValue;

    userName.parentNode.replaceChild(userNameInput, userName);
    userStatus.parentNode.replaceChild(userStatusInput, userStatus);

    userName = userNameInput;
    userStatus = userStatusInput;

    if (image.tagName === 'IMG') {
      const imageInput = document.createElement('input');
      imageInput.type = 'file';

      imageInput.addEventListener('change', () => {
        const file = imageInput.files[0];
        const reader = new FileReader();

        reader.addEventListener('load', () => {
          newImageFile = reader.result;
          image.src = reader.result;
          imageContainer.removeChild(imageInput);
        });

        if (file) {
          reader.readAsDataURL(file);
        }
      });

      imageContainer.appendChild(imageInput);
    }

    userEditBtn.innerHTML = "Done";
  } else {
    const userNameInput = document.querySelector('#userNameInput');
    const userStatusInput = document.querySelector('#userStatusInput');

    const newUserNameValue = userNameInput.value || userNameValue;
    const newUserStatusValue = userStatusInput.value || userStatusValue;

    const newUserName = document.createElement('p');
    newUserName.textContent = newUserNameValue;
    newUserName.classList.add('userName');

    const newUserStatus = document.createElement('p');
    newUserStatus.textContent = newUserStatusValue;
    newUserStatus.classList.add('userStatus');

    userNameInput.parentNode.replaceChild(newUserName, userNameInput);
    userStatusInput.parentNode.replaceChild(newUserStatus, userStatusInput);

    userName = newUserName;
    userStatus = newUserStatus;

    userEditBtn.innerHTML = "Edit";

    if (newUserNameValue !== userNameValue || newUserStatusValue !== userStatusValue) {
      utils.setNameToLocalStorage(newUserNameValue);
      utils.setStatusToLocalStorage(newUserStatusValue);
      utils.setImgToLocalStorage(newImageFile);

      const deviceId = utils.getDeviceIdFromLocalStorage();
      const data = {
        name: newUserNameValue,
        status: newUserStatusValue,
        img: newImageFile ? newImageFile : "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png",
      };

      generalInfo.updateDeviceAndSetDevicesOnSide(deviceId, data);
    }
  }
};

const handleCoordCorrectButtonClick = async () => {
  coordCorrectBtn.disabled = true;
  let coords = await generalInfo.getCurrentPosition();
  coords = coords.join(", ");
  utils.setCoordinatesToLocalStorage(coords);
  infoBlock.innerHTML = `На координатах: ${coords}`;

  API._changeCoordinatesOfDevice(utils.getDeviceIdFromLocalStorage(), coords)
    .then(res => {
      setTimeout(() => {
        coordCorrectBtn.disabled = false;
      }, 10000);
    })
};

const handleClosePopupButtonClick = () => {
  popupOverlay.style.display = 'none';
  document.body.style.overflow = 'auto';
};

settingsBtn.addEventListener("click", e => {
  popupOverlay.style.display = 'block';
  document.body.style.overflow = 'hidden';
  updatePopupContent();
});

userEditBtn.addEventListener("click", handleEditButtonClick);
coordCorrectBtn.addEventListener("click", handleCoordCorrectButtonClick);
closePopupButton.addEventListener('click', handleClosePopupButtonClick);

