export const utils = {
    strCoordToArr: (str, num) => {
        if (str === undefined) {console.warn(`Utils.strCoordToArr: str:${str}`); return}
        const arr = str.split(" ").join("").split(",").map(str => +str);
        return arr[num];
    },

    selfIndicateHelper: (user) => {
        return user === "myDevice" ? "own-user" : null;
    },
    
    genRandomNumber: (range = 1000000) => {
        return Math.floor(Math.random() * range) + 1;
    },

    findObjectById: (arr, id) => {
      console.log(arr, id)
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id === id) {
            return arr[i];
          }
        }
        return null;
    },


    
    // v drugoi fail
    setDeviceIdToLocalStorage: (deviceId) => {
        localStorage.setItem('deviceId', deviceId.toString());
    },

    getDeviceIdFromLocalStorage: () => {
        const deviceId = localStorage.getItem('deviceId');
        return deviceId ? parseInt(deviceId, 10) : null;
    },
    setNameToLocalStorage: (name) => {
        localStorage.setItem('name', name);
      },
    
      getNameFromLocalStorage: () => {
        return localStorage.getItem('name');
      },
    
      setStatusToLocalStorage: (status) => {
        localStorage.setItem('status', status);
      },
    
      getStatusFromLocalStorage: () => {
        return localStorage.getItem('status');
      },
    
      setImgToLocalStorage: (img) => {
        localStorage.setItem('img', img);
      },
    
      getImgFromLocalStorage: () => {
        return localStorage.getItem('img');
      },
      
      setCoordinatesToLocalStorage: (coordinates) => {
        localStorage.setItem('coordinates', coordinates);
      },
    
      getCoordinatesFromLocalStorage: () => {
        return localStorage.getItem('coordinates');
      },
}