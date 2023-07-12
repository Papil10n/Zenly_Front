import { utils } from "./utils.js";

export let map;

const startPosition = { lat: 48.45, lng: 35.04 };
const { Map } = await google.maps.importLibrary("maps");
export const { AdvancedMarkerView } = await google.maps.importLibrary("marker");


map = new Map(document.getElementById("map"), {
    zoom: 12,  // 12
    center: startPosition,
    mapId: "DEMO_MAP_ID",
});

export const mapSettings = {
    setDevicesOnMap: (usersData) => {
        let markers = [];
        for (let i = 0; i < usersData.length; i++) {
            const infoWindow = new google.maps.InfoWindow();

            const markerIMG = document.createElement("img");
            markerIMG.src = `${usersData[i].img ? usersData[i].img : "https://cdn.icon-icons.com/icons2/317/PNG/512/map-marker-icon_34392.png"}`;
            markerIMG.style.width = "35px";
            markerIMG.style.height = "35px";
            markerIMG.style.borderRadius = "50%";
            markerIMG.style.border = "2px solid #214F94";

            const marker = new AdvancedMarkerView({
               map: map,
               position: {lat:utils.strCoordToArr(usersData[i].coordinates, 0), lng: utils.strCoordToArr(usersData[i].coordinates, 1)},
               content: markerIMG,
               title: usersData[i].name,
            });

            marker.addListener("click", ({ domEvent, latLng }) => {
                const { target } = domEvent;
          
                infoWindow.close();
                infoWindow.setContent(marker.title);
                infoWindow.open(marker.map, marker);
              });

            markers.push(marker);
        }
        return markers;
    },
    clearDevicesOnMap: (markers) => {
        if (markers.length > 0) {
            for (let i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
        }
    }
}
