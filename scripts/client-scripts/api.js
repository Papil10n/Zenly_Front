import { mapSettings } from "./map.js";
import { generalInfo } from "./generalInfo.js";

export const API = {
  
    getDevices: () => {
        return fetch('http://localhost:3000/devices')
           .then(response => response.json())
           .then(data => {
             let devices = [...data.devices];
               return devices;
            })
            .catch(error => {
               console.log('Произошла ошибка:', error);
               return 'error';
            });
    },

    postNewDevice: (data) => {
      const url = 'http://localhost:3000/devices';
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      };
    
      return fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.log('Произошла ошибка:', error);
        });
    },

    deleteDevice: (id) => {
      let url = `http://localhost:3000/devices/${id}`;
      const requestOptions = {
        method: 'DELETE',
      };
    
      return fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => { console.log(data); })
        .catch(error => { console.log('Произошла ошибка:', error); });
    },
    
    changeDetailOfDevice: (deviceId, data) => {
      const url = `http://localhost:3000/devices/${deviceId}`;
      const formData = new FormData();
      
      // Добавляем данные в FormData
      for (const key in data) {
        formData.append(key, data[key]);
      }
      
      // Отправляем запрос с помощью fetch и FormData
      const requestOptions = {
        method: 'PUT',
        body: formData
      };
    
      return fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
          // Обработка успешного ответа
        })
        .catch(error => {
          // Обработка ошибки
        });
    },
    

    getDeviceById: (deviceId) => {
      const url = `http://localhost:3000/devices/${deviceId}`;
    
      return fetch(url)
        .then(response => response.json())
        .then(data => {
          return data;
        })
        .catch(error => {
          console.log('Произошла ошибка:', error);
        });
    },

    _changeCoordinatesOfDevice: (deviceId, coordinates) => {
      const url = `http://localhost:3000/devices/coordinates/${deviceId}`;
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coordinates })
      };
    
      return fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
        })
        .catch(error => {
          console.error('Произошла ошибка:', error); // Обработка ошибки
        });
    },
      
}