import { mapSettings } from "./map.js";
import { generalInfo } from "./generalInfo.js";
import { API } from "./api.js";

let mapMarkers = [];
let updateDataInterval;
export let userStatus = false;
export let usersData = [];



const setApp = async () => {
  console.log('App started');

  generalInfo.getCurrentDate(Date.now());
  generalInfo.userStatusChecker(true);
  userStatus = true;

  const updateData = async () => {
    try {
      generalInfo.deleteDevicesOnSide();
      mapSettings.clearDevicesOnMap(mapMarkers);
      usersData = [];

      let ownDevice = generalInfo.checkOwnDevice();
      if (!ownDevice) {
        const currentCoords = await generalInfo.getCurrentPosition();
        ownDevice = generalInfo.createOwnDevice(currentCoords);
      }

      const existingDevice = await API.getDeviceById(ownDevice.id);

      if (typeof existingDevice === 'object') {
        const data = { img: ownDevice.img, status: ownDevice.status, name: ownDevice.name };
        await API.changeDetailOfDevice(ownDevice.id, data);
      } else {
        await API.postNewDevice(ownDevice);
      }

      const devices = await API.getDevices();
      if (devices === 'error') {
        console.log('user status false `couse devices = ', devices);
        userStatus = false;
        generalInfo.userStatusChecker(false);
        clearInterval(updateDataInterval);
      } else {
        usersData.push(...devices);
      }

      mapMarkers = mapSettings.setDevicesOnMap(usersData);
      generalInfo.setDevicesOnSide(usersData);
    } catch (error) {
      console.log('Произошла ошибка:', error);
    }
  };

  await updateData();
  updateDataInterval = setInterval(updateData, 60000);
};

setApp();






const offlineBtn = document.querySelector(".goOffline-btn");
offlineBtn.addEventListener("click", () => {
  if (userStatus) {
    stopTracking();
  } else {
    startTracking();
  }
});

function stopTracking() {
  userStatus = false;
  generalInfo.userStatusChecker(false);
  generalInfo.deleteDevicesOnSide();
  mapSettings.clearDevicesOnMap(mapMarkers);
  usersData = [];
  clearInterval(updateDataInterval);
  offlineBtn.innerHTML = 'Go online';
}

async function startTracking() {
  userStatus = true;
  generalInfo.userStatusChecker(true);
  offlineBtn.innerHTML = 'Go offline';
  await setApp();
}




