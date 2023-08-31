import * as L from "leaflet";

const getMap = (coords: L.LatLngTuple) => {
  const map = L.map("map").setView(coords, 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);
  L.marker(coords).addTo(map);
};

const getUserCoordinates = async () => {
  try {
    const { latitude, longitude } = await new Promise<GeolocationCoordinates>(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position.coords),
          (error) => reject(error.message),
          { maximumAge: 0 }
        );
      }
    );
    getMap([latitude, longitude]);
  } catch (error) {
    if (error instanceof GeolocationPositionError) {
      alert(`An error occured, ${error.message}`);
    }
  }
};

(async () => {
  await getUserCoordinates();
})();
