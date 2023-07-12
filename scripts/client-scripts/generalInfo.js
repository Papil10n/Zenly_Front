import { utils } from "./utils.js";
import { API } from "./api.js";

const block = document.querySelector(".status-wrap");
const status = document.querySelector(".status");


export const generalInfo = {
    getCurrentDate: (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const monthIndex = date.getMonth();
        const monthNames = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const month = monthNames[monthIndex];
        const day = String(date.getDate()).padStart(2, '0');
        
        const dataIRL = document.querySelector(".date");
        dataIRL.innerHTML = `${year} ${month} ${day}`;
    },

    userStatusChecker: (userStatus) => {
      
      status.innerHTML = userStatus ? "On-Line" : "Off-line";
      block.style.background = userStatus ? "#52bf2b" : "#981212";
    },

    setDevicesOnSide: (usersData) => {
        const usersBlock = document.querySelector(".users-block");

        for (let i = 0; i < usersData.length; i++) {
        let user = document.createElement('div');
        user.innerHTML = `
            <button class="user ${utils.selfIndicateHelper(usersData[i].name)}">
                <div class="user-img">
                    <img src="${usersData[i].img ? usersData[i].img : '../../img/noname.jpg'}" alt="Image" width="44px">
                </div>
                <div class="user-info">
                    <div class="user-nickname">${usersData[i].name === "myDevice" ? "Me" : usersData[i].name}</div>
                    <div class="user-status">${usersData[i].status ? usersData[i].status : ""}</div>
                </div>
            </button>`
            usersBlock.append(user);
        }
    },
    
    deleteDevicesOnSide: () => {
        const usersBlock = document.querySelector(".users-block");
        usersBlock.innerHTML = '';
    },

    checkOwnDevice: () => {
      const { getDeviceIdFromLocalStorage, getNameFromLocalStorage, getCoordinatesFromLocalStorage, getStatusFromLocalStorage, getImgFromLocalStorage } = utils;
    
      const device = {
        id: getDeviceIdFromLocalStorage(),
        name: getNameFromLocalStorage() || 'unknownUser',
        coordinates: getCoordinatesFromLocalStorage(),
        status: getStatusFromLocalStorage() || '#status',
        img: getImgFromLocalStorage() || 'https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png'
      };
    
      return device.id && device.coordinates ? device : null;
    },

    async getCurrentPosition() {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const { latitude, longitude } = position.coords;
        return [latitude, longitude];
      } catch (error) {
        console.error(`Error getting geolocation: ${error.message}`);
        return null;
      }
    },

    createOwnDevice(coords) {
      const ownDevice = {
        id: utils.genRandomNumber(),
        name: `UnknownUser`,
        coordinates: `${coords[0]}, ${coords[1]}`,
        img: "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png",
        status: "#Status",
      };
    
      const { id, name, coordinates, img, status } = ownDevice;
      utils.setDeviceIdToLocalStorage(id);
      utils.setNameToLocalStorage(name);
      utils.setCoordinatesToLocalStorage(coordinates);
      utils.setImgToLocalStorage(img);
      utils.setStatusToLocalStorage(status);
    
      return ownDevice;
    },

    async updateDeviceAndSetDevicesOnSide(deviceId, data) {
      try {
        await Promise.all([
          API.changeDetailOfDevice(deviceId, data),
          generalInfo.deleteDevicesOnSide()
        ]);
    
        const usersData = await API.getDevices();
        generalInfo.setDevicesOnSide(usersData);
      } catch (error) {
        console.log(error);
      } 
    }
}