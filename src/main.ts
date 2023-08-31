import * as L from "leaflet";

const loadingContainer = document.getElementById("loading-screen");
let errorText = document.getElementById("error-text")?.textContent;
const errorScreen = document.getElementById("error-screen");

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
    errorScreen?.classList.remove("hidden");
    errorScreen?.classList.add("flex");
    error = error ? errorText : null;
    console.error(error);
  } finally {
    loadingContainer?.classList.remove("block");
    loadingContainer?.classList.add("hidden");
  }
};

(async () => {
  await getUserCoordinates();
})();
